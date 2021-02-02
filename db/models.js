// 包含多个操作数据库集合数据的Model模块


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

exports.UserModel = UserModel;