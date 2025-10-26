const router = require("express").Router();
const multer = require("multer");
const { uploadToDisk, uploadToCloud } = require("./upload.controller");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

//upload to disk
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    console.log(file);
    // xử lý chỗ filename => để không bị up đè
    // xử lý chỉ upload ảnh
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: diskStorage });

//upload cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//
cloudinary.api
  .resources({ type: "upload", max_results: 10 })
  .then((res) => console.log(res.resources.map((r) => r.secure_url)))
  .catch((err) => console.error(err));
//

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Thư mục chứa file trên Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // định dạng cho phép
  },
});
const uploadWithMemory = multer({ storage: storage });

router.post("/disk", upload.single("file"), uploadToDisk);
router.post("/", uploadWithMemory.single("file"), uploadToCloud);

module.exports = router;
