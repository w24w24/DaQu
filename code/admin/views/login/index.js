const login = window.document.querySelector('#login')
login.onsubmit = async function(event) {
  loginwarning.style.display = "none";
  // console.log('提交成功')
  // 阻止表单提交的默认行为
  event.preventDefault()

  // 在 数据库(db.json)中判断是否存在用户信息
  // 如果存在，返回的数据长度是大于 0 的；如果不存在，是小于 0 的
  console.log(username.value,password.value);
  let res = await fetch(`http://localhost:3000/users?username=${ username.value }&password=${ password.value }`).then( res=> res.json())

  console.log(res[0]);
  // 判断是否登录成功
  if(res.length > 0) {
    localStorage.setItem("token",JSON.stringify({
      ...res[0],
      password: '***'
    }))
    location.href ="/admin/views/home/index.html"
  } else{
    // 登录失败
    loginwarning.style.display = "block";
  }
}