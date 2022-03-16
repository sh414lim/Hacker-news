import * as allTypes from "./studyType";

const foo: allTypes.FooFunction = function () {
  return "아무 쓸모없는 함수";
};

const iUser: allTypes.IUser = {
  id: 1,
  name: "빌게이츠",
};

//객체 유형 사용법 -
const IStyle: allTypes.TOnlyNumberValueObject = {
  borderWidth: 5,
  width: 300,
  height: 100,
};

const tStyle: allTypes.TOnlyBooleanValueObject = {
  border: true,
  visible: false,
  display: true,
};

//함수 유형 사용법 - 함수 인터페이스,알리아스를 사용할떄는 함수 표현식을 사용해야한다
const getApi: allTypes.IGetApi = (url, search = "") => {
  return new Promise((resolve) => resolve("OK"));
};

getApi("/api/user").then((data) => console.log(data));

//private 로 사용하고 싶으면 인터페이스에서 제거 해야한다
 class Rect implements allTypes.IRext{
  // private id: number;
  id:number;
  x: number;
  y: number;
  width: number;
  height: number;
  constructor((x: number, y: number, width: number, height: number) {
    this.id = Math.random() * 100;
    this.x=x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
 }

 function createDefault(cstor:allTypes.IRext)=()=>{
   return new CacheStorage(0,0,0,0);
 }

 //클래스 자체가 설계도 이므로 생성자 인터페이스가 필요없다
 const rect1 = new Rect(0,0,0,100);

 //함수를 만든다면 클래스의 생성자를 호출할때 스펙 필요
 const rect2 = new createDefault(Rect)

//타일 알리아스와 인터페이스의 쓰임 차이
//원칙
// 구체적 차이점
// 문법적 사항말고 인터페이스 없는 내용이 알리아스에는 있다
// - > 구체적인 타입 명시 
// *데이터를 표현할때는 타입 알리아스 사용 -데이터 묘사
// * 메소드와 같은 구체적 행위까지 포함된 객체를 디자일 할때 인터페이스 -데이터 포괄 객체
//클래스-인터페이스;123


