import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(400).json({ message: "No data present!" });
    }
    res
      .status(201)
      .json({
        message: "Data fetched successfully!",
        success: true,
        data: userData,
      });
  } catch (error) {
    console.log("Error in get all users controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !id) {
      return res.status(400).json({ message: "Invalid Details" });
    }
    const userExists = await User.findOne({ _id: id });
    if (!userExists) {
      return res.status(400).json({ message: "User does not exists!" });
    }
    userExists.role = role;
    userExists.save();
    res
      .status(200)
      .json({ message: "User role changed successfully!", success: true });
  } catch (error) {
    console.log("Error in change user role controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
