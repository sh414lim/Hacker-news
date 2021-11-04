### 배열 메서드
#### push -> 배열이 가지고잇는 요소 맨마지막에 추가
#### pop -> 배열의 가장 마지막에 있는 데이터를 꺼내온다
#### slice - > 꺼내올 데이터의 위치를지정한다 const onebooks = books.1,2 ->slice 는 불가변성을 가지고잇다 원래잇는 배열을 수정하지 않는다(복사)
#### splice -> 꺼내온 자리에 새로운 데이터를 추가
#### books.splice(1,2,'햄릿')

#### shift 맨앞에 데이터를 가져온다(변화)
#### unshift 맨앞에 추가 오른쪽으로 민다
#### join -> 배열 안에 잇는 문자열을 하나의 문자열로 합친다 -> books.join('')

#### books.splite(',') -> 다시 배열로 만든다

#### merge(concat) => onebooks.concat(twobooks) -> 두개의 배열을 합친다 먼저 배열뒤로 합친다

#### 전개연산자
##### const books = [...ondebooks,...twobooks];



