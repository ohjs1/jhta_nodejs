/**
 * app.js
 * 
 * http서버를 실행하고 클라이언트가 웹브라우져로 접속하면 
 * index.html페이지가 보이도록 해보세요.
 */
var http=require('http');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring');
var mysql=require('mysql');//npm install mysql
var ejs=require('ejs');//npm install ejs

//mysql에 접속하기 위한 객체 얻어오기
var client=mysql.createConnection({
	user:'root',
	password:'java1234',
	database:'sample01'
});

var server=http.createServer(function(req, res) {
	var uu=url.parse(req.url);
	var path=uu.pathname;
	if(path==='/'){
		fs.readFile('index.html','utf8', function(err, data) {
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();
		});
	}else if(path==='/insert'){
		fs.readFile('insert.html','utf8', function(err, data) {
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();
		});
	}else if(path==='/insertOk'){
		req.on('data',function(data){
			var params=querystring.parse(data.toString());
			var name=params.name;
			var phone=params.phone;
			var addr=params.addr;
			//db에 사용자정보 저장하기
			const sql="insert into members values(0,?,?,?,now())";
			client.query(sql,[name,phone,addr],function(err){
				let code='success';
				//사용자에게 결과 응답하기
				if(err){
					console.log('error:' + err);
					code='fail';
				}else{
					console.log('success');
				}
				fs.readFile('result.ejs','utf8', function(err, data) {
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(ejs.render(data,{code:code}));
					res.end();
				});			
			});	
		});
	}else if(path==='/list'){
		const sql="select num,name,phone,addr,date_format(regdate,'%Y-%m-%d') regdate" + 
		        " from members";
		//select로 조회된 결과값들이 results에 담김
		client.query(sql,function(err,results){
			let code='success';
			if(err){
				code='error';
				console.log('error:' + err);
			}
			fs.readFile('list.ejs','utf8',function(err, data) {
				res.writeHead(200,{'Content-Type':'text/html'});
				//list.ejs파일에 list라는 이름으로 results보내기
				res.write(ejs.render(data,{list:results}));
				res.end();
			});
		});
	}else if(path==='/delete'){
		let query=uu.query;//url에 붙어온 쿼리스트링( /delete?num=1&name=aaa )
		const param=querystring.parse(query);
		let num=param.num;
		const sql="delete from members where num=?";
		client.query(sql,[num],function(err){
			if(err){
				console.log('error:' + err);
			}else{
				//리다이렉트방식으로 응답하기
				res.writeHead(302,{'Location':'/list'});
				res.end();
			}
		});
	}else if(path==='/update'){
		let query=uu.query;//url에 붙어온 쿼리스트링( /delete?num=1&name=aaa )
		const param=querystring.parse(query);
		let num=param.num;
		const sql="select num,name,phone,addr,date_format(regdate,'%Y-%m-%d') regdate" + 
        " from members where num=?";
		client.query(sql,[num],function(err,results){
			if(err){
				console.log('error:' + err);
			}else{
				fs.readFile('update.ejs','utf8',function(err, data) {
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(ejs.render(data,{member:results[0]}));
					res.end();
				});
			}
		});
	}else if(path==='/updateOk'){
		req.on('data',function(data){
			var params=querystring.parse(data.toString());
			var num=params.num;
			var name=params.name;
			var phone=params.phone;
			var addr=params.addr;
			//db에 사용자정보 저장하기
			const sql="update members set phone=?,addr=? where num=?";
			client.query(sql,[phone,addr,num],function(err){
				let code='success';
				//사용자에게 결과 응답하기
				if(err){
					console.log('error:' + err);
					code='fail';
				}else{
					console.log('success');
				}
				fs.readFile('result.ejs','utf8', function(err, data) {
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(ejs.render(data,{code:code}));
					res.end();
				});			
			});	
		});
	}
});
server.listen(3000,function(){
	console.log('server start!(3000)');
});











