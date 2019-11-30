
# tech-interview-questions

<참고 사이트>
<https://www.fullstack.cafe/blog/front-end-developer-interview-questions>

## network

### TCP 3/4-way handshake에 대해서 설명하시오

![TCP/IP](/tech-interview-questions/image/tcpip.png)

tcp는 transport layer의 연결-지향 프로토콜로써, 근원지와 목적지 사이에 가상 경로를 연결합니다. 가상경로를 구축한 이점으로 전송된 데이터가 훼손또는 손실될 경우 재전송을 해주고, 확인 응답 프로세스를 가능하게 해줍니다. TCP의 연결에는 connection setup, data transfer, connection termination의 3단계가 있습니다. TCP 3way handshaking은 connection setup의 과정이고, TCP 4way handshaking은 connection termination의 과정입니다.

SYN세그먼트를 보내고 ACK의 응답을 받으면 연결이 되는데, connection setup 단계에서는 연속적인 세번의 통신을 통해 양방향 연결이 성사 됩니다.
> client process에서 Active open을 하게 되면 client TCP에서 SYN세그먼트를 보냅니다. server process에서 Passive open을 한 상태라면 client에서 보내온 SYN세그먼트를 받은 후 SYN+ACK세그먼트를 client TCP에게 보냅니다. client가 SYN+ACK 세그먼트를 받으면 마지막으로 ACK 세그먼트를 server TCP에 보내고, 해당 ACK세그먼트를 server가 받으면 양방향 연결이 성사됩니다.

connection termination 단계에서는 양방향 2개 연결이 독립적으로 닫게 됩니다. 이 때문에 4way의 단계를 밟게 됩니다.
> 다양한 상황이 있을 수 있는데, 한 방향이 연결이 종료 되어도 다른 방향은 계속 오픈상태일 수 있습니다.</br>
> client process에서 active close를 하면 client TCP에서 FIN 세그먼트를 보냅니다. server는 FIN세그먼트를 받았다는 응답에 대한 ACK를 client로 보냅니다. 이때, server TCP는 server process에게 EOF를 보내지만, process는 바로 close되지 않을 수 있습니다. server process로부터 passive close를 받으면 그제서야 server TCP에서 FIN세그먼트를 client TCP에게 보내게 됩니다. server TCP로부터 FIN세그먼트를 받은 client TCP는 ACK응답을 server TCP로 보내고, 이를 받게 되면 연결이 종료됩니다.

### TCP와 UDP에 대해서 비교 설명하시오

TCP와 UDP는 둘다 Transport layer protocol입니다. 해당 프로토콜은 process to process 통신을 가능하게 해줍니다.  
>p2p통신이란 IP주소와 Port번호의 결합인 socket address를 이용하여 통신하는 것을 말합니다.

UDP는 흐름제어나 오류제어와 같은 신뢰성을 제공하지 않는 비연결 프로토콜입니다. 단순성과 효율성 때문에 실시간 스트리밍과 같은 곳에 사용됩니다.
TCP는 이와 반대로 흐름제어와 오류제어를 제공하는 신뢰성 연결 지향 프로토콜입니다. TCP는 송수신 process 2개가 마치 연결된 것처럼 바이트의 stream으로 데이터를 송수신 합니다.

### Http/Https 의 차이점에 대해 설명하시오

> TLS가 어떤방식으로 보안을 하는지 더 찾아보자

SSL(security socket layer)와 TLS(Transport layer security)라는 전송층 보안이 TCP를 이용하는 응용층(HTTP)를 위해 제공됩니다. TCP를 사용하는 HTTP 응용층 프로그램은 SSL패킷(HTTPS)으로 데이터를 캡슐화 할 수 있습니다.
SSL(security socket layer)와 TLS(Transport layer security)라는 전송층 보안이 TCP를 이용하는 응용층( ex) http )을 위해 제공된다. TCP를 사용하는 HTTP 응용층 프로그램은 `https://`URL를 통해 SSL패킷(HTTPS)로 데이터를 캡슐화 할 수 있다.

### Osi 7layer와 tcp/ip에 대해 비교하여 설명하시오

