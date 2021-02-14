const {ChatModel} = require("./../db/models")
module.exports = function(server){
  const io = require('socket.io')(server, {
    cors: true
  });
  // console.log("准备连接")

  //监视客户端与服务器端的连接
  io.on('connection', function(socket){
    console.log("有一个客户端连接上了服务器");

    socket.on("sendMsg", function({from, to, content}){
      console.log("接收客户端的消息", {from, to, content});




      const chat_id = [from, to].sort().join("_");
      const create_time = Date.now();

      // const chatMsg = {from, to, content, chat_id, create_time}

      // io.emit("receieveMsg", chatMsg);
      new ChatModel({from, to, content, chat_id, create_time}).save(function(error, chatMsg){
        // 向所有人发送，后期客户端接收饿的时候需要过滤

        io.emit("receieveMsg", chatMsg);
      })
    })
  })
}