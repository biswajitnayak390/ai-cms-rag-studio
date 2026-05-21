class EnterpriseContentPipeline:
    def __init__(self):
        self.enterprise_keywords = [
            "AI",
            "Sitecore",
            "Headless",
            "CMS",
            "RAG",
            "Composable DXP"
        ]

    def analyze_content(self, content: str):
        words = content.split()

        keyword_matches = []

        for keyword in self.enterprise_keywords:
            if keyword.lower() in content.lower():
                keyword_matches.append(keyword)

        return {
            "word_count": len(words),
            "keyword_matches": keyword_matches,
            "content_quality": self.calculate_quality_score(content),
            "seo_ready": len(keyword_matches) >= 2
        }

    def calculate_quality_score(self, content: str):
        score = 60

        if len(content.split()) > 100:
            score += 10

        if "architecture" in content.lower():
            score += 10

        if "enterprise" in content.lower():
            score += 10

        if "AI" in content:
            score += 10

        return min(score, 100)

    def semantic_tags(self, content: str):
        tags = []

        if "Sitecore" in content:
            tags.append("Sitecore")

        if "AI" in content:
            tags.append("Artificial Intelligence")

        if "Headless" in content:
            tags.append("Headless CMS")

        return tags
