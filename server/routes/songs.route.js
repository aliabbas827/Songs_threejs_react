import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

import Songs from "../models/Songs.js";

const destination = path.join(
  // dirname in module es6
  path.dirname(new URL(import.meta.url).pathname),
  "../../client2/public/uploads"
);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    //    create new audio file with unique name

    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.put("/:id", upload.single("user_voice"), async (req, res) => {
  const { id } = req.params;

  try {
    // find if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // create new song
    console.log(req.file.path);

    // save song into file with unique name
  } catch (error) {}
});

export default router;
