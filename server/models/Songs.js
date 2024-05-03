import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define collection and schema for Songs

let Songs = new Schema({
  user_voice: {
    type: String,
    required: true,
  },
  selected_song: {
    type: String,
    required: true,
  },
  mixed_audio: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Songs", Songs);
