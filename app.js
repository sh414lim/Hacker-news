const container=document.getElementById('root')

const ajax = new XMLHttpRequest();
const content=document.createElement('div')
const NEWS_URL ='https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL='https://api.hnpwa.com/v0/item/@id.json';


ajax.open('GET' ,NEWS_URL,false) //동기적 처리
ajax.send();//데이터 가져오기;

const newsFeed=JSON.parse(ajax.response); //json 을 객체로
const ul =document.createElement('ul');

window.addEventListener('hashchange',function(){
        //loaction 브라우저가 제공해주는 객체 ->주소와 관련된 다양한 정보를 알 수 있다
   const id = location.hash.substr(1);//#제거

    ajax.open('GET',CONTENT_URL.replace('@id',id),false);
    ajax.send();
    
    const newsCotent=JSON.parse(ajax.response);
    const title = document.createElement('h1');

    title.innerHTML=newsCotent.title;

    content.appendChild(title);
    console.log(newsCotent)

})

for(let i =0; i <10; i++){
    const div = document.createElement('div')
    const li =document.createElement('li');
    const a=document.createElement('a');

    div.innerHTML = `
    <li>
        <a href = '#'>${newsFeed[i].id}
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>`

    
    li.appendChild(a);
    ul.appendChild(div.firstElementChild);
}

//html 하단에 자식 노드로 추가
container.appendChild(ul);
container.appendChild(content);


