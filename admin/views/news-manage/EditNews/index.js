/*
 * @Author: hzx0901 
 * @Date: 2022-11-10 21:07:00 
 * @Last Modified by: hzx0901
 * @Last Modified time: 2022-11-28 20:26:34
 */
// 引入模块
import {load,isLogin} from "/admin/util/LoadView.js"

load("sidemenu-newsList"); // 加载topbar sidemenu

// 获取id
let updateId = new URL(location.href).searchParams.get("id")

let content = ""
let cover = ""

// 富文本编辑器
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
      const html = editor.getHtml()
      /* console.log('editor content', html)
      // 也可以同步到 <textarea> */
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

// 监听图片提交，每次改变就将图片转为base64
coverfile.onchange = async function(evt){
    //===>base64
    let reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0])

    reader.onload = function(e){
        cover = e.target.result
    }
}

// 新闻内容提交
editNewsForm.onsubmit = async function(evt){
    evt.preventDefault()
    await fetch(`http://localhost:5000/news/${updateId}`,{
        headers:{
            "content-type":"application/json"
        },
        method:"PATCH",
        body:JSON.stringify({
            title:title.value,
            content,
            category:category.value,
            cover
        })
    }).then(res=>res.json())

    location.href = "/admin/views/news-manage/NewsList/index.html"
}

async function render(){
    let {title,category,content:mycontent,cover:mycover} = await fetch(`http://localhost:5000/news/${updateId}`).then(res=>res.json())
    document.querySelector("#title").value = title;
    document.querySelector("#category").value = category;
    //设置content
    editor.setHtml(mycontent)
    content = mycontent
    cover = mycover
}

render()