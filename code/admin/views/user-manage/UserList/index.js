/*
 * @Author: 谭磊 2928331677@qq.com
 * @Date: 2023-05-05 14:14:14
 * @LastEditors: 谭磊 2928331677@qq.com
 * @LastEditTime: 2023-05-07 13:32:03
 * @FilePath: \code\admin\views\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入公共的模块
import {load} from '/admin/util/LoadViews.js' 
load("sidemenu-userList")

// 编辑按钮 模态框
let myEditModal = new bootstrap.Modal(document.getElementById('editModal'))
// 删除按钮 模态框
let myDelModal = new bootstrap.Modal(document.getElementById('delModal'))
// 全局数组
let list = []
// 更新数据
let updateId = 0
// 用户切换头像
let photodata = ""
// 异步请求 用户列表
async function render() {
  list = await fetch("http://localhost:3000/users").then(res=> res.json())
  console.log(list);
  // 直接 映射 相应的组件
  listbody.innerHTML = list.map(item => `
    <tr>
      <th scope="row">${ item.username }</th>
      <td>
        <img src="${ item.photo }" style="width: 50px; height: 50px;border-radius: 50%" />
      </td>
      <td>
      <button type="button" class="btn btn-primary btn-sm btn-edit" ${ item.default?"disabled":""} data-myid="${ item.id }">编辑</button>
      <button type="button" class="btn btn-danger btn-sm btn-del" ${ item.default?"disabled":"" } data-myid="${ item.id }">删除</button>
      </td>
    </tr>
  `).join("")
}

// 采用事件冒泡，绑定 编辑按钮 和 删除按钮
listbody.onclick = function(event) {
  // 判断是 edit 还是 del
  if(event.target.className.includes("btn-edit")) {
    // console.log('edit',event.target.dataset.myid);
    updateId = event.target.dataset.myid
    // 数组过滤
    // console.log(list.filter(item=>item.id === updateId)[0]);
    // 显示modal
    myEditModal.toggle()
    // 预填modal
    // 解构赋值
    let { username,password,introduction,photo } = list.filter(item=>item.id == updateId)[0]
    // 将值动态写入模态框
    document.querySelector("#username").value = username
    document.querySelector("#password").value = password
    document.querySelector("#introduction").value = introduction
    // 假设用户不更改头像,就使用原来的头像
    photodata = photo

  }else if(event.target.className.includes("btn-del")) {
    // console.log('del');
    myDelModal.toggle()
    updateId = event.target.dataset.myid
  }
}

// 用户点击 编辑模态框 中的 更新 的处理函数
editConfirm.onclick = async function() {
  await fetch(` http://localhost:3000/users/${ updateId } `,{
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body:JSON.stringify({
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
      introduction: document.querySelector("#introduction").value,
      photo: photodata
    })
  }).then(res=>res.json())
  myEditModal.toggle()
  // 修改完毕立即更新界面
  // location.reload() 不推荐使用: 因为会导致所有界面刷新
  render()
}

// 监听头像的改变
photofile.onchange = function(event) {
  // console.log(e.target.files[0]);
  // new 一个 FileReader() 方法，用来读取图像文件
  let reader = new FileReader(); 
  // 使用 readAsDataURL() 读取二进制图像文件,转换为 base64 格式
  reader.readAsDataURL(event.target.files[0])
  // 指定读取完成的时间
  reader.onload = function(e) {
    // console.log(e.target.result);
    photodata = e.target.result;
  }
}

// 用户点击 删除模态框 中的 确定 的处理函数
delConfirm.onclick = async function() {
  await fetch(`http://localhost:3000/users/${ updateId }`,{
    method: "DELETE"
  }).then(res=>res.json())
  myDelModal.toggle()
  render()
}

render()
