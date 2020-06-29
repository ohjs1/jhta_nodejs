
var http=require('http');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring');
var mysql=require('mysql');
var ejs=require('ejs');

var client=mysql.createConnection({
	user:'root',
	password:'java1234',
	database:'sample01'
});

var server=http.createServer(function(req, res) {
	var u=url.parse(req.url);
	var path=u.pathname;
	if(path==='/'){
		fs.readFile('index.html','utf8', function(err, data) {
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();
		});
	} else if(path === '/member/join'){
        fs.readFile('join.html', 'utf8', (err, data)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();
        });
    } else if(path === '/joinOk'){
        
        req.on('data',function(data){
            var params=querystring.parse(data.toString());
            var id = params.id;
            var pwd = params.pwd;
            var email = params.email;
            var phone = params.phone;

            let code = "";
            

            const sql = "insert into member_join values(?, ?, ?, ?, now())";
            client.query(sql,[id,pwd,email,phone],function(err){
                if(err){
                    console.log('error:' + err);
					code='fail';
				}else{
                    console.log('success');
                    code = "success";
                }
                fs.readFile('result.ejs','utf8', function(err, data) {
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(ejs.render(data,{code:code}));
					res.end();
				});	
            });
        });
    } else if(path === '/list'){
        const sql = "select * from member_join";

        client.query(sql, function(err, results){
            if(!err){
                fs.readFile('mlist.ejs','utf8', function(err, data) {
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(ejs.render(data,{mlist:results}));
					res.end();
				});	
            }
        }); 
    } else if(path === '/delete'){
        let query=u.query;
		const param=querystring.parse(query);
		let id=param.id;
        const sql = "delete from member_join where id=?";
 
        client.query(sql, [id], function(err){
            if(!err){
                fs.readFile('result.ejs','utf8', function(err, data) {
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(ejs.render(data,{code:"success"}));
					res.end();
				});	
            }
        }); 
    } else if(path === '/updateOk'){
        let query=u.query;
		const param=querystring.parse(query);
        let id=param.id;
        let email = param.email;
        let phone=param.phone;
        const sql = "update member_join set email=?, phone=? where id=?";
 
        client.query(sql, [email, phone, id], function(err){
            if(!err){
                fs.readFile('result.ejs','utf8', function(err, data) {
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(ejs.render(data,{code:"success"}));
					res.end();
				});	
            }
        }); 
    }  else if(path === '/update'){
        let query=u.query;
		const param=querystring.parse(query);
        let id=param.id;

        fs.readFile('update.ejs', 'utf8', (err, data)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
			res.write(ejs.render(data,{id:id}));
			res.end();
        });
    }
});
server.listen(3000,function(){
	console.log('server start!(3000)');
});