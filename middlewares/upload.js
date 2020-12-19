const multer = require('multer');
const itemDB=require("../models/item.js");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function(req, file, cb){
    req.originalNameImg=file.originalname;
    cb(null, Date.now()+'-'+file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits:{ fileSize: 1024 * 1024 * 12 },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('file');

// Check File Type
function checkFileType(file, cb){
  if(file.mimetype === "image/png" || 
  file.mimetype === "image/jpg"|| 
  file.mimetype === "image/jpeg"){
      cb(null, true);
  }
  else{
    cb({field:"image",
      message: 'Images Only!'
    });
  }
}


async function uploadImg (req, res, next) {
  upload(req, res, async (err) => {
    if(err && err.code==='LIMIT_FILE_SIZE'){
      return res.status(422).json({
        field:"image",
        message:`The file ${ req.originalNameImg} is too big`,
        err:`max size is 12 mb`
      })
    }else if(err){
      return res.status(422).json({err});
    } else {
      if(req.file == undefined){
        return res.status(404).json({
          field:"image",
          message: 'Error: No File Selected!'
        });
      }else{
         let url=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
         let idItem=parseInt(req.params["productId"]);
         await itemDB.saveImgUrl(url, idItem);
         next();
      }
    }
  });

}

module.exports={uploadImg};

