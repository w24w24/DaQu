/*
 * @Author: 谭磊 2928331677@qq.com
 * @Date: 2023-05-05 14:14:14
 * @LastEditors: 谭磊 2928331677@qq.com
 * @LastEditTime: 2023-05-06 23:09:25
 * @FilePath: \code\admin\views\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入公共的模块
import {load} from '/admin/util/LoadViews.js' 
load("sidemenu-addUser")

// 注册 添加用户 按钮事件
addUserform.onsubmit = async function(event) {
  // 阻止表单提交的默认行为
  event.preventDefault();

  // 需要提交到后台的 db 数据库中
  await fetch("http://localhost:3000/users",{
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      introduction: introduction.value,
      photo
    })
  }).then(res=> res.json())
  // 添加成功后，跳转到 用户列表
  location.href = "/admin/views/user-manage/UserList/index.html"
}

// 创建一个空 photo ，用来接收转换的 base64 图像
let photo = ""
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
    photo = e.target.result;
  }
}
