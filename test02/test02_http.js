/**
 *  test02_http.js
 */
var http=require('http');
//웹서버 생성하기
var server=http.createServer(function(request, response) {
	//html로 응답하기
	response.writeHead(200,{'Content-Type':'text/html'});
	response.write('<h1>Hello Nodejs</h1>');
	response.end();
});
//웹서버 실행하기
server.listen(3000,function(){
	console.log('server start!(port:3000)');
});










