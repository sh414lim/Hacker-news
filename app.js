const ajax = new XMLHttpRequest();

ajax.open('GET' ,'https://api.hnpwa.com/v0/news/1.json',false) //동기적 처리
ajax.send();//데이터 가져오기;

const newsFeed=JSON.parse(ajax.response); //json 을 객체로
const ul =document.createElement('ul');

for(let i =0; i <10; i++){
    const li =document.createElement('li');

    li.innerHTML=newsFeed[i].title
    ul.appendChild(li);
}
document.getElementById('root').appendChild(ul);

