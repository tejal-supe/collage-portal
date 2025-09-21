import Result from "../models/results.model.js";

export const addResults = async (req, res) => {
  try {
    const { id } = req.params;
    const { course, score, grade, student } = req.body;
    if (!id || !course || !score || !grade || !student) {
      return res.status(400).json({ message: "Enter all the details!" });
    }
    const result = await Result.create({ course: id, score, student, grade });
    if (!result) {
      return res.status(400).json({ message: "Error while adding result!" });
    }
    res.status(201).json({
      message: "Result Added Successfully!",
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("Error in add results controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (req.user.role === "student" && req.user._id.toString() !== studentId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const results = await Result.find({ student: studentId })
      .populate("student", "name email")
      .populate("course", "name description");

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    res
      .status(201)
      .json({
        message: "Data fetched successfully",
        success: true,
        data: results,
      });
  } catch (error) {
    console.log("Error in get results controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
