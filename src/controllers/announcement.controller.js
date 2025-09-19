import Announcement from "../models/announcement.model";

export const createAnnouncementController = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Please Enter All the details to create announcement",
      });
    }

    const announcement = await Announcement.create({
      title,
      content,
      createdBy: _id,
    });
    if (!announcement) {
      return res.status(400).json({
        message: "Error creating announcement",
      });
    }
    res
      .status(201)
      .json({ message: "Announcement Created Successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in create announcement controller", error);
  }
};

export const viewAnnouncementController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Announcement doesn't exist!" });
    }
    const announcement = await Announcement.findOne({ _id: id });
    if (!announcement) {
      return res.status(400).json({ message: "Announcement not found!" });
    }
    res
      .status(201)
      .json({
        message: "Accouncement fetched successfully!",
        success: true,
        data: announcement,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in view announcement controller", error);
  }
};
