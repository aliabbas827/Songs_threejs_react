import express from "express";
import { updateCharacter } from "../controllers/user.controller.js";

const router = express.Router();

// router.get("/", test);

router.put("/update_character/:id", updateCharacter);

export default router;
