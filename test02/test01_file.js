/**
 * test01_file.js
 */
var fs=require('fs');
/*//파일로 저장하기
fs.writeFile('test.txt','hello nodejs!',function(err){
	if(err){
		console.log('error:' + err);
	}else{
		console.log('파일로 저장완료!');
	}
});*/
//저장된 파일 읽어오기
fs.readFile('test.txt','utf8',function(err, data) {
	if(err){
		console.log('error:' + err);
	}else{
		console.log(data);
	}
});

















