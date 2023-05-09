/*
 * @Author: 谭磊 2928331677@qq.com
 * @Date: 2023-05-05 14:14:14
 * @LastEditors: 谭磊 2928331677@qq.com
 * @LastEditTime: 2023-05-07 22:30:43
 * @FilePath: \code\admin\views\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入公共的模块
import {load,isLogin} from '/admin/util/LoadViews.js' 
load("sidemenu-newsList")

// 预览 模态框
let myPreviewModal = new bootstrap.Modal(document.getElementById('previewModal'))
// 删除 模态框
let myDelModal = new bootstrap.Modal(document.getElementById('delModal'))
// 加载已经创建好的 新闻数据
let list = []
// 存储 删除 按钮
let updateId = 0
// 新闻分类
let categoryList = ["最新动态","典型案例","通知公告"]
async function render() {
  // 获取当前登录用户的名字，以便于获取到属于自身的新闻
  let username = JSON.parse(isLogin()).username
  list = await fetch(`http://localhost:3000/news?author=${ username }`).then(res=>res.json())
  // console.log(list);
  listbody.innerHTML = list.map(item=> `
    <tr>
      <th scope="row">${ item.title }</th>
      <td>
        ${ categoryList[item.category] }
      </td>

      <td>
      <button type="button" class="btn btn-success btn-sm btn-preview" data-myid="${ item.id }">预览</button>
      <button type="button" class="btn btn-primary btn-sm btn-edit" data-myid="${ item.id }">更新</button>
      
      <button type="button" class="btn btn-danger btn-sm btn-del" data-myid="${ item.id }">删除</button>
      </td>
    </tr>
  `).join("")
}

// 事件委托机制：冒泡
listbody.onclick = function(evt) {
  // console.log(evt.target.className);
  if(evt.target.className.includes("btn-preview")){
    // console.log('预览按钮',evt.target.dataset.myid)
    // 当点击了 预览 按钮，就显示 预览模态框
    myPreviewModal.toggle()
    let obj = list.filter(item=>item.id == evt.target.dataset.myid)[0]
    // 获取模态框中的标题
    renderPreviewModal(obj)
  }else if(evt.target.className.includes("btn-edit")){
    // console.log('更新按钮')
    location.href = "/admin/views/news-manage/EditNews/index.html?id="+ evt.target.dataset.myid // 带上 id
  }else if(evt.target.className.includes("btn-del")) {
    // console.log('删除按钮')
    updateId = evt.target.dataset.myid
    // 显示 删除模态框
    myDelModal.toggle()
  }
}

// 渲染 renderPreviewModal() 方法中的标题
function renderPreviewModal(obj) {
  previewModalContent.innerHTML = obj.content
  previewModalTitle.innerHTML = obj.title
}

// 删除模态框 中的 确定按钮 点击事件
delConfirm.onclick = async function() {
  await fetch(`http://localhost:3000/news/${ updateId }`,{
    method: "DELETE",
  })
  myDelModal.toggle()
  render()
}

// 加载页面的时候就直接调用 已经创建好的 新闻数据
render()
