var express = require("express");
var router = express.Router();
const md5 = require("blueimp-md5");
const { UserModel, ChatModel } = require("./../db/models");
const fileter = { password: 0, __v: 0 }; //指定过滤的属性

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log(UserModel);
  res.render("index", { title: "Express" });
});

// 注册路由
router.post("/register", function(req, res) {
  const { username, password, type } = req.body;
  // 如果不存在就保存
  UserModel.findOne({ username }, function(error, user) {
    if (user) {
      res.send({ code: 1, msg: "已存在" });
    } else {
      new UserModel({ username, type, password: md5(password)}).save(function(
        error,
        user
      ) {
        res.cookie("userId", user._id, { maxAge: 1000 * 60 * 60 * 24 });
        const data = { username, type, _id: user._id };
        res.send({ code: 0, data });
      });
    }
  });
});

// 登录路由
router.post("/login", function(req, res) {
  const { username, password } = req.body;
  // 查数据库
  UserModel.findOne({ username, password: md5(password) }, fileter, function(
    error,
    user
  ) {
    if (user) {
      res.cookie("userId", user._id, { maxAge: 1000 * 60 * 60 * 24 });
      res.send({ code: 0, data: user });
    } else {
      res.send({ code: 1, msg: "用户名或者密码不存在" });
    }
  });
});

// 更新路由
router.post("/update", function(req, res) {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.send({ code: 1, msg: "请先登录" });
  }

  const user = req.body;
  UserModel.findByIdAndUpdate({ _id: userId }, user, function(error, oldUser) {
    if (!oldUser) {
      res.clearCookie("userId");
    } else {
      const { _id, username, type } = oldUser;
      const data = Object.assign(user, { _id, username, type });
      res.send({ code: 0, data });
    }
  });
});

// 查询用户
router.get("/user", function(req, res) {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.send({ code: 1, msg: "请先登录" });
  }

  UserModel.findOne({ _id: userId }, fileter, function(error, user) {
    res.send({ code: 0, data: user });
  });
});

// 查询列表
router.get("/userlist", function(req, res) {
  const { type } = req.query;
  UserModel.find({ type }, fileter, function(err, users) {
    res.send({ code: 0, data: users });
  });
});

// 获取当前用户相关的聊天列表
router.get("/msglist", function(req, res) {
  const userId = req.cookies.userId;
  UserModel.find(function(error, userDocs) {
    // const users = {};
    // userDocs.forEach(doc => {
    //   users[doc._id] = {username: doc.username, header: doc.header}
    // })

    // 或者用reduce
    const users = userDocs.reduce((users, user) => {
      users[user._id] = { username: user.username, header: user.header };
      return users;
    }, {});

    ChatModel.find(
      { $or: [{ from: userId }, { to: userId }] },
      fileter,
      function(err, chatMsgs) {
        res.send({ code: 0, data: {users, chatMsgs} });
      }
    );
  });
});

// 修改消息为已读
router.post("/readmsg", function(req, res){
  // 只能修改发给当前用户的信息
  const { from } = req.body;
  const to = req.cookies.userId;
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function(error, doc){
    res.send({code: 0, data: doc.nModified})
  })
})
module.exports = router;
