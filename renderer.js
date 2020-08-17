// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const fs = require('fs')
const { dialog } = require('electron').remote
const { shell } = require('electron')

// 选择文件/文件夹
let open = document.getElementById('open');
open.onclick = function () {
    dialog.showOpenDialog({
        title: '选择文件夹',
        // defaultPath: 'D:/PersonalProject/vue_press/docs/pages/images/',
        filters: [{ name: '图片', extensions: ['jpg', 'png'] }],
        buttonLabel: '选择文件夹',
        // properties: ['openFile', 'openDirectory']
    }).then(result => {
        let img = document.getElementById('img');
        img.setAttribute('src', result.filePaths[0]);
    }).catch(err => {
        console.log(err);
    })
}

// 保存文件
let save = document.getElementById('save');
save.onclick = function () {
    dialog.showSaveDialog({
        title: '保存文件',
        defaultPath: 'D:/PersonalProject/Aniku_electron/cache/'
    }).then(result => {
        fs.writeFileSync(result.filePath, 'avc');
    }).catch(err => {
        console.log(err);
    })
}

// 消息提示
let message = document.getElementById('message');
message.onclick = function () {
    dialog.showMessageBox({
        type: 'warning',
        title: '123',
        message: '456',
        buttons: ['a', 'b']
    }).then(result => {
        console.log(result);
    })
}

// 系统通知
let notify = document.getElementById('notify');
let options = {
    title: 'notify',
    body: '你有一条通知'
}
notify.onclick = function () {
    new window.Notification(options.title, options)
}

// 读取json文件
let input = document.getElementById('get');
let data1 = document.getElementById('data');
input.onclick = function () {
    let json = require('D:/PersonalProject/Aniku_electron/cache/test.json');
    data1.innerHTML = json.name
}

// 打开文件
let exe = document.getElementById('exe');
exe.onclick = function(){
    shell.openPath('D:/PersonalProject/Aniku_electron/test.txt');
}

// 爬虫
let find = document.getElementById('find');
find.onclick = function(){
    let img2 = document.getElementById('img2');
    img2.setAttribute('src', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2614500649.webp')

}

// 网络状态监听
window.addEventListener('online', function(){
    options.title = '网络链接';
    options.body = '网络已连接';
    new window.Notification(options.title, options);
})
window.addEventListener('offline', function(){
    options.title = '网络链接';
    options.body = '网络已断开';
    new window.Notification(options.title, options);
})