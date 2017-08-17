function people(name, sex, age) {
    this.name = name;
    this.sex = sex;
    this.age = age;
}

people.prototype = {
    sayHello: function () {
        console.log(this.name + this.sex + this.age);
    }
}
// 此时people被视为构造函数，可以用new进行实例化
// exports可一个暴露函数或变量；
// module.exports可以暴露一个类
module.exports = people;