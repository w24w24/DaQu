/*
 * @Author: 谭磊 2928331677@qq.com
 * @Date: 2023-05-05 14:14:14
 * @LastEditors: 谭磊 2928331677@qq.com
 * @LastEditTime: 2023-05-09 15:31:59
 * @FilePath: \code\admin\views\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入公共的模块
import { load } from '/web/util/LoadViews.js' 
load("topbar-news") // 加载 top-bar

// 全局 list
let list = []

// 监听 search 改变事件
search.oninput = async function() {
  if(!search.value) {
    document.querySelector(".list-group").style.display = "none"
    return
  }
  document.querySelector(".list-group").style.display = "block"
    // console.log(search.value);
    let res = await fetch("http://localhost:3000/news?title_like=" +search.value).then(res=>res.json())
    document.querySelector(".list-group").innerHTML = res.map(item=>`
      <li class="list-group-item"><a href="/web/views/detail/index.html?id=${ item.id }">${ item.title }</a></li>
    `).join("")
}
// 输入框失去焦点的时候，隐藏 信息提示 
search.onblur = function() {
  // 点击提示信息时，也意味着失去焦点，所以需要解决
  // 设置延时器,时间为 300 ms,因为 300 ms 是用户视觉的零界点
  setTimeout(()=>{
    document.querySelector(".list-group").style.display = "none"
  },300)
}

// 渲染页面
async function render() {
  await renderList()
  renderTab()
}

// renderList() 方法
async function renderList() {
  list = await fetch("http://localhost:3000/news").then(res=>res.json())
  // 采用倒叙的方式,显示最新的新闻
  list.reverse()
  // console.log(list.slice(0,4));
  let cardContainer = document.querySelector('.cardContainer')
  // 填充入数据
  cardContainer.innerHTML = list.slice(0,4).map(item=>`
    <div class="card" style="width: 18rem;" data-id="${ item.id }">
      <div style="background-image:url(${ item.cover });" class="imgcover"></div>
      <div class="card-body">
        <h5 class="card-title" style="font-size: 16px;">${ item.title }</h5>
        <p class="card-text" style="font-size: 10px;color: grey">作者:${ item.author }</p>
      </div>
    </div>
  `).join("")

  // 跳转到相应的新闻详情页中
  for(let item of document.querySelectorAll(".card")) {
    // console.log(item.dataset.id);
    item.onclick = function() {
      location.href = `/web/views/detail/index.html?id=${ item.dataset.id }`
    }
  }
}

// renderTab() 方法: 对 list 进行分组
function renderTab() {
  let categoryObj = _.groupBy(list,item=>item.category)
  // console.log(categoryObj);
  let tabs = [tab0,tab1,tab2]
  // 使用 forEach 循环归类新闻类别
  tabs.forEach((item,index)=>{
    item.innerHTML = categoryObj[index]?.map(item=> 
      `<div class="listitem" data-id="${ item.id }">
        <img src="${ item.cover }" data-id="${ item.id }" />
        <div class="content-title" data-id="${ item.id }">${ item.title }</div>
        <p class="card-text" style="font-size: 10px;color: grey" data-id="${ item.id }">作者:${ item.author }</p>
      </div>`
      ).join("") || ""
      // 绑定点击事件,跳转到相应的 新闻详情页面
      item.onclick = function(evt) {
        // console.log("111",evt.target.dataset.id);
        location.href = `/web/views/detail/index.html?id=${ evt.target.dataset.id }`
      }
  })
}

// render()
render()
