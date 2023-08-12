var express = require('express');
var app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var server = require('http').Server(app);
var io = require('socket.io')(server); // biến trên
server.listen(3000);

var mang = [];

io.on('connection', function (socket) {
  console.log('co nguoi vua ket noi : ', socket.id);
  socket.on('hocvien-send-thongtin', function (data) {
    mang.push(new hocvien(data.hoten, data.email, data.sodienthoai));
    io.sockets.emit('server-send-thongtin', mang);
  });

  socket.on('delete-data', function () {
    mang = [];
    io.sockets.emit('server-send-thongtin', mang);
  });
});

function hocvien(hoten, email, sdt) {
  this.HOTEN = hoten;
  this.EMAIL = email;
  this.SDT = sdt;
}

app.get('/', function (req, res) {
  res.render('trangchu');
});
