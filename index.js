var app = require('express') ()
var http = require('http').createServer (app);
var io = require('socket.io') (http);

/**
 * request Data : userName, itemNumber
 */

 
app.get('/room/:id', function (req, res) {
  const number = req.params.id;

  if ( number == 1) {
    res.sendFile(__dirname + '/views/index.html');
  }else if ( number  == 2) {
    res.sendFile(__dirname + '/views/index2.html');
  }
 
});

/*
* Show Item List
*/
app.get('/list', function(req, res) {
  res.sendFile(__dirname + '/views/list.html');
});

io.on('connection', (socket) => {

  socket.on('Room', (itemNumber, name) => {
    socket.join(itemNumber, () => {
      console.log('Succesfully Making' + itemNumber + 'Room');
    });
  });

  socket.on('chat message', (itemNumber, name, msg) => {
    io.to(itemNumber).emit('chat message', name, msg);
  })

});

// 이부분 왜 app 그러니까 exrpess listen이 아니라 http listen만 되는지?
http.listen(3000, () => {
  console.log('listening on port 3000');
})