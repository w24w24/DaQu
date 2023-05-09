/*
 * @Author: 谭磊 2928331677@qq.com
 * @Date: 2023-05-05 14:14:14
 * @LastEditors: 谭磊 2928331677@qq.com
 * @LastEditTime: 2023-05-07 19:25:41
 * @FilePath: \code\admin\views\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入公共的模块
import {load,isLogin} from '/admin/util/LoadViews.js' 
load("sidemenu-addNews")

// 同步修改的内容
let content = "" 
// 选择图片
let cover = ""

// 这是 wangEdit.js 初始化文件
const { createEditor, createToolbar } = window.wangEditor
const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
      const html = editor.getHtml()
      // console.log('editor content', html)
      // 也可以同步到 <textarea>
      content = html
    }
}
const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})
const toolbarConfig = {}
const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})

// 用户上传的封面图片
// 监听头像的改变
coverfile.onchange = function(event) {
  // console.log(e.target.files[0]);

  // new 一个 FileReader() 方法，用来读取图像文件
  let reader = new FileReader(); 

  // 使用 readAsDataURL() 读取二进制图像文件,转换为 base64 格式
  reader.readAsDataURL(event.target.files[0])

  // 指定读取完成的时间
  reader.onload = function(e) {
    // console.log(e.target.result);
    cover = e.target.result;
  }
}

// 用户创建新闻的 标题
addNewsForm.onsubmit = async function(evt) {
  // 阻止表单提交时候的默认行为
  evt.preventDefault();
  // 在 json-server 数据库中添加数据
  await fetch("http://localhost:3000/news",{
    headers:{
      "content-type":"application/json"
    },
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      content,
      category: category.value,
      cover,
      // 作者
      author:JSON.parse(isLogin()).username
    })
  }).then(res=>res.json())
  // 创建新闻成功之后跳转到 新闻列表
  location.href = "/admin/views/news-manage/NewsList/index.html"
}

