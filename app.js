const container=document.getElementById('root')

const ajax = new XMLHttpRequest();
const content=document.createElement('div')
const NEWS_URL ='https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL='https://api.hnpwa.com/v0/item/@id.json';
const store={
    currentPage:1,
}


function getDate(url){ // ajax 함수
    ajax.open('GET' ,url,false) //동기적 처리
    ajax.send();//데이터 가져오기;
    return JSON.parse(ajax.response);//json 을 객체로

}


function newsFead(){ //글 목록 함수
    const newsFeed=getDate(NEWS_URL); 
    const newsList = [];
    let template = `
        <div>
        <h1> Hacker News</h1>
        <ul>
        <li>
        </li>
        </ul>
        <div>
        <a href = "#">다음 페이지</a>
        <a href = "#">이전 페이지</a>
        </div>
        </div>
    `

    newsList.push('<ul>');

    for(let i =(store.currentPage - 1) * 10; i < store.currentPage * 10; i++){
    newsList.push (`
    <li>
        <a href = '#/show/${newsFeed[i].id}'>
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>`
    );
}
newsList.push('<ul/>');
newsList.push(`
<div>
 <a href = #/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}>이전 페이지 </a>
 <a href = #/page/${store.currentPage + 1}>다음 페이지 </a>
</div>
`)
//html 하단에 자식 노드로 추가
container.innerHTML = newsList.join(''); //배열에 있는 문자열을 하나로 만든다 (join)
}




function newsDetail(){
    //loaction 브라우저가 제공해주는 객체 ->주소와 관련된 다양한 정보를 알 수 있다
const id = location.hash.substr(7);//#제거
const newsCotent=getDate(CONTENT_URL.replace('@id',id))

container.innerHTML=`
    <h1> ${newsCotent.title} </h1>
        <div>
            <a href ="#/page/${store.currentPage}">목록으로</a>
        </div>
`;
}
function router(){
    const routePath = location.hash;
    if(routePath === ''){
        newsFead();
    }else if(routePath.indexOf('#/page/' >= 0)){
        store.currentPage =Number(routePath.substr(7));
        newsFead();
    }else{
        newsDetail();

    }
}

window.addEventListener('hashchange',router)

router();