import { connectToDatabase } from "@/database/mongoose";

// Fetch all users who are eligible for daily news emails.
// This helper is used by the Inngest daily news summary workflow.
export const getAllUsersForNewsEmail = async () => {
    try {
        // Connect to MongoDB via the shared mongoose helper.
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;

        if (!db) {
            throw new Error("Database connection not established");
        }

        // Query the users collection for documents that have an email.
        const users = await db
            .collection("user")
            .find(
                { email: { $exists: true, $ne: null } },
                { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 } }
            )
            .toArray();

        // Keep only records with both email and name, then normalize the id.
        return users
            .filter((user) => user.email && user.name)
            .map((user) => ({
                id: user._id?.toString?.() || user.id || "",
                email: user.email,
                name: user.name,
            }));
    } catch (error) {
        console.error("Error fetching users for daily news email:", error);
        throw error;
    }
};