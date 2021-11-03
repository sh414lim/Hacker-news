const ajax = XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const COUNT_URL = 'https://api.hnpwa.com/v0/item/@id.json'


ajax.open('GET',NEWS_URL,false);
ajax.send();

ajax.open('GET',COUNT_URL,false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul');


for(let i = 0; i<10 ; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href= '#'
    a.innerHTML =`${ newsFeed[i].title }  ${newsFeed[i].coments_count}`;

    li.appendChild(a);
    ul.appendChild(li)

}



container.appendChild(ul)
