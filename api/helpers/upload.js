var util = require('util')
var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    // console.log(file);
    callback(null, Date.now() + '-' + file.originalname);
  }
});

// How To Filter File In Multer File Upload
const fileFilter = function (req, file, callback) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};


let uploadFile = multer({ storage: storage, fileFilter: fileFilter }).single("file");


let uploadManyFiles = multer({ storage: storage, fileFilter: fileFilter }).array("upload", 20);
let multipleUploadFile = util.promisify(uploadManyFiles);

module.exports = {
  uploadFile: uploadFile,
  multipleUploadFile: multipleUploadFile
};

