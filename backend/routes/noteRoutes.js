import express from "express";
import { addNote, getNotes, deleteNote } from "../controllers/noteController.js";
const router = express.Router();
router.post("/add", addNote);
router.get("/:userId", getNotes);
router.delete("/:id", deleteNote);
export default router;