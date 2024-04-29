import User from "../models/User.js";

export async function updateCharacter(req, res) {
  const { id } = req.params;
  const { character } = req.body;
  try {
    const user = await User.findById(id);
    user.character = character;
    await user.save();
    res.status(201).json({
      success: true,
      message: "Character updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
