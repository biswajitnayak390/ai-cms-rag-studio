class ContentOptimizer {
  constructor() {
    this.seoKeywords = [
      "Sitecore XM Cloud",
      "Headless CMS",
      "Composable DXP",
      "AI-powered CMS",
      "Enterprise AI"
    ];
  }

  analyzeContent(content) {
    const wordCount = content.split(/\s+/).length;
    const seoMatches = this.seoKeywords.filter(keyword =>
      content.toLowerCase().includes(keyword.toLowerCase())
    );

    return {
      readabilityScore: this.calculateReadability(wordCount),
      seoKeywordMatches: seoMatches,
      contentLength: wordCount,
      suggestions: this.generateSuggestions(content, seoMatches)
    };
  }

  calculateReadability(wordCount) {
    if (wordCount < 100) return "Short-form content";
    if (wordCount < 400) return "Balanced enterprise content";
    return "Long-form enterprise article";
  }

  generateSuggestions(content, seoMatches) {
    const suggestions = [];

    if (seoMatches.length < 2) {
      suggestions.push("Add more enterprise SEO keywords.");
    }

    if (content.length < 300) {
      suggestions.push("Expand the content with architecture or implementation details.");
    }

    if (!content.toLowerCase().includes("ai")) {
      suggestions.push("Mention AI workflow or automation benefits.");
    }

    return suggestions;
  }
}

module.exports = ContentOptimizer;
