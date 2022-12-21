const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		const { originalname } = file;
		// or
		// uuid, or fieldname
		cb(null, originalname);
	},
});
const upload = multer({ storage });

module.exports = upload;
