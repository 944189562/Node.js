var MongoClient = require('mongodb').MongoClient,
    express = require('express');

var app = express();

app.get('/', function (req, res) {
    var url = 'mongodb://localhost:27017/Test';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("数据库连接失败：" + err);
            return;
        }
        console.log("数据库连接成功");
        // Get the documents collection
        var collection = db.collection('student');
        // Insert some documents
        collection.insertMany([
            {
                "name": "张雅鹏",
                "age": "23"
            }
        ], function (err, result) {
            if (err) {
                console.log("数据库插入失败：" + err);
                return;
            }
            console.log("数据库插入成功：" + result);
            db.close();
            res.send('插入数据成功' + JSON.stringify(result));
        });
    })
})

app.listen(3000);