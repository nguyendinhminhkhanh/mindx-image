const uploadToDisk = (req, res) => {
  res.send({
    success: 1,
    data: req.file.path,
  });
};
const uploadToCloud = (req, res) => {
  try {
    res.json({
      success: 1,
      message: "Upload thành công!",
      url: req.file.path, // URL public trên Cloudinary
    });
  } catch (error) {
    res.status(500).json({ success: 0, message: error.message });
  }
};

module.exports = { uploadToDisk ,uploadToCloud};
