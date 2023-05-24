/*
 * @Author: hzx0901 
 * @Date: 2022-11-10 20:59:47 
 * @Last Modified by: hzx0901
 * @Last Modified time: 2022-11-15 21:37:44
 */
// 获取本地存储的token
function isLogin(){
    return localStorage.getItem("token")
}

// 渲染用户头像、用户名等
function renderTopbar(user){
    let photo = document.querySelector("#topbar-photo")
    let currentUsername = document.querySelector("#currentUsername")
    let exit = document.querySelector("#exit")

    photo.src = user.photo
    currentUsername.innerHTML = user.username
    exit.onclick = function(){
        localStorage.removeItem("token")
        location.href = "/admin/views/login/index.html"
    }
}

// 渲染用户管理
function renderSidemenu(user,id){
    document.querySelector("#"+id).style.color="#0a58ca"
        if(user.role!=="admin"){
            document.querySelector(".user-manage-item").remove()
        }
    }

async function load(id){
    // 获取token
    let user = isLogin();
    
    // 判断token是否存在，存在则渲染页面，不存在则返回登录页面
    if(user){
        // 请求顶层栏
        let topbarText = await fetch("/admin/components/topbar/index.html")
        .then(res=>res.text())

        document.querySelector(".topbar").innerHTML = topbarText;

        renderTopbar(JSON.parse(user))

        // 请求侧边栏
        let sidemenuText = await fetch("/admin/components/sidemenu/index.html")
        .then(res=>res.text())
        
        document.querySelector(".sidemenu").innerHTML = sidemenuText
        
        renderSidemenu(JSON.parse(user),id)
    }else{
            location.href="/admin/views/login/index.html"
    }
}

export {load,isLogin}
