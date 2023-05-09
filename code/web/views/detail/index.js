/*
 * @Author: 谭磊 2928331677@qq.com
 * @Date: 2023-05-09 15:38:47
 * @LastEditors: 谭磊 2928331677@qq.com
 * @LastEditTime: 2023-05-09 16:35:42
 * @FilePath: \code\web\views\detail\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入公共的模块
import { load } from '/web/util/LoadViews.js' 
load("") // 加载 top-bar

async function render(){
  let id = new URL(location.href).searchParams.get("id")
  // console.log(id)
  let {title,content} = await fetch(`http://localhost:3000/news/${id}`).then(res=>res.json())
  // console.log(res)

  document.querySelector(".title").innerHTML = title
  document.querySelector(".newscontent").innerHTML = content
}

render()