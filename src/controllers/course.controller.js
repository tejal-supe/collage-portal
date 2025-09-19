import Course from "../models/course.model.js";
import Material from "../models/material.model.js";

export const createCourseController = async (req, res) => {
  try {
    const { name, description, code } = req.body;
    const { _id } = req.user;

    if (!name || !description || !code) {
      return res.status(400).json({ message: "Please Enter All details!" });
    }

    const course = await Course.create({
      name,
      description,
      code,
      faculty: _id,
    });
    if (!course) {
      return res.status(400).json({ message: "Error creating course!" });
    }
    res.status(201).json({
      message: "Course created successfully!",
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in create course controller", error);
  }
};

export const getCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ _id: id }).populate("faculty");
    if (!course) {
      return res.status(400).json({ message: "Course not found!" });
    }
    return res.status(201).json({
      message: "Course Fetched Successfully!",
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in get course controller", error);
  }
};

export const createMaterialController = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { title, type, url } = req.body;
    if (!title || !type || !url || !id) {
      return res.status(400).json({ message: "Please Enter All details!" });
    }
    const material = await Material.create({
      course: id,
      title,
      type,
      url,
      uploadedBy: _id,
    });
    if (!material) {
      return res.status(400).json({ message: "Error creating in material!" });
    }
    res.status(201).json({
      message: "Material Created Successfully!",
      success: true,
      data: material,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in create material controller", error);
  }
};

export const getMaterialsForCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.find({ course: id });
    if (!material) {
      return res.status(400).json({ message: "Material Not Found!" });
    }
    res
      .status(201)
      .json({
        message: "Materials fetched successfully!",
        success: true,
        data: material,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in get material controller", error);
  }
};
