module.exports = function(server){
  const io = require('socket.io')(server, {
    cors: true
  });
  // console.log("准备连接")

  //监视客户端与服务器端的连接
  io.on('connection', function(socket){
    console.log("有一个客户端连接上了服务器");

    socket.on("sendMsg", function(data){
      console.log("接收客户端的消息", data);
      data.name = data.name.toUpperCase();

      socket.emit("receieveMsg", data);
    })
  })
}