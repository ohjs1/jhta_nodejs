var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var client = mysql.createConnection({
  user: 'root',
  password: 'java1234',
  database: 'Sample01'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/insert', function(req, res){
  res.render('join');
});

router.post('/joinOk', function(req, res){
  let id = req.body.id;
  let pwd = req.body.pwd;
  let email = req.body.email;
  console.log('test');
  //db에 저장하기
  const sql = "insert into users values(?, ?, ?)";

  //결과 응답하기
  client.query(sql, [id, pwd, email], function(err){
    if(err){
      console.log('error');
      res.render('error', {'error': err});
    } else {
      console.log('success');
      res.render('result');
    }
  });

});

router.get('/list', function(req, res){
  const sql = "select * from users";
  client.query(sql, function(err, resluts){
    console.log(resluts);
    if(err){
      console.log('error');
      res.render('error', {'error': err});
    } else {
      console.log('success');
      res.render('list', {'list': resluts});
    }
  });
});

router.get('/delete', function(req, res){
  var id = req.query.id;  //url에 붙어온 파라미터값 얻어오기
  const sql = "delete from users where id = ?";

  client.query(sql, [id], function(err){
    if(err){
      console.log('error');
      res.render('error', {'error': err});
    } else {
      console.log('success');
      res.redirect('/users/list'); //리다이렉트 방식으로 요청하기
    }
  });
});

router.get('/update', function(req, res){
  var id = req.query.id;
  const sql = "select * from users where id = ?";

  client.query(sql, [id], function(err, resultsUser){
    if(err){
      console.log('error');
      res.render('error', {'error': err});
    } else {
      console.log('success');
      res.render('update', {'ulist': resultsUser[0]});
    }
  });
});

router.post('/updateOk', function(req, res){
  var id = req.body.id;
  var pwd = req.body.pwd;
  var email = req.body.email;
  

  const sql = "update users set pwd=?, email=? where id=?";
  client.query(sql, [pwd, email, id], function(err){
    if(err){
      console.log('error');
      res.render('error', {'error': err});
    } else {
      console.log('success');
      res.redirect('/users/list');
    }
  });
});
module.exports = router;
