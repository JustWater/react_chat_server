// 1、引入mongoose
const mongoose = require("mongoose");
const md5 = require('blueimp-md5');
// 链接指定数据库
mongoose.connect('mongodb://localhost:27017/react_chat_project_test')
// 获取连接对象
const conn = mongoose.connection;
// 绑定链接完成的监听
conn.on('connected', function(){
    console.log("连接成功");
})

// 2、得到对应特定集合的model
// 字义Schema
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    header: {type: String},
})

// 定义model
const UserModel = mongoose.model('user', userSchema)
// 1、引入mongoose
const mongoose = require("mongoose");
const md5 = require('blueimp-md5');
// 链接指定数据库
mongoose.connect('mongodb://localhost:27017/react_chat_project_test')
// 获取连接对象
const conn = mongoose.connection;
// 绑定链接完成的监听
conn.on('connected', function(){
    console.log("连接成功");
})

// 2、得到对应特定集合的model
// 字义Schema
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    header: {type: String},
})

// 定义model
const UserModel = mongoose.model('user', userSchema)

// 3、

// 增
// 通过Model实例的save()添加数据
function testSave(){
    const userModel = new UserModel({username: "Tom", password: md5('123'), type: "11"})
    userModel.save(function(error, user){
        console.log('save()', error, user)
    })
}
testSave();

// 查
// 通过Model的find()\findOnde()查询多个或1个数据
function testFind(){
    // 查询多个
    UserModel.find(function(error, users){
        console.log('find()', error, users);
    })

    // 查询一个
    // UserModel.findOne({_id: ""}, function(error, user){
    //     console.log('findOne()', error, user);
    // })
}

testFind();

// 改
// 通过Model的findByIdAndUpdate()来更新某个数据
function textUpdate(){
    UserModel.findByIdAndUpdate({id: ""}, {username: "nancy"}, function(error, olduser){
        console.log('findByIdAndUpdate()', error, olduser);
    })
}

textUpdate();

// s删
// 通过Model的remove()方法删除匹配的数据
function testDelete(){
    UserModel.remove({id: ""}, function(error, data){
        console.log('remove()', error, data);
    })
}

testDelete();
// 3、

// 增
// 通过Model实例的save()添加数据
function testSave(){
    const userModel = new UserModel({username: "Tom", password: md5('123'), type: "11"})
    userModel.save(function(error, user){
        console.log('save()', error, user)
    })
}
testSave();

// 查
// 通过Model的find()\findOnde()查询多个或1个数据
function testFind(){
    // 查询多个
    UserModel.find(function(error, users){
        console.log('find()', error, users);
    })

    // 查询一个
    // UserModel.findOne({_id: ""}, function(error, user){
    //     console.log('findOne()', error, user);
    // })
}

testFind();

// 改
// 通过Model的findByIdAndUpdate()来更新某个数据
function textUpdate(){
    UserModel.findByIdAndUpdate({id: ""}, {username: "nancy"}, function(error, olduser){
        console.log('findByIdAndUpdate()', error, olduser);
    })
}

textUpdate();

// s删
// 通过Model的remove()方法删除匹配的数据
function testDelete(){
    UserModel.remove({id: ""}, function(error, data){
        console.log('remove()', error, data);
    })
}

testDelete();