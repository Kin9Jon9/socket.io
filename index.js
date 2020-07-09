var app = require('express') ()
var http = require('http').createServer (app);
var io = require('socket.io') (http);

/**
 * request Data : userName, itemNumber
 */

 
app.get('/room', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
* Show Item List
*/
app.get('/list', function(req, res) {
  res.sendFile(__dirname + '/views/list.html');
});

io.on('connection', (socket) => {
   socket.on('chat message', (msg)=>{
     io.emit('chat message', msg);
   });
});

// 이부분 왜 app 그러니까 exrpess listen이 아니라 http listen만 되는지?
http.listen(3000, () => {
  console.log('listening on port 3000');
})