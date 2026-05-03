"use server";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

// Article from Finnhub API response
interface Article {
  id?: string;
  url?: string;
  headline: string;
  summary: string;
  image?: string;
  source: string;
  datetime: number;
  category?: string;
}

// Formatted article for email templates and UI
export interface FormattedArticle {
  headline: string;
  summary: string;
  image?: string;
  source: string;
  datetime: number;
  category?: string;
}

const fetchJSON = async (
  url: string,
  revalidateSeconds?: number
): Promise<unknown> => {
  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (revalidateSeconds !== undefined) {
    fetchOptions.cache = "force-cache";
    fetchOptions.next = { revalidate: revalidateSeconds };
  } else {
    fetchOptions.cache = "no-store";
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch from ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

const isValidArticle = (article: unknown): article is Article => {
  if (typeof article !== "object" || article === null) {
    return false;
  }
  const obj = article as Record<string, unknown>;
  return (
    (obj.id || obj.url || obj.headline) &&
    typeof obj.headline === "string" &&
    typeof obj.summary === "string" &&
    typeof obj.datetime === "number"
  );
};

const formatArticle = (article: Article): FormattedArticle => {
  return {
    headline: article.headline,
    summary: article.summary,
    image: article.image,
    source: article.source || "Unknown",
    datetime: article.datetime,
    category: article.category,
  };
};

export const getNews = async (symbols?: string[]): Promise<FormattedArticle[]> => {
  try {
    if (!FINNHUB_API_KEY) {
      throw new Error("FINNHUB_API_KEY is not set");
    }

    // Compute date range for last 5 days
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const toDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const fromDate = fiveDaysAgo.toISOString().split("T")[0]; // YYYY-MM-DD

    const articles: Article[] = [];
    const seenIds = new Set<string>();

    if (symbols && symbols.length > 0) {
      // Clean and uppercase symbols
      const cleanedSymbols = symbols
        .map((s) => s.trim().toUpperCase())
        .filter((s) => s.length > 0);

      // Max 6 rounds, round-robin through symbols
      const maxRounds = Math.min(6, cleanedSymbols.length * 2);

      for (let round = 0; round < maxRounds; round++) {
        const symbol = cleanedSymbols[round % cleanedSymbols.length];

        try {
          const url = `${FINNHUB_BASE_URL}/company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`;
          const newsData = await fetchJSON(url);

          if (Array.isArray(newsData)) {
            for (const article of newsData) {
              if (isValidArticle(article)) {
                const articleId = article.id || article.url || article.headline;
                if (!seenIds.has(articleId)) {
                  articles.push(article);
                  seenIds.add(articleId);
                  break; // Take one valid article per round
                }
              }
            }
          }
        } catch (error) {
          console.error(`Error fetching news for symbol ${symbol}:`, error);
          // Continue to next symbol
        }
      }
    }

    // If no symbols or not enough articles, fetch general market news
    if (articles.length === 0) {
      try {
        const url = `${FINNHUB_BASE_URL}/news?category=general&minId=0&token=${FINNHUB_API_KEY}`;
        const newsData = await fetchJSON(url);

        if (Array.isArray(newsData)) {
          for (const article of newsData) {
            if (isValidArticle(article)) {
              const articleId = article.id || article.url || article.headline;
              if (!seenIds.has(articleId)) {
                articles.push(article);
                seenIds.add(articleId);
                if (articles.length >= 6) break;
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching general market news:", error);
      }
    }

    // Sort by datetime descending and take top 6
    const sortedArticles = articles
      .sort((a, b) => b.datetime - a.datetime)
      .slice(0, 6)
      .map(formatArticle);

    return sortedArticles;
  } catch (error) {
    console.error("Error in getNews:", error);
    throw new Error("Failed to fetch news");
  }
};
