/**
 * test05_usemodule.js
 */
//사용자가 만든 모듈 불러오기
var a=require('./myfunc');
a('hello');
//두수를 파라미터로 전달받아 두수합을 구해서 리턴하는 sum함수를 만들고
//require함수를 사용해서 사용해 보세요.
var sum=require('./sum');
var b=sum(10,20);
console.log(b);
//student객체를 불러와 사용해 보세요.
var s=require('./student');
s.setData(1,100,100,100);
s.printData();
//회원아이디,이메일,이름을 저장하고 출력하는 객체 만들고
//사용해 보세요.(생성자 방식)
var Member=require('./member');
var m=new Member('aa','aa@','길동1');
m.printInfo();
var m1=new Member('bb','bb@','길동2');
m1.printInfo();















