var mongoose = require('mongoose');
//创建数据库连接
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/haha');
db.connection;
//监听open事件
db.once('open', function () {
    console.log('数据连接成功');
})

module.exports = db;