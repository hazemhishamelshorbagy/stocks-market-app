// Inngest functions for Signalist automation.
// This module defines two automated flows:
// 1) sendSignupEmail: sends a welcome email when a new user is created.
// 2) sendDailyNewsSummary: fetches daily news for opted-in users and sends summary emails.

import { inngest } from "./client";
import { sendWelcomeEmail, sendDailyNewsSummaryEmail } from "../nodemailer";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.actions";
import { getNews, type FormattedArticle } from "../actions/finnhub.actions";
import { getAllUsersForNewsEmail } from "../actions/user.action";


// The signup email function is triggered when a new user is created.
// It uses the Better Auth event payload and sends a welcome email.
export const sendSignupEmail = inngest.createFunction(
    { id: "signup-email", triggers: { event: "app/user.created" } }, // Listen for the user creation event.
    async ({ event, step }) => {
        await step.run("send-welcome-email", async () => {
            return await sendWelcomeEmail({
                // Pull required user values from the event payload.
                email: event.data.email,
                name: event.data.name,
                intro: event.data.intro || "Welcome to Signalist! We're excited to have you on board."
            });
        });
    }
);

// The daily news summary function is triggered by both a manual event and a cron schedule.
// It runs every day at 12:00 UTC and also responds to app/send.daily.news events.

// Helper function to format articles into HTML for email
const formatArticlesForEmail = (articles: FormattedArticle[]): string => {
    if (!articles || articles.length === 0) {
        return "<p>No articles available today.</p>";
    }

    const articleHtml = articles
        .map(
            (article) => `
        <div style="margin-bottom: 24px; padding: 16px; border-left: 4px solid #3b82f6; background-color: #f8fafc;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
                ${article.headline}
            </h3>
            ${article.image ? `<img src="${article.image}" alt="article" style="max-width: 100%; height: auto; margin: 12px 0; border-radius: 4px;">` : ""}
            <p style="margin: 8px 0; color: #4b5563; font-size: 14px; line-height: 1.5;">
                ${article.summary}
            </p>
            <p style="margin: 8px 0; font-size: 12px; color: #9ca3af;">
                <strong>Source:</strong> ${article.source} | <strong>Category:</strong> ${article.category || "General"}
            </p>
        </div>
    `
        )
        .join("");

    return `
        <div style="padding: 0; color: #1f2937;">
            <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Today's News</h2>
            ${articleHtml}
        </div>
    `;
};

export const sendDailyNewsSummary = inngest.createFunction(
    {
        id: "daily-news-summary",
        triggers: [
            { event: "app/send.daily.news" }, // Manual trigger event
            { cron: "0 12 * * *" } // Daily cron trigger at 12:00 UTC
        ]
    },
    async ({ step }) => {
        // Step 1: Find all users who opted in for daily news emails.
        const users = await step.run("get-users-for-daily-news", getAllUsersForNewsEmail);

        if (!users || users.length === 0) {
            console.log("No users opted in for daily news summary.");
            return { success: true };
        }

        console.log(`Processing daily news summary for ${users.length} users`);

        // Step 2: For each user, fetch their watchlist symbols and then fetch news.
        const newsDataByUser = (await step.run(
            "fetch-personalized-news",
            async () => {
                const newsData: Record<string, NewsDataItem> = {};

                for (const user of users) {
                    try {
                        // Query watchlist symbols for the current user.
                        const symbols = await getWatchlistSymbolsByEmail(user.email);

                        // Fetch news for symbols, or fallback to general news if no symbols exist.
                        const articles = await getNews(symbols && symbols.length > 0 ? symbols : undefined);
                        const userKey = user.id ?? user.email ?? `user-${Object.keys(newsData).length}`;

                        newsData[userKey] = {
                            user,
                            symbols: symbols || [],
                            articles,
                        };
                    } catch (error) {
                        console.error(`Error fetching news for user ${user.email}:`, error);
                        const userKey = user.id ?? user.email ?? `user-${Object.keys(newsData).length}`;
                        newsData[userKey] = {
                            user,
                            symbols: [],
                            articles: []
                        };
                    }
                }

                return newsData;
            }
        )) as Record<string, NewsDataItem>;

        // Step 3: Summarize the fetched news for each user. This is currently a placeholder.
        // A real implementation would call an AI summarizer and return user-specific summaries.
        const summarizedNews = (await step.run(
            "summarize-news",
            async () => {
                const summaries: Record<string, SummaryItem> = {};

                for (const userId of Object.keys(newsDataByUser)) {
                    const data = newsDataByUser[userId] as NewsDataItem;
                    summaries[userId] = {
                        user: data.user,
                        articles: data.articles as FormattedArticle[],
                        summary: `Daily news summary for ${data.symbols.length > 0 ? data.symbols.join(", ") : "general market"}`,
                    };
                }

                return summaries;
            }
        )) as Record<string, SummaryItem>;

        // Step 4: Send emails to each user using the daily summary template.
        await step.run("send-daily-news-emails", async () => {
            const sendDate = new Date().toISOString().split("T")[0];
            const sendPromises = Object.values(summarizedNews).map(async (data) => {
                if (!data.user.email) {
                    console.warn("Skipping email because user has no email address", data.user);
                    return false;
                }

                // Format articles into HTML content for email
                const newsContent = formatArticlesForEmail(data.articles);

                return await sendDailyNewsSummaryEmail({
                    email: data.user.email,
                    name: data.user.name ?? "Investor",
                    summary: newsContent,
                    date: sendDate
                });
            });

            await Promise.all(sendPromises);
            return { emailsSent: sendPromises.length };
        });

        return { success: true };
    }
);