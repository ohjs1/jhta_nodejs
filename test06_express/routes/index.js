var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/join',function(req,res){
  res.render('join');	
});
router.post('/joinOk',function(req,res){
	//post로 전송된 파라미터는 req.body 객체로 얻어온다.
	let name=req.body.name;
	let phone=req.body.phone;
	let addr=req.body.addr;
	//db저장....
	res.render("result",{name:name,phone:phone,addr:addr});
});
module.exports = router;










