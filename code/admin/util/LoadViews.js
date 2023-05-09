  function isLogin(){
      return localStorage.getItem("token")
    }
  
  // 动态获取用户的 个人信息
  function renderTopbar(user){
    console.log(user);
    // 获取 /topbar/index.html 中的 用户头像、用户名、退出按钮
    const photo = document.querySelector("#topbar-photo");
    const currentUsername = document.querySelector("#currentUsername");
    const exit = document.querySelector("#exit")
    // 为上述获取的 元素 添加 事件
    // 1. 动态添加头像
    photo.src = user.photo
    // 2. 动态添加用户名
    currentUsername.innerHTML = user.username
    // 3. 添加退出按钮点击事件，返回到登录界面
    exit.onclick = function() {
        localStorage.removeItem("token");
        location.href= "/admin/views/login/index.html"
    }
  }

  // 动态获取点击的项目高亮
  function renderSidemenu(user,id){
    document.querySelector("#" + id).style.color = "#0a58ca"
      if(user.role !== "admin") {
        document.querySelector(".user-manage-item").remove()
      }
  }

  async function load(id){
    let user = isLogin()
    if(user){
      // 用户登录成功，将用户的个人信息渲染到页面上
      let topbarText = await fetch('/admin/components/topbar/index.html').then(res=>res.text())
        const topbar = document.querySelector(".top-bar")
        topbar.innerHTML = topbarText
        // 动态渲染用户的名字到 topbar 上
        renderTopbar(JSON.parse(user))

        // 
        let sidemenuText = await fetch('/admin/components/sidemenu/index.html').then(res=>res.text())
        const sidebar = document.querySelector(".sideMenu")
        sidebar.innerHTML = sidemenuText

        // 
        renderSidemenu(JSON.parse(user),id)

    }else {
      // 用户登录失败，将页面停留在 登录界面
      location.href= "/admin/views/login/index.html"
    }
  }

  // 导出 { load }
export {load,isLogin}