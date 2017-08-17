var ejs = require('ejs');

var string = '今天是2017年8月<%= a %>号';
var data = {
    a: 16
}
var html = ejs.render(string, data);

console.log(html);
