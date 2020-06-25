/**
 * http://usejsdoc.org/
 */
//학생번호,국어,영어,수학점수를 생성자 매개변수로 전달받아
//총점/평균/출력하는 메소드를 추가하고 사용해 보세요.->생성자방식
function Student(num,kor,eng,math){
	this.num=num;
	this.kor=kor;
	this.eng=eng;
	this.math=math;
}
Student.prototype.getTot=function(){
	return this.kor+this.eng+this.math;
};
Student.prototype.getAvg=function(){
	return this.getTot()/3;
};
Student.prototype.showData=function(){
	console.log("학생번호:" + this.num);
	console.log("국어:" + this.kor);
	console.log("영어:" + this.eng);
	console.log("수학:" + this.math);
	console.log("총점:" + this.getTot());
	console.log("평균:" + this.getAvg());
};
var stu=new Student(1,100,100,100);
stu.showData();




