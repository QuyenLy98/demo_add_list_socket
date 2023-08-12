var socket = io('https://add-list-socket.onrender.com');
socket.on('server-send-thongtin', function (data) {
  $('#txthoten').val('');
  $('#txtemail').val('');
  $('#txtsdt').val('');
  $('#ds').html('');
  data.map(function (hocvien, index) {
    $('#ds').append(`<div class="hocvien">
    <div class="hang1">id: ${index + 1} || <span>${hocvien.HOTEN}</span></div>
    <div class="hang2">${hocvien.EMAIL} - ${hocvien.SDT}</div>
  </div>`);
  });
});

$(document).ready(function () {
  socket.emit('load-data');
  $('#btnsend').click(function () {
    socket.emit('hocvien-send-thongtin', {
      hoten: $('#txthoten').val(),
      email: $('#txtemail').val(),
      sodienthoai: $('#txtsdt').val(),
    });
  });

  $('#xoadata').click(function () {
    socket.emit('delete-data');
  });
});
