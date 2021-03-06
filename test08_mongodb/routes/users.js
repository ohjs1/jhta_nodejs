var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');//npm install mongoose --save
mongoose.connect('mongodb://127.0.0.1:27017/sample01',function(){
	console.log('connection success!');
});
var Schema=mongoose.Schema;//스키마객체 얻어오기
var UserSchema=new Schema({id:String,pwd:String,email:String});
var Users=mongoose.model('users',UserSchema);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/insert',function(req,res){
	res.render('join');
});
router.post('/joinOk',function(req,res){
	let id=req.body.id;
	let pwd=req.body.pwd;
	let email=req.body.email;
	//db에 저장하기
	new Users({id:id,pwd:pwd,email:email}).save(function(err,user){
		if(err){
			console.log('error:'+ err);
			res.render('error',{error:err});
		}else{
			console.log('success');
			res.render('result');
		}
	});	
});
router.get('/list',function(req,res){
	Users.find(function(err,results){
		if(err){
			console.log('error:'+ err);
			res.render('error',{error:err});
		}else{
			console.log('success');
			res.render('list',{list:results});
		}
	});
});
router.get('/delete',function(req,res){
	var id=req.query.id;
	Users.remove({id:id},function(err){
		if(err){
			console.log('error:'+ err);
			res.render('error',{error:err});
		}else{
			res.redirect('/users/list');
		}
	});
});

router.get('/update', function(req, res){
	var id = req.query.id;
	Users.find(function(err, result){
		if(err){
			console.log('error:'+ err);
			res.render('error',{error:err});
		}else{
			console.log('success');
			res.render('update',{ulist:result[0]});
		}
	});
});

router.post('/updateOk', function(req, res){
	var id = req.body.id;
	var pwd = req.body.pwd;
	var email = req.body.email;

	Users.update({id:id, pwd:pwd, email:email}, function(err){
		if(err){
			console.log('error:'+ err);
			res.render('error',{error:err});
		}else{
			console.log('success');
			res.redirect('/users/list');
		}
	});
});
module.exports = router;





















