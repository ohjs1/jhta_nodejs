/**
 * app3.js
 * 
 * 라우팅 
 *   - 클라이언트 url요청에 대한 응답방식을 설정
 *   - 라우터:요청을 식별해서 요청을 수행
 * 미들웨어
 *   - 어플리케이션에 대한 http요청에 동작하는 기능을 캡슐화하는 방법
 *   - 미들웨어는 요청객체,응답객체,next함수를 매개변수로 받는 함수이다.
 *   - app.use함수를 사용해서 미들웨어를 삽입한다.
 */
var express=require('express');
var app=express();
var routerA = express.Router(); //라우터 생성하기
var routerB = express.Router();
//미들웨어 삽입하기
app.use(function(req, resp, next){
	console.log('미들웨어 1 수행!!');
	next(); // 다음 미들웨어가 있으면 수행하고 없으면 요청에 따른 라우터를 수행
});

app.use(function(req, resp, next){
	console.log('미들웨어 2 수행!!');
	next(); // 다음 미들웨어가 있으면 수행하고 없으면 요청에 따른 라우터를 수행
});

routerA.get('/index', function(req, resp){
	resp.send('<h1>RouterA!</h1>');
});

routerA.get('/hello', function(req, resp){
	resp.send('<h1>RouterA! Hello</h1>');
});

routerB.get('/abc', function(req, resp){
	resp.send('<h1>RouterB! ABC!!!</h1>');
});

app.use('/a', routerA); //a경로로 요청이 들어오면 routerA수행하라.
app.use('/b', routerB);

app.listen(3002,function(){
	console.log('server start!(3002)');
});


