/*
 * @Author: hzx0901 
 * @Date: 2022-11-10 21:07:00 
 * @Last Modified by: hzx0901
 * @Last Modified time: 2022-11-24 18:18:10
 */
// 引入模块
import {load,isLogin} from "/admin/util/LoadView.js"
load("sidemenu-home"); // 加载topbar sidemenu

let user = JSON.parse(isLogin());
let categoryList = ["最新动态","典型案例","通知公告"]
// 渲染首页用户信息
document.querySelector(".userprofile").innerHTML = `
    <img src="${user.photo}" style="width:100px;height:100px;border-radius:50%;"/>
    <div>
        <div>${user.username}</div>
        <div><pre>${user.introduction || "这个人很懒"}</pre></div>
    </div>
`

async function anaylist(){
    let res =await fetch("http://localhost:5000/news?author="+user.username).then(res=>res.json())
    let obj = _.groupBy(res,item=>item.category)
    let arr = []
    for(let i in obj){
        arr.push({
            name:categoryList[i],
            value:obj[i].length
        })
    }
    rednerEcharts(arr)
    
}

function rednerEcharts(data){
    // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'))
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
        name: '类型',
        type: 'pie',
        radius: '50%',
        data,
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
  myChart.setOption(option)
}

anaylist()
