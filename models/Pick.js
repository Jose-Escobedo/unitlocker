import mongoose from "mongoose";

const SPORTS = ["CS2", "NBA", "NHL", "MLB"];

const CS2_STATS = ["Kills", "Headshots", "Assists", "Deaths", "ADR", "Rating"];
const NBA_STATS = ["Points", "Rebounds", "Assists", "3-Pointers", "Steals", "Blocks", "Pts+Reb+Ast"];
const NHL_STATS = ["Goals", "Assists", "Points", "Shots on Goal", "Saves"];
const MLB_STATS = ["Strikeouts", "Hits", "Home Runs", "RBI", "Walks", "Total Bases", "Pitcher Outs"];

const PickSchema = new mongoose.Schema(
  {
    sport: { type: String, enum: SPORTS, required: true },
    playerName: { type: String, required: true, trim: true },
    playerImage: { type: String, default: null },
    team: { type: String, required: true, trim: true },
    matchup: { type: String, required: true, trim: true },
    eventDate: { type: Date, required: true },

    stat: { type: String, required: true, trim: true },
    line: { type: Number, required: true },
    prediction: { type: String, enum: ["Over", "Under"], required: true },

    source: { type: String, enum: ['staff', 'community'], default: 'staff' },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

    isHot: { type: Boolean, default: false },
    confidence: { type: Number, min: 1, max: 5, default: 3 },

    status: {
      type: String,
      enum: ["pending", "won", "lost", "push"],
      default: "pending",
    },
    result: { type: Number, default: null },

    bookieUrl: { type: String, default: null },
    notes: { type: String, default: null, trim: true },
  },
  { timestamps: true }
);

PickSchema.index({ sport: 1, eventDate: -1 });
PickSchema.index({ status: 1 });

export const CS2_STATS_LIST = CS2_STATS;
export const NBA_STATS_LIST = NBA_STATS;
export const NHL_STATS_LIST = NHL_STATS;
export const MLB_STATS_LIST = MLB_STATS;

export default mongoose.models.Pick || mongoose.model("Pick", PickSchema);
