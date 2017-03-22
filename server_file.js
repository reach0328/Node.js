var http = require('http');
var url = require('url');
// 1. fs(파일시스템) 모듈 사용
var fs = require('fs');

//1. 서버 생성
var server = http.createServer((request,response) => {
	var parsedUrl = url.parse(request.url);
	var res = parsedUrl.pathname;

	if(res == "/index.html") {
		// 2. 비동기방식의 파일읽기. 파일을 읽은 후 마지막 파라미터에 넘긴 callback 함수가 호출
		fs.readFile('index.html', 'utf-8', (error, data) => {
    		response.writeHead(200,{'Content-Type':'text/html'});
    		response.end(data);
		});
	}else if(res =="/dog.jpg"){
		// 2. 비동기방식의 파일읽기. 파일을 읽은 후 마지막 파라미터에 넘긴 callback 함수가 호출
		fs.readFile('dog.jpg', (error, data) => {
    		response.writeHead(200,{'Content-Type':'image/jpeg'});
    		response.end(data);
		});
	}else {
		response.writeHead(404,{'Content-Type':'text/html'});
    	response.end("<h1>404 Page Not Found");
	}
}) ;

server.listen(1000,() => {
	console.log("server!!!");
});