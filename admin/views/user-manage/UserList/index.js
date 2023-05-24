/*
 * @Author: hzx0901 
 * @Date: 2022-11-10 21:07:00 
 * @Last Modified by: hzx0901
 * @Last Modified time: 2022-11-23 23:30:45
 */
// 引入模块
import {load} from "/admin/util/LoadView.js"
load("sidemenu-userList"); // 加载topbar sidemenu

// 模态框实例化
let myEditModal = new bootstrap.Modal(document.getElementById('editModal'))
let myDelModal = new bootstrap.Modal(document.getElementById('delModal'))

let list = []
let updateID = 0
let photodata = ""

async function render(){
    list = await fetch("http://localhost:5000/users").then(res=>res.json())
    listbody.innerHTML = list.map(item=>`
    <tr>
        <th scope="row">${item.username}</th>
        <td><img src="${item.photo}" style="width:50px;height:50px;border-radius:50%;"/></td>
        <td>
            <button type="button" class="btn btn-primary btn-sm btn-edit" ${item.default?"disabled":""} data-myid="${item.id}">编辑</button>
            <button type="button" class="btn btn-danger btn-sm btn-del" ${item.default?"disabled":""} data-myid="${item.id}">删除</button>
        </td>
    </tr>`).join(" ")
    listbody.onclick = function(evt){
        if(evt.target.className.includes("btn-edit")){

            // 显示madal
            updateID = evt.target.dataset.myid
            myEditModal.toggle()
            
            // 预填madal
            let {username,password,introduction,photo} = list.filter(item=>item.id==updateID)[0]

            document.querySelector("#username").value = username
            document.querySelector("#password").value = password
            document.querySelector("#introduction").value = introduction

            photodata = photo
        }else if(evt.target.className.includes("btn-del")){
            myDelModal.toggle();
            updateID = evt.target.dataset.myid
        }
    }
}

editConfirm.onclick = async function(){
    await fetch(`http://localhost:5000/users/${updateID}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:document.querySelector("#username").value,
            password:document.querySelector("#password").value,
            introduction:document.querySelector("#introduction").value,
            photo:photodata // photo:photo
        })
    }).then(res=>res.json())

    myEditModal.toggle();
    render();
}

// 监听图片提交，每次改变就将图片转为base64
photofile.onchange = async function(evt){
    //===>base64
    let reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0])

    reader.onload = function(e){
        photodata = e.target.result
    }
}

// 删除
delConfirm.onclick = async function(){
    await fetch(`http://localhost:5000/users/${updateID}`,{
        method:"delete"
    }).then(res=>res.json())
    myDelModal.toggle()
    render()
}
render();
