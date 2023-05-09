/*
 * @Author: 谭磊 2928331677@qq.com
 * @Date: 2023-05-08 12:59:27
 * @LastEditors: 谭磊 2928331677@qq.com
 * @LastEditTime: 2023-05-08 14:00:46
 * @FilePath: \code\web\util\LoadViews.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
    // 动态获取用户的 个人信息
  // function renderTopbar(user){
  //   console.log(user);
  //   // 获取 /topbar/index.html 中的 用户头像、用户名、退出按钮
  //   const photo = document.querySelector("#topbar-photo");
  //   const currentUsername = document.querySelector("#currentUsername");
  //   const exit = document.querySelector("#exit")
  //   // 为上述获取的 元素 添加 事件
  //   // 1. 动态添加头像
  //   photo.src = user.photo
  //   // 2. 动态添加用户名
  //   currentUsername.innerHTML = user.username
  //   // 3. 添加退出按钮点击事件，返回到登录界面
  //   exit.onclick = function() {
  //       localStorage.removeItem("token");
  //       location.href= "/admin/views/login/index.html"
  //   }
  // }

  // 动态获取点击的项目高亮
  // function renderSidemenu(user,id){
  //   document.querySelector("#" + id).style.color = "#0a58ca"
  //     if(user.role !== "admin") {
  //       document.querySelector(".user-manage-item").remove()
  //     }
  // }

  async function load(id){
      // 用户登录成功，将用户的个人信息渲染到页面上
      let topbarText = await fetch('/web/components/topbar/index.html').then(res=>res.text())
      const topbar = document.querySelector(".top-bar")
      topbar.innerHTML = topbarText
      if(id) {
        // 选中 相应的元素 显示高亮
      document.querySelector(`#${ id }`).style.color = "#0a58ca"
      }
  }

  // 导出 { load }
  export { load }