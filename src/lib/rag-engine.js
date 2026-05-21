const enterpriseKnowledge = [
  {
    id: 1,
    title: "Sitecore XM Cloud",
    category: "CMS",
    content: "Sitecore XM Cloud is a SaaS-based headless CMS used for composable digital experience platforms."
  },
  {
    id: 2,
    title: "Headless CMS",
    category: "Architecture",
    content: "Headless CMS separates content management from frontend delivery using APIs such as GraphQL or REST."
  },
  {
    id: 3,
    title: "RAG Architecture",
    category: "AI",
    content: "Retrieval-Augmented Generation improves AI answers by retrieving relevant enterprise knowledge before generating a response."
  },
  {
    id: 4,
    title: "Multilingual Content",
    category: "Content Operations",
    content: "Enterprise CMS platforms often require multilingual workflows, localization, fallback language handling, and SEO-aware routing."
  }
];

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

function searchKnowledge(query) {
  const cleanQuery = normalize(query);

  return enterpriseKnowledge
    .map(item => {
      const combinedText = normalize(`${item.title} ${item.category} ${item.content}`);
      const score = cleanQuery
        .split(" ")
        .filter(word => word.length > 2 && combinedText.includes(word)).length;

      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

function generateRagResponse(query) {
  const results = searchKnowledge(query);

  if (results.length === 0) {
    return {
      answer: "I could not find matching enterprise knowledge. Try asking about Sitecore, RAG, Headless CMS, or multilingual content.",
      sources: []
    };
  }

  const context = results.slice(0, 3).map(item => item.content).join(" ");

  return {
    answer: `Based on enterprise knowledge: ${context}`,
    sources: results.slice(0, 3).map(item => ({
      title: item.title,
      category: item.category,
      score: item.score
    }))
  };
}

module.exports = {
  searchKnowledge,
  generateRagResponse
};
