var express = require('express');
var chat = require('../chat/chat');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/enter', (req, res)=>{
  let nickname = req.body.nickname; //파라미터로 전송된 사용자 닉네임
  console.log(nickname);
  req.session.nickname = nickname; //세션에 사용자 닉네임 추가하기
  chat.addUser(nickname); //전체 참석자명단에 닉네임 추가하기
  //방제목명단 얻어오기
  var roomlist = chat.getRoomList();
  res.render('enter', {nickname:nickname, roomlist:roomlist});
});

router.get('/enter', (req, res)=>{
  let nickname = req.body.nickname;
  var roomlist = chat.getRoomList();
  res.render('enter', {nickname:nickname, roomlist:roomlist});
});

router.post('/makeroom', (req, res)=>{
  var nickname = req.session.nickname;
  var roomname = req.body.roomname;
  chat.addRoom(roomname); //방만들기(방이름추가)
  chat.joinRoom(roomname, nickname); //방에 참석자 명단으로 추가
  var attendants = chat.getAttendants(roomname); //방의 참석자 명단 얻어오기
  res.render('join', {nickname:nickname , roomname:roomname, attendants:attendants});
});

router.get('/join', (req, res)=>{
  var roomname = req.query.room;
  var nickname = req.session.nickname;
  chat.joinRoom(roomname, nickname);
  var attendants = chat.getAttendants(roomname); //참석자 명단
  res.render('join', {nickname:nickname , roomname:roomname, attendants:attendants});
});



module.exports = router;
