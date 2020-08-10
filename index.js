const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
require('dotenv').config();

const Room = require('./models/room');
const Chat = require('./models/chat');

app.use(cors);

/**
 * mongoose connection
 */

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.error(e));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * socket.io Logic
 * 대현이형이랑 같이 작업 할때 socket으로 받아오는거에 대한 처리, socket으로 넘겨주는거 및 에러 넘길 떄 처리
 */

io.on('connection', (socket) => {

  //채팅방 최초 접속
  socket.on('Room', (item, user1) => {

    //이미 생성된 채팅방이라면 대화기록 불러옴
    socket.join(item.num+user1, async () => {
      
    });
    
  });

  socket.on('chat message', async (item, user, msg) => {
    
    //기존에 없던 생성인지 확인 후 생성 이거 룸코드말고 _id로도ㄱㅊ?
    const roomCode = item.num+user;
    if(item.seller != user){
      try {
        const isExistRoom = await Room.findByroomCode(roomCode)
        if(!isExistRoom) {
          const result = await Room.create()
        }
      } catch (e) {
        console.log(e);
      }
    }
    const saveReceivedMsg = await Chat.create(roomCode, user, msg);

    io.to(roomCode).emit('chat message', roomCode, user, msg);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`grooom Chatting server listening...`);
});
