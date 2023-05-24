/*
 * @Author: hzx0901 
 * @Date: 2022-11-10 21:07:00 
 * @Last Modified by: hzx0901
 * @Last Modified time: 2022-11-14 19:45:52
 */
// 引入模块
import { load } from "/admin/util/LoadView.js"
load("sidemenu-addUser"); // 加载topbar sidemenu

let photo = ""

// 提交用户信息
addUserForm.onsubmit = async function(evt){
    // 阻止默认事件（浏览器刷新）
    evt.preventDefault() 

    await fetch("http://localhost:5000/users",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:username.value,
            password:password.value,
            introduction:introduction.value,
            photo // photo:photo
        })
    }).then(res=>{ res.json()})
    location.href = "/admin/views/user-manage/UserList/index.html"
}

// 监听图片提交，每次改变就将图片转为base64
photofile.onchange = async function(evt){
    //===>base64
    let reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0])

    reader.onload = function(e){
        photo = e.target.result
    }
}