컴퓨터나 원거리 통신 장비 사이의 원활하고 효과적인 통신을 위해 규정한 통신 규칙을 protocol이라고 합니다. protocol에는 가장 많이 쓰이고 있는 tcp/ip(5 layer)와 상용화에 실패한 OSI 7 layer 모델이 있습니다. tcp/ip는 5layer로, physical, data-link, network, transport, application layer가 있고, osi 에는 session과 presentation layer가 추가로 있습니다. OSI 는 ISO에서 만든 모델인데, TCP/IP가 이미 완전히 자리잡고 있었고,  protocol 교체에는 많은 돈과 시간이 들지만 osi가 tcp/ip에 비해 큰 이점이 없었기 때문에 상용화 되지 못했습니다.

### client에서 SYN만 보내고 ACK를 보내지 않는걸 반복한다면 어떤 현상이 일어나며 어떻게 대응할지 설명해주세요

해당 상황을 SYN flooding attack이라고 합니다. 수많은 SYN을 받은 TCP서버는 SYN+ACK응답을 위조된 클라이언트에게 송신하여 많은 자원을 할당하게 됩니다. 서버는 결국 자원이 모두 고갈되고 무너질 수 있습니다. 이에 대처하기 위해 시간당 연결 요청수를 제한하고 원치않은 근원지 주소로부터 오는 데이터그램은 받지 않을 수 있습니다. 또한 쿠키를 사용하여 전체 연결설정시까지 자원할당을 지연하는 방법을 사용합니다.

### SSL or TLS 작동원리와 handshake는

> https 통신 방식에 대해 더 알아보기

SSL과 TLS에 4단계의 handshake protocol이 존재합니다.

- 보안 기능 설정 : 클라이언트와 서버는 서로의 보안능력을(SSL의 버전, 암호화 알고리즘등) 알리고, 양쪽 모두에 편리한 것을 선택합니다.
- 서버인증과 키교환: 클라이언트를 위해 서버가 인증되고 서버의 공개키를 알 수 있게 됩니다.
- 클라이언트 인증과 키교환 : 서버를 위해 클라이언트가 인증되고 클라이언트의 공개키를 알 수 있게 됩니다.
- 완료 및 종료 : 종료를 위해 메세지를 보냅니다.

### reference

