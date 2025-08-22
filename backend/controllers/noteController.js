import Note from "../models/Note.js";
export const addNote = async (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res.send({ status: "failed", message: "All fields required ❗" });
  }
  try {
    const newNote = new Note({ title, content, userId });
    await newNote.save();
    res.send({ status: "success", message: "Note added ✅", note: newNote });
  } catch (err) {
    res.send({ status: "failed", message: "Error saving note ❌" });
  }
};
export const getNotes = async (req, res) => {
  const { userId } = req.params;
  try {
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.send({ status: "success", notes });
  } catch (err) {
    res.send({ status: "failed", message: "Error fetching notes ❌" });
  }
};
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await Note.findByIdAndDelete(id);
    res.send({ status: "success", message: "Note deleted ✅" });
  } catch (err) {
    res.send({ status: "failed", message: "Error deleting note ❌" });
  }
};