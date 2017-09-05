var express = require('express');
var formidable = require('formidable');
var db = require('./model/db.js');
var objectId = require('mongodb').ObjectID;

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', function (req, res) {
    db.getAllData('liuyanban', function (mount) {
        res.render('index', {
            'pagemount': Math.ceil(mount / 4)
        });
    })
})
//处理留言
app.post('/liuyan', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {
        // 写入数据库
        if (!fields.name || !fields.liuyan) {
            res.json({result: -1});
            return;
        }
        db.insertOne('liuyanban', {
            'name': fields.name,
            'liuyan': fields.liuyan,
            'time': new Date()
        }, function (err, result) {
            if (err) {
                res.json({result: -1});
                return;
            }
            res.json({result: 1});
        })
    });
})

//获取留言
app.get('/find', function (req, res, next) {
    var pagemount = 4;
    var nowpage = parseInt(req.query.page) || 0;
    db.find('liuyanban', {}, {'pagemount': pagemount, 'page': nowpage, sort: {'time': -1}}, function (err, result) {
        res.json({'result': result});
    })
})

//获取全部数据
app.get('/count', function (req, res) {
    db.getAllData('liuyanban', function (mount) {
        res.json({mount: mount});
    })
})

//删除留言
app.get('/remove', function (req, res) {
    console.log(req.query.id);
    db.removeMany('liuyanban', {'_id': objectId(req.query.id)}, function (err, result) {
        if (err) {
            res.json({result: -1});
            return;
        }
        res.json({result: 1, data: result});
    })
})
app.listen(3000);
