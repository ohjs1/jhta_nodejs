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

router.get('/insert', (req, res)=>{
  res.render('insert');
});

router.post('/insertOk', (req, res)=>{
  let name = req.body.name;
  let phone = req.body.phone;
  let addr = req.body.addr;


  const sql = "insert into members values(0, ?, ?, ?, now())";

  client.query(sql, [name, phone, addr], (err)=>{
    if(err){
      console.log('error');
      res.render('error', {'error': err});
    } else {
      console.log('success');
      res.render('result');
    }
  });
});

router.get('/list', (req, res)=>{
  const sql = "select * from members";

  client.query(sql, (err, results)=>{
    if(err){
      console.log('error');
      res.render('error', {'error': err});
    } else {
      console.log('success');
      res.render('list', {'list' : results});
    }
  });

});

router.get('/delete', (req, res)=>{
  let num = req.query.num;
  const sql = "delete from members where num = ?";
  console.log(num);

  client.query(sql, [num], (err)=>{
    if(err){
      console.log('error');
      res.render('error', {'error': err});
    } else {
      console.log('success');
      res.redirect('/users/list');
    }
  });
});

router.get('/update', (req, res)=>{
  let num = req.query.num;
  const sql = "select * from members where num = ?";

  client.query(sql, [num], (err, results)=>{
    if(err){
      console.log('error');
      res.render('error', {'error': err});
    } else {
      res.render('update', {'list': results[0]});
    }
  });
});

router.post('/updateOk', (req, res)=>{
  let num = req.body.num;
  let name = req.body.name;
  let addr = req.body.addr;
  const sql = "update members set name=?, addr=? where num=?";
  client.query(sql, [name, addr, num], (err)=>{
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
