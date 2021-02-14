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
// 定义user集合的文档结构
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    header: {type: String},
    post: {type: String},
    info: {type: String},
    company: {type: String},
    salary: {type: String}
})

// 定义model
// 定义能操作user集合的model
const UserModel = mongoose.model('user', userSchema)

exports.UserModel = UserModel;


// 定义chat集合的文档结构
const chatSchema = mongoose.Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    chat_id: {type: String, required: true},
    content: {type: String, required: true},
    read: {type: Boolean, default: false},
    create_time: {type: Number}
})

// 定义model
// 定义能操作chat集合的model
const ChatModel = mongoose.model('chat', chatSchema)

exports.ChatModel = ChatModel;