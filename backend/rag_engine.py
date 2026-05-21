from typing import List, Dict

class EnterpriseRAGEngine:
    def __init__(self):
        self.documents = [
            {
                "title": "Sitecore XM Cloud",
                "category": "CMS",
                "content": "Sitecore XM Cloud is a SaaS-based headless CMS platform for enterprise digital experience delivery."
            },
            {
                "title": "RAG Architecture",
                "category": "AI",
                "content": "Retrieval-Augmented Generation combines retrieval systems with large language models to improve contextual enterprise responses."
            },
            {
                "title": "Headless CMS",
                "category": "Architecture",
                "content": "Headless CMS separates frontend delivery from content management using APIs."
            }
        ]

    def semantic_search(self, query: str) -> List[Dict]:
        query = query.lower()
        results = []

        for doc in self.documents:
            score = 0
            content = f"{doc['title']} {doc['category']} {doc['content']}".lower()

            for word in query.split():
                if word in content:
                    score += 1

            if score > 0:
                results.append({
                    "document": doc,
                    "score": score
                })

        return sorted(results, key=lambda x: x['score'], reverse=True)

    def generate_response(self, query: str) -> Dict:
        matches = self.semantic_search(query)

        if not matches:
            return {
                "answer": "No enterprise knowledge found.",
                "sources": []
            }

        context = " ".join([
            item['document']['content'] for item in matches[:3]
        ])

        return {
            "query": query,
            "answer": f"Enterprise AI Response: {context}",
            "sources": [
                item['document']['title'] for item in matches[:3]
            ]
        }


if __name__ == "__main__":
    engine = EnterpriseRAGEngine()

    response = engine.generate_response(
        "Explain Sitecore XM Cloud and RAG architecture"
    )

    print(response)
