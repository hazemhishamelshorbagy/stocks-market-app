import mongoose, { Document, Schema, model } from "mongoose";

export interface WatchlistItem extends Document {
  userId: string;
  symbol: string;
  company: string;
  addedAt: Date;
}

const watchlistSchema = new Schema<WatchlistItem>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

// Compound index: userId + symbol (ensure user can't add same stock twice)
watchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export const Watchlist = mongoose.models?.Watchlist || model<WatchlistItem>("Watchlist", watchlistSchema);