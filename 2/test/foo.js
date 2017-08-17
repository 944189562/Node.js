var msg = '你好';
var info = '张雅鹏';

function showInfo(name) {
    console.log(msg, name);
}

exports.msg = msg;
exports.showInfo = showInfo;