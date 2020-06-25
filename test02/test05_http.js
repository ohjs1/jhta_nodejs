/**
 * test05_http.js
 */
var http=require('http');
var fs=require('fs');
var ejs=require('ejs');
var querystring=require('querystring');
var url=require('url');
var server=http.createServer(function(req, resp) {
	var u=url.parse(req.url);
	var path=u.pathname;
	if(path==='/'){
		fs.readFile('index.html','utf8',function(err, data) {
			if(err){
				console.log('err:' + err);
			}else{
				resp.writeHead(200,{'Content-Type':'text/html'});
				resp.write(data);
				resp.end();
			}
		});
	}else if (path==='/insert') {
		fs.readFile('insert.html','utf8',function(err, data) {
			if(err){
				console.log('err:' + err);
			}else{
				resp.writeHead(200,{'Content-Type':'text/html'});
				resp.write(data);
				resp.end();
			}
		});
	}else if(path==='/insertOk'){
		//post방식으로 요청시 전송된 파라미터가 존재하면 data이벤트가 발생됨
		req.on('data',function(data){
			var param=querystring.parse(data.toString());
			var name=param.name;
			var phone=param.phone;
			var addr=param.addr;
			console.log('전송된 데이터:' + name +","+ phone +"," + addr);
			//db에 저장하기
			const code='success';
			//result.ejs파일을 만들고
			//result.ejs파일에 전송된 파라미터와 code값이 출력되도록 해보세요.
			/*
			 * [ 출력결과 ]
			 * 이름:홍길동
			 * 전화번호:010
			 * 주소:서울
			 * 요청결과:success
			 */
			fs.readFile('result.ejs','utf8',function(err, data) {
				if(err){
					console.log('err:' + err);
				}else{
					resp.writeHead(200,{'Content-Type':'text/html'});
					resp.write(ejs.render(data,{name:name,phone:phone,addr:addr,code:code}));
					resp.end();
				}
			});
		});
	}
});
server.listen(3000,function(){
	console.log('server start!(3000)');
});







