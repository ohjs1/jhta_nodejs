/**
 * member.js
 */
//회원아이디,이메일,이름
function Member(id,email,name){
	this.id=id;
	this.email=email;
	this.name=name;
}
Member.prototype.printInfo=function(){
	console.log('아이디:' + this.id);
	console.log('이메일:' + this.email);
	console.log('이름:' + this.name);
};
module.exports=Member;






