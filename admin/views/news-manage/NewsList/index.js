/*
 * @Author: hzx0901 
 * @Date: 2022-11-10 21:07:00 
 * @Last Modified by: hzx0901
 * @Last Modified time: 2022-11-23 23:33:54
 */
// 引入模块
import {load,isLogin} from "/admin/util/LoadView.js"
load("sidemenu-newsList"); // 加载topbar sidemenu

// 预览模态框实例化
let myPreviewModal = new bootstrap.Modal(document.getElementById('previewModal'))
let myDelModal = new bootstrap.Modal(document.getElementById('delModal'))

let list = []
let updateId = 0
let categoryList = ["最新动态","典型案例","通知公告"]
async function render(){
    let username = JSON.parse(isLogin()).username
    list = await fetch(`http://localhost:5000/news?author=${username}`).then(res=>res.json())
    listbody.innerHTML = list.map(item=>`
    <tr>
        <th scope="row">${item.title}</th>
        <td>${categoryList[item.category]}</td>
        <td>
            <button type="button" class="btn btn-success btn-sm btn-preview"} data-myid="${item.id}">预览</button>
            <button type="button" class="btn btn-primary btn-sm btn-edit"} data-myid="${item.id}">更新</button>
            <button type="button" class="btn btn-danger btn-sm btn-del"} data-myid="${item.id}">删除</button>
        </td>
    </tr>
    `).join("")
}

listbody.onclick = function(evt){
    evt.preventDefault()
    if(evt.target.className.includes("btn-preview")){
        myPreviewModal.toggle()
        let obj = list.filter(item=>item.id==evt.target.dataset.myid)[0]
        renderPreviewModal(obj)
    }else if(evt.target.className.includes("btn-edit")){
        location.href = "/admin/views/news-manage/EditNews/index.html?id="+evt.target.dataset.myid
    }else if(evt.target.className.includes("btn-del")){
        updateId = evt.target.dataset.myid

        myDelModal.toggle()
    }
}
function renderPreviewModal(obj){
    previewModalTitle.innerHTML = obj.title;
    previewModalContent.innerHTML = obj.content;
}

delConfirm.onclick = async function(){
    await fetch(`http://localhost:5000/news/${updateId}`,{
        method:"delete"
    })
    myDelModal.toggle()

    render()
}

render()
