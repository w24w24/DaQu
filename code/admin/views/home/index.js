/*
 * @Author: 谭磊 2928331677@qq.com
 * @Date: 2023-05-05 14:14:14
 * @LastEditors: 谭磊 2928331677@qq.com
 * @LastEditTime: 2023-05-08 12:24:52
 * @FilePath: \code\admin\views\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入公共的模块
import {load,isLogin} from '/admin/util/LoadViews.js' 
load("sidemenu-home")

let user = JSON.parse(isLogin())
// 获取 文章类型
let categoryList = ["最新动态","典型案例","通知公告"]
// console.log(user);
document.querySelector(".userProfile").innerHTML = `
  <img src="${ user.photo }" style="width: 150px;"/>
  <div>
    <div>${ user.username }</div>
    <div><pre>${ user.introduction || "这个人很懒，没有留下介绍" }</pre></div>
  </div>
`

// 获取当前 登录用户 所发布的 新闻
async function analyst() {
  let res = await fetch("http://localhost:3000/news?author=" + user.username).then(res=>res.json())
  console.log(res);
  // console.log(_.groupBy(res,item=>item.category));
  let obj = _.groupBy(res,item=>item.category)
  let arr = []
  for(let i in obj) {
    arr.push({
      name: categoryList[i],
      value: obj[i].length
    })
  }
  renderEcharts(arr);
}

// renderEcahrts() 方法
function renderEcharts(data) {
// echarts 图表
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
  title: {
    text: '当前用户发布的新闻',
    subtext: '不同类别占比',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '新闻类别',
      type: 'pie',
      radius: '50%',
      data: data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
}


// 调用 analyst() 方法
analyst()