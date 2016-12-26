var express = require('express');
router = express.Router(),
    formidable = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/avatar/';


var uploadqiniu  = require('../upload');

/* GET home page. */
router.get('/', function(req, res) {
  console.log("1111");
  res.render('index', { title: TITLE });
});

router.post('/', function(req, res) {
  console.log("2222");
  var form = new formidable.IncomingForm();   //创建上传表单
  console.log("2222777");
  form.encoding = 'utf-8';		//设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
  form.keepExtensions = true;	 //保留后缀
  console.log("22228888");
  form.maxFieldsSize = 10 * 1024 * 1024;   //文件大小
  console.log("22229999");
  form.parse(req, function(err, fields, files) {
    console.log("444");
    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }

    var extName = '';  //后缀名
    switch (files.fulAvatar.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.render('index', { title: TITLE });
      return;
    }

    var avatarName = Math.random() + '.' + extName;
    var newPath = form.uploadDir + avatarName;

    console.log("555");
    console.log(newPath);
    fs.renameSync(files.fulAvatar.path, newPath);  //重命名

    //upload to qiniu server
    console.log("start upeload qiniu");

    qiniu_fileName = newPath.substring(newPath.lastIndexOf("/") + 1);
    var token_generated = uploadqiniu.uptoken(qiniu_fileName);
    uploadqiniu.uploadFile(token_generated, qiniu_fileName , newPath);
    console.log("done upeload qiniu");

  });

  console.log("2222898989");
  res.locals.success = '上传成功';
  res.render('index', { title: TITLE });
});

module.exports = router;
