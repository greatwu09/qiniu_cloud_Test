var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'g-jeMQxivZL1JNTCzx0jQE-dGw-TBNZBV4wiz-RH';
qiniu.conf.SECRET_KEY = 'i04H_5Sb5i5BjnK_4aoiDChO6f0wORHOMpbiuM8c';

//要上传的空间
bucket = 'myplan';

//构建上传策略函数
function uptoken(key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}


//生成上传 Token
//token = uptoken(bucket, key);
//上传到七牛后保存的文件名
//key = 'my_nodejs_drag.png';
//要上传文件的本地路径
//filePath = './drag.png';

//构造上传函数
function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log("success:");
            console.log(ret.hash, ret.key, ret.persistentId);
        } else {
            // 上传失败， 处理返回代码
            console.log("error:");
            console.log(err);
        }
    });
}

//调用uploadFile上传
//uploadFile(token, key, filePath);

exports.uploadFile = uploadFile;
exports.uptoken = uptoken;