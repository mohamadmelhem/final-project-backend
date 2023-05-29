import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage });

export default function (req, res, next) {
  upload.array("images", 10)(req, res, (err) => {
    if (err) {
      return next(err);
    }
    if (req.files) {
      req.body.images = req.files.map((file) => file.path).join(",");
    }
    next();
  });
}
