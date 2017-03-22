//서버 생성을 위해 http 모듈을 사용한다
var http = require('http'); // java에서 import http와 같다.
// 1. 이벤트가 정의되 있는 events 모듈 생성. 이전 버전의 process.EventEmitter() 는 deprecated!
var EventEmitter = require('events');

// 2. 생성된 이벤트 모듈을 사용하기 위해 custom_object로 초기화
var custom_object = new EventEmitter();

// 3. events 모듈에 선언되어 있는 on( ) 함수를 재정의 하여 'call' 이벤트를 처리 
custom_object.on('call', ()=> {
    console.log('called events!');
});

var callback = function(request, response) { // 콜백 함수는 함수 이름없이 함수 몸통을 작성한다.
									// 이함수는 사용자로부터 요청이 있으면 호출된다.
		response.writeHead(200,{'content-Type':'text/html'}); //응답에 대한 정보값만(타입 지정)
		response.end('Hello node.js!<br/> Im park'); //최종적으로 데이터를 보내는것을 마침
};
// http 모듈 안에 createServer로 nodejs 서버를 생성 
// api로 서버를 생성한다.
var server = http.createServer(callback);

function listenCallback() { // 이 콜백함수는 서버가 열리고 나면 호출된다.
	console.log('Server is running...');
}

// 생성된 서버를 열어준다.
server.listen(8080, listenCallback);