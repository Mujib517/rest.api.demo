var multer = require('multer');

var diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        var filename = Date.now() + "-" + file.originalname;
        req.filename = filename;
        cb(null, filename);
    }
});
var uploader = multer({ storage: diskStorage });

module.exports = uploader;