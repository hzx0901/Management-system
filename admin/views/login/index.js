/*
 * @Author: hzx0901 
 * @Date: 2022-11-10 21:00:07 
 * @Last Modified by: hzx0901
 * @Last Modified time: 2022-11-12 19:57:04
 */
const loginform = document.querySelector("#loginform")
loginform.onsubmit = async function(evt){
    loginwarning.style.display = "none"
    // alert("登录成功")
    // 阻止默认事件（刷新）
    evt.preventDefault();

    console.log(username.value,password.value);

    // 正常 post请求
    
    //json-server get获取 post添加 put修改 delete删除
    // 查询登录用户信息
    let res = await fetch(`http://localhost:5000/users?username=${username.value}&password=${password.value}`)
    .then(res=>res.json());
    // 判断返回的res是否是空数组
    if(res.length>0){
        // 本地存储token
        localStorage.setItem("token",JSON.stringify({
            ...res[0],
            password:"****"
        }))
        location.href="/admin/views/home/index.html";
    }else{
        console.log("登录失败");
        loginwarning.style.display = "block";
    }
}