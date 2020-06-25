/**
 * test01.js
 */
//1. 빈 Object객체 생성
var shape={};//빈 객체
shape.width=200;
shape.height=100;
shape.getArea=function(){
	return this.width*this.height;
};
console.log("box area:" + shape.getArea());
//2. 객체리터럴 방식
var user={
		id:"admin",
		pwd:"1234",
		showData:function(){
			console.log("id:" + this.id);
			console.log("pwd:" + this.pwd);
		}
};
user.showData();
//3. 생성자방식으로 객체 만들기(재활용가능)
function Member(id,pwd,email){//생성자 -> 함수이름을 대문자로 만든다
	//멤버변수에 값 초기화 하기
	this.id=id; 
	this.pwd=pwd;
	this.email=email;
}
//멤버함수 추가하기
Member.prototype.getId=function(){
	return this.id;
};
Member.prototype.getPwd=function(){
	return this.pwd;
};
Member.prototype.getEmail=function(){
	return this.email;
};
var mem=new Member("test","1234","test@daum.net");
console.log("아이디:" + mem.getId());
console.log("비밀번호:" + mem.getPwd());
console.log("이메일:" + mem.getEmail());
var mem1=new Member("admin","5678","admin@daum.net");
console.log("아이디:" + mem1.getId());
console.log("비밀번호:" + mem1.getPwd());
console.log("이메일:" + mem1.getEmail());


















