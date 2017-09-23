var db = require('./models/db.js');
//定义了一个模型，学生模型，类
var Student = require('./models/Schema.js');
//实例化一个学生类
var xiaoming = new Student({'name': '小明', 'age': 12, sex: '男'});
//保存这个学生类
xiaoming.save(function (err) {
    if (err) console.log(err);
    console.log('存储成功');
})
//用类创建一个对象
Student.create({'name': '小红', 'age': 12, 'sex': '女'});
//查找小明
Student.findbyname('小明', function (err, result) {
    console.log(result);
})
//修改小明信息
var conditions = {'name': '小明'};
var update = {$set: {'age': 27}};
var options = {upsert: true};
Student.updateInfo(conditions, update, options, function (err, result) {
    console.log(result);
})