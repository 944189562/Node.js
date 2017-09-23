var mongoose = require('mongoose');
var db = require('./db.js');
//创建了一个schema结构
var mongooseSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number},
    sex: {type: String},
})
// 添加 mongoose 静态方法，静态方法在Model层就能使用
mongooseSchema.statics.findbyname = function (title, callback) {
    return this.model('Student').find({name: title}, callback);
}
mongooseSchema.statics.updateInfo = function (conditions, update, options, callback) {
    return this.model('Student').update(conditions, update, options, callback);
}
//创建了一个模型，就是一个类，类是基于schema
var studentModel = db.model('Student', mongooseSchema);

module.exports = studentModel;