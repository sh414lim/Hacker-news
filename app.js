const container=document.getElementById('root')

const ajax = new XMLHttpRequest();
const content=document.createElement('div')
const NEWS_URL ='https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL='https://api.hnpwa.com/v0/item/@id.json';

function getDate(url){ // ajax 함수
    ajax.open('GET' ,url,false) //동기적 처리
    ajax.send();//데이터 가져오기;
    return JSON.parse(ajax.response);//json 을 객체로

}


const newsFeed=getDate(NEWS_URL); 
const ul =document.createElement('ul');

window.addEventListener('hashchange',function(){
        //loaction 브라우저가 제공해주는 객체 ->주소와 관련된 다양한 정보를 알 수 있다
   const id = location.hash.substr(1);//#제거

    const newsCotent=getDate(CONTENT_URL.replace('@id',id));
    const title = document.createElement('h1');

    container.innerHTML=`
        <h1> ${newsCotent.title} <h1/>
            <div>
                <a href ="#">목록으로<a/>
            <div/>
    `;


})
    const newsList = [];

    newsList.push('<ul>');

for(let i =0; i <10; i++){
    newsList.push (`
    <li>
        <a href = '#${newsFeed[i].id}'>
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>`)
    
}

newsList.push('<ul/>')
//html 하단에 자식 노드로 추가
container.innerHTML = newsList.join(''); //배열에 있는 문자열을 하나로 만든다 (join)


