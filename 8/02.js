var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Test', {useMongoClient: true,})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    console.log('数据库连接成功！');
})

var Schema = mongoose.Schema;
var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

blogSchema.methods.showTitle = function () {
    console.log(this.title);
}

var Blog = mongoose.model('Blog', blogSchema);

var myBlog = new Blog({title: '博客测试',author:'张雅鹏'});
myBlog.save();
myBlog.showTitle();