1. [HTTP-protocol](https://joshua1988.github.io/web-development/http-part1/)

Socket에서 bind, listen, accept 각각 어떤 기능을 하는지 설명하시오.(TCP/IP책보기)
동기I/O와 비동기 I/O의 차이에 대해 소켓 레벨에서 설명하시오
socket에서 connection timeout과 read timeout을 각각 설명해주세요
TCP로 한국에서 반대편(브라질?)에 있는 서버에 연결하기 까지 시간은?

## javascript

### js-reference

1. [reference1](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/JavaScript)

2. [reference2](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/FrontEnd)

### closure

함수 내부에 정의된 함수를 inner function이라고 합니다. inner function은 클로저를 생성하거나 부모함수코드에서 외부에서의 접근을 막고 독립적인 헬퍼 함수를 구현하는 용도 등으로 사용 됩니다. 스코프 체이닝 때문에 내부함수는 자신을 둘러싼 외부 함수의 변수에 접근 가능합니다. 또한 내부함수는 일반적으로 자신이 정의된 부모 함수 내부에서만 호출이 가능합니다.

```javascript
let c = 500;
function parent() {
    let a = 100;
    let b = 200;

    function child() {
        let b = 300;
        console.log(a, b);
    }
    child();    // 100, 300 => 외부함수의 변수에 접근하였다.
    console.log(a, b, c );  // 100, 200, 500 => 스코프 체이닝 때문에 외부에서 선언된 변수나 함수에 접근이 가능하다.
};
parent();
child();//  child is not defined => 부모함수 외부에서 내부함수를 호출하는 것은 불가능하다.
```

하지만 부모 함수에서 return 값으로 inner 함수를 반환한다고 하면 외부에서 inner 함수를 실행할 수 있는데, 이렇게 이미 실행이 끝난 부모 함수 스코프의 변수를 참조하는 inner()와 같은 함수를 클로저라고 합니다.

### overriding vs overloading

### 왜 react를 쓰는건가요

업데이트하는 항목에 따라 어떤 부분을 찾아서 변경할지 규칙을 정하는 작업은 간단하지만, 애플리케이션 규모가 크면 상당히 복잡해지고 제대로 관리하지 않으면 성능이 떨어질 수 있습니다. 이를 해결하기 위해 어떤 데이터가 변할 때마다 어떤 변화를 줄지 고민하는 것이 아니라 그냥 기존 뷰를 날려 버리고 처음부터 새로 렌더링을 합니다. 하지만 웹브라우저에서 이 방식대로 하면 CPU점유율도 많이 잡아먹고 메모리도 많이 사용할 것입니다. 그래서 고안된 라이브러리가 오직 View만 신경쓰는 react입니다. react라이브러리는 데이터를 업데이트하면 전체 UI를 Virtual DOM에 리렌더링 합니다. 그 후 이전 Virtual DOM에 있던 내용과 현재 내용을 비교합니다. 마지막으로 바뀐 부분만 실제 DOM에 적용합니다.

리액트는 지속적으로 데이터가 변화하는 대규모 애플리케이션을 구축하기 위해 고안된 라이브러리 입니다. 즉 업데이트 처리의 간결성이 장점입니다.

### react life cycle

### babel에 대해서 바벨 언제 쓰는건지 하는 역할이 먼지

### webpack에 대해서

### [nodejs가 무엇인지 설명하시오, javascript에 대해서](https://medium.com/@sunki.baek)

> [인사이드 자바스크립트책](http://book.interpark.com/product/BookDisplay.do?_method=detail&sc.prdNo=213715769&gclid=EAIaIQobChMIvvH0lPqO5gIVQ7aWCh3cRA-NEAQYASABEgJacvD_BwE),
> [가비지 콜레션](https://engineering.huiseoul.com/,%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC-4%EA%B0%80%EC%A7%80-%ED%9D%94%ED%95%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98-%EB%8C%80%EC%B2%98%EB%B2%95-5b0d217d788d),
> non-Blocking,
> 콜백 큐(callback queue),
> single thread,
> <https://programmingsummaries.tistory.com/328>,
> <https://asfirstalways.tistory.com/43>,
> <https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%97%94%EC%A7%84-%EB%9F%B0%ED%83%80%EC%9E%84-%EC%BD%9C%EC%8A%A4%ED%83%9D-%EA%B0%9C%EA%B4%80-ea47917c8442>,

Node.js는 자바스크립트 개발자에게 브라우저 기반의 프로그래밍을 넘어서버 기반 프로그래밍을 가능하게 V8엔진으로 빌드된 런타임입니다. Nodejs의 특징으로는 다음과 같습니다.

- 비동기 I/O 처리(non-block)
- 단일 쓰레드: 기존의 서버는 동기I/O 멀티쓰레드방식이였는데, 처리량이 많아질수록 쓰레드의 수를 증가 시켜야 됐고, 메모리사용량이 많아지게 됐습니다. 하지만 nodejs는 비동기I/O 싱글쓰레드방식으로
one thread == one Call Stack == one Thing at a time
- 뛰어난 확장성(이벤트 루프?)

다음과 같은 경우에 Node.js를 사용할 경우 좋은 효율성을 발휘할 수 있습니다.
알림이나 실시간 대화같이 같이 데이터의 실시간 처리가 필요한 애플리케이션
사용자의 입력과 출력이 잦은 애플리케이션
데이터 스트리밍 애플리케이션
JSON API기반의 애플리케이션
단일 페이지 기반의 애플리케이션

>[빠리의 택시 운전사](https://geonlee.tistory.com/92 )

### 이벤트 루프란

> [참고 동영상](https://vimeo.com/96425312)
> [참고 사이트](https://meetup.toast.com/posts/89)

단일 스레드' 기반의 언어라는 말은 '자바스크립트 엔진이 단일 호출 스택을 사용한다'는 관점에서만 사실이다. 실제 자바스크립트가 구동되는 환경(브라우저, Node.js등)에서는 주로 여러 개의 스레드가 사용되며, 이러한 구동 환경이 단일 호출 스택을 사용하는 자바 스크립트 엔진과 상호 연동하기 위해 사용하는 장치가 바로 '이벤트 루프'인 것이다.

### 절차형 프로그래밍과 함수형 프로그래밍의 장단점/ 특징 비교

### 함수 hoisting이란

hoist 란 끌어올린다는 뜻입니다. 자바스크립트에서 변수나 함수의 선언의 유효범위는 hoist(끌어올려짐)되어서 코드의 맨 처음부터 시작하게 됩니다. 이경우 함수를 사용하기 전에 반드시 선언해야 한다는 규칙을 무시하게 되어 코드의 구조를 엉성하게 만들 수 있습니다. 따라서 함수선언문보다 함서표현식만을 사용할 것을 권고한다.

``` javascript
add(3,5); //8 ------- ① 호출하는 시점에 add란 함수가 선언이 안되었는데 호출한다. 정상동작을 한다.
//함수 선언문 형태로 선언
function add(x,y){
return x+y;
}
add(3,5); //8 -------​ ② 호출하는 시점에 add라는 함수가 미리 선언되어 있기 때문에 호출가능하다.
```

```javascript
add(3,5); // ReferenceError: add is not defined (크롬 개발자도구 테스트시)
//함수 표현식 형태로 선언
var add = function add(x,y){
return x+y;
}
add(3,5); //8
```

> 함수 표현식의 특징은 함수명이 옵션이고, 변수를 통해 사용되어져야 한다. 끝에 세미콜론이온다. 물론 함수선언문도 세미콜론 가능하다.

### first-class citizen(1급 객체)에 대해 설명하시오

3가지의 조건을 충족하면 first class citizen이라고 합니다.

- 변수나 데이타에 할당 할 수 있어야 합니다.
- 객체의 인자로 넘길 수 있어야 합니다.
- 객체의 리턴값으로 리턴 할수 있어야 합니다.

javascript의 function은 first-class citizen이기 때문에 함수형 프로그래밍이 가능하게 됩니다.

### this binding, call, apply에 대해서 설명하시오

### node.js 또는 비동기를 해봤다면, 동기 비동기의 차이에 대해 설명하시오. Sync에서 발생될 수 있는 문제, Async에서 발생 될 수 있는 문제

> [Sync Async](https://meetup.toast.com/posts/89)

CPU가 쉬게 만드는 작업들을 blocking이라고 한고 생각하면 된다. 대표적으로 I/O작업들이 있는데, sync는 blocking작업이 끝날때까지 기다리는 거고, async는 비동기적으로 I/O를 처리하고 callback함수를 받는다. non-block I/O가 끝나면 callback함수가 실행된다.

### arrow function

> [arrow-function](https://nesoy.github.io/articles/2019-04/Javascript-Arrow-function)

arrow function은 dynamic scope가 아닌 lexical scope의 this를 가지고 있습니다. 또한 this뿐만 아니라 arguments, super or new.target도 Binding하지 않습니다. 즉 function의 내부함수를 arrow function으로 작셩하면 this가 전역객체에 바인딩되지 않고, 자신을 감싸는 함수의 this에 바인딩 되는 것을 확인 할 수 있습니다. arrow함수가 아닌 inner 함수는 전역 객체를 this로 바인딩한다.

### async/await vs promise

### others

- 다중상속을 사용하지 않는 이유
- React hooks
- react Mobx
- typescript에 대해서 설명해 보시오
- ORM(sequelize)이란
- javascript array reducer callback 함수 구현

## Web

### HTTP protocol에 대해 설명하시오

![http](/tech-interview-questions/image/http.png)

HTTP(Hypertext Transfer Protocol)는 HTML과 문서와 같은 리소스를 주고 받을 수 있도록 해주는 프로토콜 입니다. HTTP는 application layer protocol로, 신뢰가능한 전송 프로토콜인 TCP or TLS를 통해 전송됩니다. 보통 브라우저인 클라이언트에 의해 전송되는 메시지를 request라고 부르며, 그에 대해 서버에서 응답으로 전송되는 메시지를 response라고 부릅니다.

### HTTP request의 method를 각각 설명하시오

![http-request](/tech-interview-questions/image/http-request.png)

HTTP request는 위와 같이 method, path, protocol version 그리고 필요에따라 body로 이루어져 있습니다. HTTP method의 종류로는 GET, POST, PUT, DELET 뿐 아니라 더 다양하게 있습니다. method는 보통 클라이언트가 수행하고자 하는 동작에 따라 선택하여 사용하게 됩니다.

대표적으로 GET과 POST에 대해서 설명해보면 리소스를 가져오기위해 GET을 사용하고 HTML 폼의 데이터를 전송하기 위해 POST를 사용합니다. 특히 POST를 사용할 때는 body에 데이터를 실어서 서버로 보내게 됩니다.
> body에 데이터를 실어 보내는 방법으로 formdata 와 json이 있는 것 같다.

### HTTP Header(cache-control Etag, keepalive, cros, lastmodified)에 대해 설명해 보시오. 특히 cache 장점과 주의점을 말해보

1. HTTP는 1번의 요청에 대해 1번의 응답을 하게 설계 되었습니다. 이런경우 여러 자원을 요청할 경우 여러 번 연결을 끊었다 붙였다 해야해서 비효율적입니다. keep-alive는 지정된 시간 동안 연결을 끊지 않고 연결된 상태를 유지할 수 있도록 해줍니다. keep-alive의 time out 내 클라이언트가 재 요청하면 새로운 연결이 아닌 기존 연결된 것을 이용하게 됩니다.

### RESTful API가 무엇인지 설명하시오

REST(REpresentational State Transfer)란, "웹에 존재하는 모든 자원(이미지, 동영상, DB 자원)에 고유한 URI를 부여해 활용"하는 것으로 생각할 수 있습니다. 특히 REST는 HTTP protocol의 장점을 살릴 수 있는 네트워크 기반 아키텍처입니다. REST는 크게 HTTP verbs(CRUD), URIs(resource Name), HTTP response(representation. JSON)로 구성되어 있습니다. 따라서 RESTful API는 REST 특징을 지키면서 API를 제공하는 것을 의미합니다.

```HTTP
    GET /members/1          (o)
    GET /members/show/1     (x)
  

    POST /members/2         (o)
    GET /members/insert/2   (x)

    DELETE /members/1       (o)
    GET /members/delete/1   (x)

```

### Internet browser 에 주소를 입력하고 엔터를 쳤을 때부터 화면이 뜨기까지의 과정을 5분 이상 설명하시오

- [Naver D2 - 브라우저의 작동 원리](https://d2.naver.com/helloworld/59361)
- [브라우저의 Critical path (한글)](https://m.post.naver.com/viewer/postView.nhn?volumeNo=8431285&memberNo=34176766)
- [Web fundamentals - Critical-rendering-path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=ko)

웹 어플리케이션의 동작 방식(DOM같은거? )

### 브라우저에서 생성된 데이터가 서버로 전달되는 과정을 설명해주세요

1. REST기반의 웹사이트라고 가정한다면 URI에 해당하는 서버의 위치로 <b>HTTP POST request</b> 메시지의 body영역에 data를 실어 보냅니다. 만약 데이터 전달이 아니라면 HTTP GET request 메시지를 보냅니다.
2. HTTP 메시지를 네트워크에 송출하기 위해 브라우저는 이를 <b>os(프로토콜 스택)</b>에 의뢰합니다. 이 때 DNS서버를 조회하여 ip주소를 얻어내 destination으로 설정합니다. 이후 TCP Socket을 3-Hand-Shaking과정을 통해 연결합니다. TCP연결에 성공하면 Http Request가 TCP Socket을 통해 보내집니다.
3. 서버에 데이터가 정상적으로 도착하여 요청된 작업을 수행한 후 응답을 보냅니다. POST에 대한 결과로 데이터가 생성이 됐다면 <b>HTTP response</b> status code 201 created, GET에 대한 결과로 200 OK를 브라우저에게 보내게 된다.

### MVC 디자인패턴

> MVC의 위치에 따라 서버사이드 렌더링과 클라이언트 사이드 렌더링이 구분되는듯?

Model은 애플리케이션에서 사용하는 데이터를 관리하는 영역이고, View는 유저에게 보이는 부분입니다. 프로그램이 유저에게서 어떤 Action(예: 버튼클릭, 텍스트 입력등)을 받으면  Controller는 Model 데이터를 조회하거나 수정하고, 변경된 사항을 View에 반영합니다. 이외에 MVP, MVVM 디자인 패턴등이 있습니다.

## SPA에 대해 설명하시오

> 클라이언트 사이드 렌더링인듯?

SPA는 Spingle Page Application으로 모던 웹의 패러다임입니다. 전통적인 웹 방식은 새로운 페이지 요청 시마다 정적 리소스가 다운로드 되고 필요없는 부분을 포함하여 전체 페이지를 다시 렌더링하는 방식을 사용하므로 새로고침이 되어 비효율 적입니다. 반면 SPA는 기본적으로 웹 애플리케이션에 필요한 모든 정적 리소스를 최초에 한번 다운로드 합니다. 이후 필요한 데이터만을 전달받아 페이지를 갱신하므로 서버 트래픽이 감소하고 전체 페이지를 다시 렌더링 하지않아 효율적입니다. 다만 초기구동속도가 상대적으로 느리고 SEO(검색엔진 최적화)문제를 안고있습니다.

### 서버사이드 렌더링 vs 클라이언트 사이드 렌더링

[http://asfirstalways.tistory.com/244](https://asfirstalways.tistory.com/244)

서버사이드 렌더링은 서버에 MVC가 모두 있는거고, 클라이언트 사이드 렌더링은 V가 클라이언트 사이드에 있는거인듯?

### URI  vs URL에 대해서 비교 설명 하시오

![URI](/tech-interview-questions/image/URI.png)
![URI2](/tech-interview-questions/image/URI2.png)
URI(Uniform Resource Identifier) 는 인터넷 상의 자원을 식별하는 문자열로 생각할 수 있고, URL(Uniform Resource Locator)는 인터넷 상의 자원 위치를 나타냅니다. 즉 URI는 URL을 포함하는 관계인데, URL에 자원을 식별하기 위한 parameter가 추가된게 URI로 생각할 수 있다.

### CORS

### 세션, 쿠키, 캐시

### graphql과 restAPI의 차이점

### proxy에 대해서

### redirect와 reverse proxy의 차이

### Http status code

- 1xx : 전송 프로토콜 수준의 정보 교환\
- 2xx : 클라어인트 요청이 성공적으로 수행됨
    - 200 OK : GET 요청에 대한 성공
    - 201 Created: POST 요청에 대한 성공
- 3xx : 클라이언트는 요청을 완료하기 위해 추가적인 행동을 취해야 함
    - 304 Not Modified : 요청한 자원이 변경되지 않았으므로 클라이언트에서 캐싱된 자원을 사용하도록 권고
- 4xx : 클라이언트의 잘못된 요청
    - 404 Not Founded : 클라이언트가 요청한 리소스가 서버에 없음
- 5xx : 서버쪽 오류로 인한 상태코드

### Form-data vs JSON 차이

Authentication vs Authorization 차이점
암호화는 어떻게 했는지. 왜 그렇게 했는지
JWT에 대해서 설명해 보시오
tdd,, testcode 작성, mocha
aws EC2에 대해서 설명하시오
nginx에 대해서 설명하시오
IaaS, SaaS, PaaS
heroku vs AWS
microservice
브라우저의 동작원리
크로스 브라우징

### [fetch vs axios](https://hoorooroob.tistory.com/entry/React-React-Naive-TIPS-axios-%EC%99%80-fetch-%EC%96%B4%EB%96%A4-%EA%B2%83%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C)

## Operating System

### process vs thread

process는 실행중인 프로그램을 의미. thread는 프로세스의 실행 단위
차이점:
(1) 할당해주는 영역이 다르다. 프로세스는 text,data,stack,heap영역할당, PCB 등등. thread는 PCregister랑 독립적인stack영역.
(2) 프로세스간에 데이터 공유를 하려고 했을 때 thread에 비하여 공유해야되는데 소모되는 자원이 비싸다 thread는 heap영역으로 데이터를 공유하기 쉽다. 프로세스는 자원공유가 IPC 통신으로 가능하다 => 비싸다.

### process /thread를 메모리 관점에서의 설명

> 첫번째 질문이랑 합칠 수 있다면 합치자
할당해주는 영역이 다르다. 프로세스는 text,data,stack,heap영역할당, PCB 등등. thread는 PCregister랑 독립적인stack영역.

### Thread 사용시 장단점

> 첫번째 질문이랑 합칠 수 있다면 합치자</br>
> Thread 사용시 유의점

process간 데이터 공유보다 자원을 적게써서 공유가 쉽다. 통신방법이 간단하다. context switcing이 process context switching보다 빠르다 => cache메모리를 비울 필요가 없어서.
병렬 처리해서 빠르다.
단점은 thread하나가 죽으면 전체 thread가 죽을 수 있다.

### Semaphore vs mutex

semaphore : multiprocess   공유된 데이터를 여러 프로세스가 접근하는 것을 막는 것
mutex : 공유된 자원의 데이터를 여러 쓰레드가 접근하는 것을 막는것

### Synchronous and Asynchronous Calls ( blocking non-blocking)

### process간에 데이터를 주고 받을 수 있는 방법

IPC 통신으로 가능하다.

### 멀티 쓰레드 프로그래밍 특징

### Thread끼리 같은 메모리 공간 참여는 어떻게 하는가

heap영역을 통해서 공유. critical section공유중인 데이터 영역을 접근하는 코드!?

### multi Thread 활용 경험 유무, Thread 동기화 어떻게 처리 했는지

### page fault

### deadlock 예방하는 방법 & deadlock 해결 방법

### Thread pool 사용하는 이유

### process 시그널 동작원리

>interrupt같은거다.

### ThreadSafe하다는게 어떤 의미인지. ThreadSafe하게 만들려면 어떻게 해야 하는지

### Others

- Thread 동시성 이슈 해결 방법
- 쓰레드가 계속 늘어났을 때 발생할 수 있는 문제점
- ThreadSafe와 Reentreant의 차이점
- 병렬프로그래밍?
- 스핀락에 대해 설명하고, 다른 Lock과의 차이점에 대해 설명하시오
- OS가 프로그램을 수행하는 과정에 대해 설명하시오
- 프로세스 메모리 영역(text, data,stack,heap), 스택영역에 들어가는 부분, 스택영역 or 힙 영역을 넘어가면?
- memory allocation이 뭔지.
- 32Bit OS에서 Heap 사이즈가 얼마일거라 생각하는지? 그이유는?
- select, poll, epoll, iocp, kqueue에 대해서 아는 대로 설명하시오
- cache coherence
- interrupt란?

## Algorithm & Data structure

### 정렬 알고리즘 중 가장 빠른 방식은

> 상황에 따라 selection인가 가 제일 빠를 수 있다.

### quick sort와 merge sort의 complexity를 포함하여 비교 설명하시오

### binary search 알고리즘을 직접 구현하여 설명해 보시오(검색시 속도, bigO, 최악의 경우는 어떤 상황인지? - 선형으로 한쪽으로 쏠려있을때, 해결방법은? - AVL트리. Depth 깊이를 최소화)

### Array와 LinkedList 각각 같은숫자들이 정렬되어 들어가 있을 때, 각각에서 특정 값을 찾는 가장 빠른 방법은 무엇일까? 시간복잡도를 같이 이야기 해달라

Array => binary search가능 => O(lonN)
LinkedList => Linear search (랜덤 액세스가 안되서 binary search 불가)=> O(N)

### priority queue에 대해 설명하시오

### hash에 대해 설명하고 conflict발생시 해결 방법에 대해 설명하시오

### hashMap의 일반적와 최악의 경우와의 검색 시간 복잡도는

일반적 O(1)
최악 O(n) hash conflict

### hashtable과 hashmap의 차이점

### binary tree는 최악의 경우 O(n)의 검색시간이 걸리는데, 어떠한 경우인가? 이를 해결하기 위해 어떻게 해야 하는가

원소가 한쪽으로 치우친 경우(편향된 경우) => balanced tree 사용(AVL, Red-Black)

### arrayList vs linkedList

> 데이터 삽입이 많은 경우~~~

### stack vs queue 차이점, 각각의 사용 예

### others

- Prirm, 크루스칼, 벨만포드, 다익스트라 알고리즘
- Huffman알고리즘에 대해 가능한 쉽게 설명해 달라
- binary search tree와 trie 알고리즘에 대해 가능한 쉽게 비교 설명

## DB

database의 normalization(정규화)에 대해서 설명하세요
RDB와 no-sql의 차이점, 대표적인 no-sql과 그 특징,용도!(mongodb 와 mysql의 차이점 )
nosql의 특징
Database Master/Slave구조는 왜 쓰이게 됐을까? 그리고 그 구조의 한계 혹은 단점은?
ORM이란?
SQL DDL, DML, DCL의 차이에 대해서 설명하세요
데이터 베이스를 구축하려고 할 때, FileDB와 RDBMS로 구축할 때의 각각의 장단점
Transaction과 Lock?
트랜잭션은 데이터베이스의 상태를 변환시키는 기능을 수행하기 위한 작업의 단위 또는 한꺼번에 모두 수행되어야 할 일련의 연산들을 의미합니다. 트랜잭션의 특성으로는 Atomciity, consistency, isolation, durability, 줄여서 ACID라고 합니다. Transaction작업이 시작되면 해당 데이터에 lock이 걸리게 되고 다른 Transaction은 해당 데이터에 접근을 하지 못하는 상태가 됩니다. Transaction 작업이 성공적으로 끝나면 commit이 되고 실패하면 Rollback 됩니다.
Foreign key vs Primary Key
Lock이란?
table relationship에 어떤 것들이 있는가. N:N관계의 문제점과 이를 해결하는 방법은?
Database Table sharding은 왜 필요한지 설명해 주세요. 또한 sharding 전략이 뭐뭐가 있는지 설명해 주세요
db index가 필요한 이유 . index 추가시 염두해 두어야 할 점들 (정의, 장점, 주의점)
db index는 RDBMS에서 검색 속도를 높이기 위해 사용하는 하나의 기술이다. 해당 TABLE의 컬럼을 색인화(따로 파일로 저장)하여 검색시 해당 TABLE의 레코드를 full scan하는게 아니라 색인화 되어있는 INDEX 파일을 검색하여 검색속도를 빠르게 한다.
DBMS 의 인덱스는 항상 정렬된 상태를 유지하기 때문에 원하는 값을 탐색하는데는 빠르지만 새로운 값을 추가하거나 삭제, 수정하는 경우에는 쿼리문 실행 속도가 느려진다. 결론적으로 DBMS 에서 인덱스는 데이터의 저장 성능을 희생하고 그 대신 데이터의 읽기 속도를 높이는 기능이다. SELECT 쿼리 문장의 WHERE 조건절에 사용되는 칼럼이라고 전부 인덱스로 생성하면 데이터 저장 성능이 떨어지고 인덱스의 크기가 비대해져서 오히려 역효과만 불러올 수 있다.

db index의 구조 (어떤 데이터 구조를 활용하여 인덱스를 만들어 두면 데이터를 처리 할때 빠르게 작업할 수 있을까?)
TREE구조로 색인화 한다. RDBMS에서 사용하는 INDEX는 Balance Search Tree 를 사용한다. 실제로는 RDBMS에서 사용되는 B-Tree는 B-Tree에서 파생된 B+Tree를 사용한다고 한다.

B: binary, balance
Root block : branch block에 대한 정보
 l
 Branch block : leaf blcok에 대한 정보
    l
Leaf block : 실제 데이터들의 주소

참고: <https://lalwr.blogspot.com/2016/02/db-index.html>

## Security

### cors vs csrf vs xss

### SQL injection  & XSS

XSS와 SQL Injection모두 웹 해킹 공격 기법입니다.
XSS(Cross site scripting )는 웹페이지에 악의적인 HTML 태그나 스크립트를 삽입하는 공격입니다. 다른사람의 정보(쿠키, 세션)을 추출할 목적으로 사용하는 공격기법입니다. XSS를 방어하는 기법으로 script 문자 필터링이 있습니다.
SQL Injection은 예상치 못한 SQL이 실행되게 함으로써 데이터베이스를 조작하는 공격입니다. 웹어플리케이션의 백엔드에 있는 데이터 베이스에 쿼리를 보내는 과정에서 일반적인 값 외에 악의적인 SQL 쿼리문을 삽입하여 공격하는 기법입니다. SQL injection을 방어하는 기법으로 데이터베이스 저장 프로시저 사용(저장프로시저는 사용하고자 하는 query에 미리 형식을 지정하는 것을 말합니다. 지정된 형식의 데이터가 아니면 Query가 실행되지 않기 때문에 보안성을 크게 향상 시킵니다.)

### 대칭키, 비대칭키의 암호화는 어떻게 다른가. 대표적인 알고리즘은 각각 무엇이 있는가

### Others

- DES, AES, RSA에 대해서 아는대로 설명하시오
- Symmetric encryption vs Asymmetric encryption vs Cryptographic hash 비교 설명
- Diffie-Hellman key exchange

## C++

### Others

- virtual 함수(가상함수)는 무엇이고 소멸자에 왜 virtual 함수를 쓰는지
- static cast와 dynamic cast에 대해서 설명해 주세요

## git

### Others

- git rebase 랑 merge 차이

- gitflow 란

## ETC

### singleton과 Factory pattern에 대해서 설명

### Unicode vs UTF-8 vs  UTF16에 대해 설명

유니코드는 국제표준 문자표이고 UTF-8,  UTF-16은 인코딩 방식이다.
유니코드(Unicode) : 국제적으로 전세계 언어를 모두 표시할 수 있는 표준코드
인코딩: 인코딩이란 문자를 컴퓨터에 저장하거나 통신으로 전송할 목적으로 부호화 하는 방법을 말한다. 즉 어떻게 저장할 것인가에 대한 방법.
UTF-8(Unicode Transformation Format):  UFT-8은  8비트 1바이트를 기준으로 인코딩
UTF-16:  UFT-16은  16비트 2바이트를 기준으로 인코딩

### Others

- call by value 와 call by reference
- HDD 물리적 동작 방식과 SSD 동작방식을 비교하여 설명해 주세요
- fixed point vs floating point
- lossy , lossless compression 정의. 대표적인 포멧들
