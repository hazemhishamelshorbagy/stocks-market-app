"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";

export const getWatchlistSymbolsByEmail = async (email: string): Promise<string[]> => {
  try {
    if (!email) {
      console.warn("getWatchlistSymbolsByEmail: email is required");
      return [];
    }

    await connectToDatabase();

    // Find the user by email in the users collection (Better Auth)
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
      console.error("getWatchlistSymbolsByEmail: Database connection not established");
      return [];
    }

    const user = await db.collection("user").findOne({ email });

    if (!user) {
      console.warn(`getWatchlistSymbolsByEmail: User with email ${email} not found`);
      return [];
    }

    const userId = user._id?.toString() || user.id;

    if (!userId) {
      console.warn(`getWatchlistSymbolsByEmail: User ID not found for email ${email}`);
      return [];
    }

    // Query Watchlist by userId, return just the symbols as strings
    const watchlistItems = await Watchlist.find({ userId }).select("symbol").lean();

    const symbols = watchlistItems.map((item: { symbol?: string }) => item.symbol ?? "");

    return symbols;
  } catch (error) {
    console.error("Error in getWatchlistSymbolsByEmail:", error);
    return [];
  }
};
