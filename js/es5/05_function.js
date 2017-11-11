// 생성자 함수에서의 this의 의미
function person() {
    this.someValue = 2;
    var someValue2 = 3;
}

console.log(person()); //실행결과는? 그 이유는?

console.log(new person()); // 생성자 함수로 생성시 실행결과는?
// 내부적으로 this가 만들어 지고 this가 리턴문이 없더라도 리턴된다.

console.log(someValue); // 실행결과와, 이유를 말하시오
