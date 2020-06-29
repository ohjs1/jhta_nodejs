//클라이언트가 접속하면 chat.html 페이지 보이기
var http = require('http');
var fs = require('fs');
var url = require('url');
var socket = require('socket.io'); 

var server = http.createServer( (req, res) =>{
    var u = url.parse(req.url);
    var path = u.pathname;

    if(path === '/'){
        fs.readFile('chat.html', 'utf8', (err, data)=>{
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            res.end();
        });
    }
});

server.listen(3000, ()=>{
    console.log('listen 3000 port!');
});

//소켓 서버 실행하기
var io = socket.listen(server); //소켓서버 실행하기
io.on('connection', (socket)=>{
    console.log('클라이언트가 접속했어요.');
    socket.on('sendMsg', (data)=>{
        //console.log('msg:' + data.msg);
        console.log(data.nickname + "," + data.msg);
        //다른클라이언트들에게 이벤트 발생시키기
        io.sockets.emit('recMsg', data);
    });

    socket.on('exitEvent', (data)=>{
        io.sockets.emit('exit', data);
        socket.disconnect(); //접속 해제하기
    });


});