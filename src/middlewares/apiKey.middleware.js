import User from "../models/user.model.js";

export const apiKeyAuthenticate = async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) return res.status(401).json({ message: "API key missing" });

    const user = await User.findOne({ apiKey });
    if (!user) return res.status(401).json({ message: "Invalid API key" });

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log("Error in the api key authentication middleware", error);
  }
};
