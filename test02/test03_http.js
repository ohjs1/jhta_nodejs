/**
 * test03_http.js
 */
var http=require('http');
var fs=require('fs');
var ejs=require('ejs');
var server=http.createServer(function(req,resp){
	//html파일로 클라이언트에 응답하기
	fs.readFile('hello.html','utf8',function(err, data) {
		if(err){
			console.log('err:' + err);
		}else{
			resp.writeHead(200,{'Content-Type':'text/html'});
			resp.write(data);		
			resp.end();
		}
	});
});
server.listen(4000,function(){
	console.log('server start!(4000)');
});





