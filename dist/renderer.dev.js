"use strict";

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var fs = require('fs');

var dialog = require('electron').remote.dialog;

var _require = require('electron'),
    shell = _require.shell;

var _require2 = require('http'),
    METHODS = _require2.METHODS; // 读取json文件


var set_info = fs.readFileSync('./cache/setting.json', 'utf-8', function (err, data) {
  if (err) {
    console.log("Read file error!");
    console.log(err.message);
  } else {
    console.log("Read file success."); // console.log(data);

    return data;
  }
});
set_info = JSON.parse(set_info); // json数据格式化
// 选择文件/文件夹

var open = document.getElementById('open');

open.onclick = function () {
  dialog.showOpenDialog({
    title: '选择文件夹',
    defaultPath: './cache/',
    buttonLabel: '选择文件夹',
    properties: ['openDirectory']
  }).then(function (result) {
    // let img = document.getElementById('img');
    // img.setAttribute('src', result.filePaths[0]);
    console.log(result.filePaths[0]);
    var list = fs.readdirSync(result.filePaths[0]);
    console.log(list.length);

    for (var i = 0; i < list.length; i++) {
      console.log(list[i]);
    }
  })["catch"](function (err) {
    console.log(err);
  });
}; // 保存文件


var save = document.getElementById('save');

save.onclick = function () {
  dialog.showSaveDialog({
    title: '保存文件',
    defaultPath: 'D:/PersonalProject/Aniku_electron/cache/'
  }).then(function (result) {
    fs.writeFileSync(result.filePath, 'avc');
  })["catch"](function (err) {
    console.log(err);
  });
}; // 消息提示


var message = document.getElementById('message');

message.onclick = function () {
  dialog.showMessageBox({
    type: 'warning',
    title: '123',
    message: '456',
    buttons: ['a', 'b']
  }).then(function (result) {
    console.log(result);
  });
}; // 系统通知


var notify = document.getElementById('notify');
var options = {
  title: 'notify',
  body: '你有一条通知'
};

notify.onclick = function () {
  new window.Notification(options.title, options);
}; // 读取json文件


var input = document.getElementById('get');
var data1 = document.getElementById('data');

input.onclick = function () {
  var json = require('D:/PersonalProject/Aniku_electron/cache/test.json');

  data1.innerHTML = json.name;
}; // 打开文件


var exe = document.getElementById('exe');

exe.onclick = function () {
  shell.openPath('D:/PersonalProject/Aniku_electron/test.txt');
}; // 爬虫


var find = document.getElementById('find');

find.onclick = function () {
  var img2 = document.getElementById('img2');
  img2.setAttribute('src', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2614500649.webp');
}; // 网络状态监听


window.addEventListener('online', function () {
  options.title = '网络链接';
  options.body = '网络已连接';
  new window.Notification(options.title, options);
});
window.addEventListener('offline', function () {
  options.title = '网络链接';
  options.body = '网络已断开';
  new window.Notification(options.title, options);
}); // pic_list

var list = fs.readdirSync('D:/PersonalProject/Aniku_electron/cache/images/');
var files = [];

for (var i = 0; i < list.length; i++) {
  if (list[i].indexOf('.') != -1) {
    files.push('D:/PersonalProject/Aniku_electron/cache/images/' + list[i]);
  }
}

var fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];
new Vue({
  el: '#pic_list',
  data: {
    imgs: files,
    fit: fits[set_info['fit']],
    span: parseInt(24 / set_info['cols'])
  },
  methods: {
    openFile: function openFile(img) {
      shell.openPath(img);
      this.$notify({
        title: '打开文件',
        message: img + '正在打开',
        type: 'success',
        duration: 2000
      });
    }
  }
});