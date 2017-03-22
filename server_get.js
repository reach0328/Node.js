var http = require('http');

// 1. 요청한 url을 객체로 만들기 위해 url 모듈사용
var url = require('url');
// 2. 요청한 url 중에 Query String 을 객체로 만들기 위해 querystring 모듈 사용
var querystring = require('querystring'); 
// 1. 이벤트가 정의되 있는 events 모듈 생성. 이전 버전의 process.EventEmitter() 는 deprecated!
var EventEmitter = require('events');

// 2. 생성된 이벤트 모듈을 사용하기 위해 custom_object로 초기화
var custom_object = new EventEmitter();

// 3. events 모듈에 선언되어 있는 on( ) 함수를 재정의 하여 'call' 이벤트를 처리 
custom_object.on('call', ()=> {
    console.log('called events!');
});

var server = http.createServer(function(request,response){
    // 3. 콘솔화면에 로그 시작 부분을 출력
    console.log('--- log start ---');
    // 4. 브라우저에서 요청한 주소를 parsing 하여 객체화 후 출력
    var parsedUrl = url.parse(request.url);
    console.log(parsedUrl);
    // // 5. 객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
    var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
    // http://도메인/디렉토리/디렉토리2/파일명 변수?=
    // http://localhost:8080/aaa/bbb/ccc?abc=1234&asdf=4324
    console.log(parsedQuery);
    console.log("abc="+parsedQuery.abc);
    console.log("asdf="+parsedQuery.asdf);
    if(parsedQuery.abc=="call") {
        // 4. call 이벤트를 강제로 발생
        custom_object.emit('call');
    }
    // 6. 콘솔화면에 로그 종료 부분을 출력
    console.log('--- log end ---');

    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('Hello node.js!!');
});

server.listen(8080, function(){
    console.log('Server is running...');
});