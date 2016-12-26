/**
 * �ļ��ϴ� API·������
 * @type {*|exports|module.exports}
 */
var qiniu = require('qiniu');
var express = require('express');
var config = require('../../config.js');
var router = express.Router();
var app = express();

// ���ù�Կ��˽Կ
qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;
var uptoken = new qiniu.rs.PutPolicy(config.Bucket_Name);

// ��ȡ�ϴ�ƾ֤
router.
    get('/uptoken', function(req, res, next) {
        console.log("1111");
        var token = uptoken.token();
        res.header("Cache-Control", "max-age=0, private, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        if (token) {
            res.json({
                uptoken: token
            });
        }
    });

module.exports = router;