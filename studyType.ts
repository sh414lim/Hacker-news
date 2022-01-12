//타입 별칭(타입 알리아스) --- 컴파일 타임의 타입만 검사하는 용도
//보통 대문자로 시작하는 컨밴션 사용
// export type YesOrNo = String
export type YesOrNo = "Y" | "N"; //값 자체'를 부여 -> 문자열 Y가 들어가거나 n만 들어갈 수잇는 타임

//타입 스크립트 Enum 타입
//실제 테이터 런타임에 이런값이 실제로 들어간다 실제 지정된 인덱스,
//실
export enum DayOfTheWeek {
  "가",
  "나",
  "다",
  "리",
  "미",
  "비",
}

//number 라는 타입 자체에 의미를 부여 하고 싶을떄.
let x: number = 10;

export type Name = string;
export type Email = string;
export type FooFunction = () => string;
// 함수
//인자 없이 반환 값이 string 인 함수

const yesorNo: YesOrNo = "Y";

//cp.2 인터페이스

//객체의 타입 정의
// 각각의 속성들을 기술 -> 그 속성의 이름과 타입을 명시
// 타입 알리아스와 인터페이스를 혼용해서 사용할 수 있다.
//객체의 모양 자체를 정의
export interface IUser {
  readonly id: number;
  readonly name: Name; //타입 알리아스에 만든 Name 라는 타입
  email: string;
  receiveInfo: boolean;
  active: YesOrNo;
}

export interface IUser {
  address?: string;
}

export type Tuser = {
  readonly id: number;
  readonly name: string;
  email: Email;
  receiveInfo: boolean;
  active: YesOrNo;
};

export type Tuser = {
  address?: string;
};
