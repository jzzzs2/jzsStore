var express = require('express');
var router = express.Router();

//上传商品图片
var multer = require('multer');
var fs = require('fs');
var path = require('path');

//使用表单上传

let upload = multer({
  storage: multer.diskStorage({
    //设置文件存储位置
    destination: function (req, file, cb) {
      // let date = new Date();
      // let year = date.getFullYear();
      // let month = (date.getMonth() + 1).toString().padStart(2, '0');
      // let day = date.getDate();
      //直接从根目录开始找
      //  let dir = "./public/uploads/" + year + month + day;
      let dir = path.join(__dirname, `/upload`)
      //判断目录是否存在，没有则创建
      //  if (!fs.existsSync(dir)) {
      //    fs.mkdirSync(dir, {
      //      recursive: true
      //    });
      //  }

      //dir就是上传文件存放的目录
      cb(null, dir);
    },
    //设置文件名称
    filename: function (req, file, cb) {
      console.log(file, "file");
      let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      //fileName就是上传文件的文件名
      cb(null, fileName);
    }
  })
})
//接口地址为:admin/upload/img   根据自己的路由配置来写
router.post('/', upload.single("file"), function (req, res, next) {

  console.log(req, "req");
  // res.json({
  //   file: req.file
  // })
  res.send(200, {
    msg: "ok"
  })
})


module.exports = router;