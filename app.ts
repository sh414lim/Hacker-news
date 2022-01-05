//타입인터페이스
interface Store  {
  currentPage: number;
  feeds: NewsFeed[]; //NeWsFeed 배열안에 들어가는 배열 유형
};

//인터섹션 -공통 값 모으기
interface News  {
  readonly id: number; // 못 바꾸는 값
  time_ago: string;
  url: string;
  user: string;
  content:string;
  title:string;
}
//인터섹션 합쳐짐
interface NewsFeed extends  News  {
  comments_count: number;
  read: boolean;
  points: number;
};

interface NewsDetail extends News {
  comments_count: number;
  time_ago: string;
  comments:[];
}
interface NewsComment  extends News {
  comments:[];
  level:number;
}

///목적을 위한 형식 - 복잡도 유지 단순함을 유지 하는 장점이 생김 
//코드 베이스가 작을때는 나빠지는 거같지만  코드가 점점 커지고 코드의 장점
class Api{
  url:string;
  ajax:XMLHttpRequest;

  constructor(url:string){
    //초기화
    this.url =url  //클래스에 인스턴스 객체 접근 - this
    this.ajax =ajax  //클래스에 인스턴스 객체 접근 - this
  }

    // 공통 요소 API 꺼내오기   protected : 클래스의 속성과 메서드를 외부로 제공 x 지시어
    protected getRequest<AjaxRespons>():AjaxRespons{
      this.ajax.open("GET", this.url, false); //동기적 처리
      this.ajax.send(); //데이터 가져오기;
      return JSON.parse(this.ajax.response); //json 을 객체로
    }
}

class NewsFeedApi extends Api {
  getDate():NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}
}

class NewsDetailApi extends Api {
  getDate():NewsDetail{
    return this.getRequest<NewsDetail>();
  }
}


const container: HTMLElement | null = document.getElementById("root");
const ajax: XMLHttpRequest = new XMLHttpRequest();

const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store: Store = {
  currentPage: 1,
  feeds: [],
};
//유니온 둘중 하나 일시 
//재네릭 - 호출 하는 쪽에서 유형을 명시 - 받는 부분에서 유형을 받아서 그대로 getDate 에서 반환유형 사용
// function getDate<AjaxRespons>(url:string):AjaxRespons {
//   // ajax 함수
//   ajax.open("GET", url, false); //동기적 처리
//   ajax.send(); //데이터 가져오기;
//   return JSON.parse(ajax.response); //json 을 객체로
// }

function makeFeeds(feeds:NewsFeed[]):NewsFeed[] {
  // 타입 추론-> 타입스크립트가 코드의 상황을보고 숫자를 넣고있으니 숫자이겟지 추론
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].read = false;
  }
  return feeds;
}

function updateView(html:string):void {
  if (container != null) {
    container.innerHTML = template; //배열에 있는 문자열을 하나로 만든다 (join)
  } else {
    console.error("최상위 컨테이너 가 없습니다");
  }
}



function makeComment(comments:NewsComment[]):string {
  //외부 인자를 받는 코멘트
  const commentString = [];
  for (let i = 0; i < comments.length; i++) {
  const comment:NewsComment = comments[i];
    commentString.push(`
  <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
        <div class="text-gray-400">
          <i class="fa fa-sort-up mr-2"></i>
          <strong>${comment.user}</strong> ${comment.time_ago}
        </div>
        <p class="text-gray-700">${comment.content}</p>
      </div>    
  `);
    if ((comment.comments, length > 0)) {
      commentString.push(makeComment(comment.comments)); //재귀호출
    }
  }
  return commentString.join("");
}

function newsFeed():void {
  //class 는 인스턴스 생성해야함
  const api = new NewsFeedApi(NEWS_URL); //생성자로 넘어감
  //글 목록 함수
  let newsFeed: NewsFeed[] = store.feeds;
  const newsList = [];
  let template = `       <div class = "bg-gray-600 min-h-screen">
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

        </div>`;

  // if (newsFeed.length === 0) {
  //   newsFeed = store.feeds = makeFeeds(getDate<NewsFeed[]>(NEWS_URL));
  // }
  if (newsFeed.length === 0) {
    // newsFeed = store.feeds = makeFeeds(Api.getDate<NewsFeed[]>(NEWS_URL));
    newsFeed = store.feeds = makeFeeds(api.getDate());
  }

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
        <div class="p-6 bg-white mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
          <div class="flex">
            <div class="flex-auto">
              <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>  
            </div>
            <div class="text-center text-sm">
              <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeed[i].comments_count}</div>
            </div>
          </div>
          <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
              <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
              <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
              <div><i class="far fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
            </div>  
          </div>
        </div>    
      `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join("")); //마킹 된부분 교체
  template = template.replace(
    "{{__prev_page__}}",
   String( store.currentPage > 1 ? store.currentPage - 1 : 1) //숫자유형을 문자 유형으로
  ); //마킹 된부분 교
  template = template.replace("{{__next_page__}}", String(store.currentPage + 1)); //마킹 된부분 교
  //html 하단에 자식 노드로 추가

  updateView(template);
}

function newsDetail():void {
  //loaction 브라우저가 제공해주는 객체 ->주소와 관련된 다양한 정보를 알 수 있다
  const id = location.hash.substr(7); //#제거
  const api =new NewsDetailApi(CONTENT_URL.replace("@id", id);
  const newsContent = api.getDate();

  let template = `
<div class="bg-gray-600 min-h-screen pb-8">
<div class="bg-white text-xl">
  <div class="mx-auto px-4">
    <div class="flex justify-between items-center py-6">
      <div class="flex justify-start">
        <h1 class="font-extrabold">Hacker News</h1>
      </div>
      <div class="items-center justify-end">
        <a href="#/page/${store.currentPage}" class="text-gray-500">
          <i class="fa fa-times"></i>
        </a>
      </div>
    </div>
  </div>
</div>

<div class="h-full border rounded-xl bg-white m-6 p-4 ">
  <h2>${newsContent.title}</h2>
  <div class="text-gray-400 h-20">
    ${newsContent.content}
  </div>

  {{__comments__}}

</div>
</div>
`;



  updateView(template.replace(
    "{{__comments__}}",
    makeComment(newsContent.comments));
  if (container) {
    //축약형
    container.innerHTML =
    );
  } else {
    console.error("error");
  }
}

function router():void {
  const routePath = location.hash;
  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);

router();
