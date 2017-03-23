var http = require('http');
var url = require('url');
// 1. fs(파일시스템) 모듈 사용
var fs = require('fs');
// 1. mime 모듈 추가. 서비스하려는 파일의 타입을 알아내기 위해서 필요
var mime = require('mime');

//1. 서버 생성
var server = http.createServer((request,response) => {
	var parsedUrl = url.parse(request.url);
	var res = parsedUrl.pathname;
	// 제일 앞에 / 를 제거하면 fs.readfile에서 실제 경로상의 파일을 접근할 수있다.
	res = res.substring(1);
	if(res == "") {
		res = "index.html";
	}
	// 4. 서비스 하려는 파일의 mime type
    var resMime = mime.lookup(res);
	
	console.log("mime = " + resMime);
	if(resMime == "text/html") {
		// 2. 비동기방식의 파일읽기. 파일을 읽은 후 마지막 파라미터에 넘긴 callback 함수가 호출
		fs.readFile(res, 'utf-8', (error, data) => {
    		response.writeHead(200,{'Content-Type':'text/html'});
    		response.end(data);
		});
	//그 외의 mime type은 모두 여기서 처리
	} else {
		// 2. 비동기방식의 파일읽기. 파일을 읽은 후 마지막 파라미터에 넘긴 callback 함수가 호출
		fs.readFile(res, (error, data) => {
			if(error) {
				response.writeHead(404,{'Content-Type':"text/html"});
				response.end("<h1>404</h1>page not found")
			} else {
    			response.writeHead(200,{'Content-Type':resMime});
    			response.end(data);
			}
		});
	}
	
}) ;

server.listen(1000,() => {
	console.log("server!!!");
});