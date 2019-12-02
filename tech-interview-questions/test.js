let c = 500;
function parent() {
    let a = 100;
    let b = 200;

    function child() {
        let b = 300;
        console.log(a, b, c);
    }
    child();    // 100, 300 => 외부함수의 변수에 접근하였다.
    console.log(a, b, c);  // 100, 200, 500 => 스코프 체이닝 때문에 외부에서 선언된 변수나 함수에 접근이 가능하다.
};
parent();
