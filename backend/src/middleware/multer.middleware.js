
import multer from "multer";
import path from "path";
import crypto from "crypto";

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];
const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
];

const storage = multer.diskStorage({
  destination: "uploads/images",

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const filename = `${crypto.randomUUID()}${ext}`;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const isMimeValid =
    allowedMimeTypes.includes(file.mimetype);

  const isExtensionValid =
    allowedExtensions.includes(extension);

  if (isMimeValid && isExtensionValid) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Invalid file type. Only JPG, JPEG, PNG, and WebP images are allowed."
    )
  );
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
  },
});

export default upload;

