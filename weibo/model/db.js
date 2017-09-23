// 封装了对数据库的增删改查操作
var MongoClient = require('mongodb').MongoClient;
var settings = require('../setting.js');

// 连接数据库
function __connectDB(callback) {
    var url = settings.dburl;
    MongoClient.connect(url, function(err, db) {
        callback(err, db);
    })
}

init();

function init() {
    // 对数据库进行初始化
    __connectDB(function(err, db) {
        if (err) {
            console.log(err,'数据库连接失败');
            return;
        }
        db.collection('users').createIndex({ 'username': 1 }, null, function(err, result) {
            if (err) {
                console.log('索引建立失败', err);
                return;
            }
            console.log('索引建立成功');
        })
    })
}

// 插
exports.insertOne = function(collectionName, json, callback) {
        __connectDB(function(err, db) {
            if (err) {
                console.log('数据库连接失败');
                callback(err, null);
                db.close();
                return;
            }
            db.collection(collectionName).insertOne(json, function(err, result) {
                callback(err, result);
                db.close(); // 关闭数据库
            })
        })
    }
    // 查
exports.find = function(collectionName, json, args, callback) {
        if (arguments.length == 3) {
            callback = args;
            // 从多少条数据开始取
            var skipnum = 0;
            // 读取多少条数据
            var limitnum = 0;
            var sort = {};
        } else if (arguments.length == 4) {
            callback = callback;
            args = args;
            // 从多少条数据开始取
            var skipnum = args.pagemount * args.page || 0;
            // 读取多少条数据
            var limitnum = args.pagemount || 0;
            var sort = args.sort || {};
        } else {
            throw new Error('find函数的参数为3个或4个');
            db.close();
            return;
        }
        __connectDB(function(err, db) {
            if (err) {
                console.log('数据库连接失败');
                callback(err, null);
                db.close();
                return;
            }

            var cursor = db.collection(collectionName).find(json).limit(limitnum).skip(skipnum).sort(sort);
            cursor.toArray(function(err, doc) {
                callback(err, doc);
                db.close();
            })
        })
    }
    // 删
exports.removeMany = function(collectionName, json, callback) {
        __connectDB(function(err, db) {
            if (err) {
                console.log('数据库连接失败');
                callback(err, null);
                db.close();
                return;
            }
            db.collection(collectionName).deleteMany(
                json,
                function(err, result) {
                    callback(err, result);
                    db.close();
                }
            )
        })
    }
    // 改
exports.updateMany = function(collectionName, json1, json2, callback) {
        __connectDB(function(err, db) {
            if (err) {
                console.log('数据库连接失败');
                callback(err, null);
                db.close();
                return;
            }
            db.collection(collectionName).updateMany(
                json1,
                json2,
                function(err, result) {
                    callback(err, result);
                    db.close();
                }
            )
        })
    }
    // 获取全部数据
exports.getAllData = function(collectionName, json, callback) {
    if (arguments.length == 2) {
        var callback = json;
        // 从多少条数据开始取
        var json = {};
    } else if (arguments.length == 3) {
        callback = callback;
        json = json;
    } else {
        throw new Error('find函数的参数为3个或4个');
        db.close();
        return;
    }
    __connectDB(function(err, db) {
        if (err) {
            console.log('数据库连接失败');
            callback(err, null);
            db.close();
            return;
        }
        db.collection(collectionName).count(json).then(function(count) {
            callback(null, count);
        });
    })
}