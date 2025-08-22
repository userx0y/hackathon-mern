import mongoose from "mongoose";
const noteSchema = mongoose.Schema({
  title: String,
  content: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });
const Note = mongoose.model("Note", noteSchema);
export default Note;
