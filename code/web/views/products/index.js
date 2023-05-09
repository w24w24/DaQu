/*
 * @Author: 谭磊 2928331677@qq.com
 * @Date: 2023-05-05 14:14:14
 * @LastEditors: 谭磊 2928331677@qq.com
 * @LastEditTime: 2023-05-08 20:19:08
 * @FilePath: \code\admin\views\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入公共的模块
import { load } from '/web/util/LoadViews.js' 
load("topbar-products") // 加载 top-bar

// 已进入页面就渲染界面
 async function render() {
  // 等待从 json-server 数据库中获取数据
  let list = await fetch('http://localhost:3000/products').then(res=>res.json())
  console.log(list);
  
  // 动态创建 指示器
  let indicorHTML = document.querySelector(".carousel-indicators")
  indicorHTML.innerHTML = list.map((item,index) => `
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${ index }" class="active" aria-current="true" aria-label="${ item.title }"></button>
  ` ).join("")
  // 动态创建 轮播图 slide
  // let innerCarouselHTML = document.querySelector(".carousel-inner")
  // innerCarouselHTML.innerHTML = list.map((item,index) => `
  //   <div class="carousel-item ${index===0?"active":""}">
  //     <div style="background-image: url(${item.cover});width: 100%;height:calc(100vh - 50px);background-size: cover;"></div>
  //     <div class="carousel-caption d-none d-md-block">
  //     <h5>${item.title}</h5>
  //     <p>${item.introduction}</p>
  //     </div>
  //   </div>
  // `).join("")
}
// 调用渲染方法 render
render()

