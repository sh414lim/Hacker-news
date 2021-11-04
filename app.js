const container=document.getElementById('root')

const ajax = new XMLHttpRequest();
const content=document.createElement('div')
const NEWS_URL ='https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL='https://api.hnpwa.com/v0/item/@id.json';
const store={
    currentPage:1,
    feeds:[],
}


function getDate(url){ // ajax 함수
    ajax.open('GET' ,url,false) //동기적 처리
    ajax.send();//데이터 가져오기;
    return JSON.parse(ajax.response);//json 을 객체로

}

function makeFeeds(feeds){
    for(let i = 0; i<feeds.length; i++){
        feeds[i].read =false;
    }
    return feeds;
}

function newsFeed(){ //글 목록 함수
    let newsFeed=store.feeds; 
    const newsList = [];
    let template = 
 `       <div class = "bg-gray-600 min-h-screen">
            <div class ="bg-white text-xl">
                <div class="mx-auto px-4">
                    <div class ="flex justufy-start">
                        <h1 class ="font-extrabold">hacker news</h1>
                    </div>
                    <div class ="items-center hustify-end">
                        <a href="#/page/{{__prev_page__}}" class = " text-gray-500">
                            Previous
                        </a>
                        <a href = "#/page/{{__next_page__}}" class ="text-gray-500 ml-4">
                            Next
                        </a>
                    </div>
                </div>
            </div>
            <div class="p-4 text-2xl text-gray-700">
                {{__news_feed__}}
            </div>

        </div>`
      
    ;
if(newsFeed.length === 0){
    newsFeed = store.feeds = makeFeeds(getDate(NEWS_URL));
}

    for(let i =(store.currentPage - 1) * 10; i < store.currentPage * 10; i++){
    newsList.push (`
    <li>
        <a href = "#/show/${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>
    `
    );
}

template = template.replace('{{__news_feed__}}',newsList.join('')); //마킹 된부분 교체
template = template.replace('{{__prev_page__}}',store.currentPage > 1 ? store.currentPage -1 : 1); //마킹 된부분 교
template = template.replace('{{__next_page__}}',store.currentPage + 1); //마킹 된부분 교
//html 하단에 자식 노드로 추가
container.innerHTML = template; //배열에 있는 문자열을 하나로 만든다 (join)
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
        newsFeed();
    }else if(routePath.indexOf('#/page/' >= 0)){
        store.currentPage =Number(routePath.substr(7));
        newsFeed();
    }else{
        newsDetail();

    }
}

window.addEventListener('hashchange',router)

router();