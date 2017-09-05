var express = require('express'),
    db = require('./model/db.js');

var app = express();
// 增
app.get('/insert', function (req, res) {
    db.insertOne('student', {
            "name": "小陈",
            "age": parseInt(Math.random() * 100),
            "hobby": ["打架", "看书"],
            "score": {
                "yuwen": 59,
                "shuxue": 80
            }
        }
        , function (err, result) {
            if (err) {
                console.log('插入数据失败！');
                return;
            }
            console.log('数据插入成功');
            res.send('数据插入成功' + JSON.stringify(result));
        })
})
// 查
app.get('/find', function (req, res) {
    // 这个页面接收page参数
    var page = parseInt(req.query.page);
    db.find('student', {}, {'pagemount': 3, page: page}, function (err, doc) {
        if (err) {
            console.log(err);
            console.log('查找数据失败！');
            return;
        }
        console.log('数据查找成功');
        res.send(doc);
    });
})
// 改
app.get('/update', function (req, res) {
    var name = req.query.name;
    var age = parseInt(req.query.age);
    db.updateMany('student', {"name": name}, {
        $set: {"age": age}
    }, function (err, result) {
        if (err) {
            res.send('删除数据失败');
            console.log('删除数据失败:' + err);
            return;
        }
        res.send(result);
    })
})
// 删
app.get('/remove', function (req, res) {
    var id = parseInt(req.query.id);
    db.removeMany('student', {"age": {$gt: id}}, function (err, result) {
        if (err) {
            res.send('删除数据失败');
            console.log('删除数据失败:' + err);
            return;
        }
        res.send(result);
    })
})

app.listen(3000);