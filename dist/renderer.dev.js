"use strict";

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var fs = require('fs');

var _require = require('electron'),
    shell = _require.shell; // 读取json文件


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
// 获取图片列表

var list = fs.readdirSync('D:/PersonalProject/Aniku_electron/cache/images/');
var files = [];

for (var i = 0; i < 40; i++) {
  if (list[i].indexOf('.') != -1) {
    files.push('D:/PersonalProject/Aniku_electron/cache/images/' + list[i]);
  }
}

var fits = ['fill', 'contain', 'cover', 'none', 'scale-down']; // nav-menu

new Vue({
  el: '#nav_menu',
  methods: {
    handleOpen: function handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose: function handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    change: function change() {}
  }
}); // content

new Vue({
  el: '#content',
  data: {
    imgs: files,
    img_header: files[0],
    span: parseInt(24 / set_info['cols']),
    fit: fits[set_info['fit']]
  },
  methods: {
    changeHeader: function changeHeader(img) {
      this.img_header = img;
    },
    openFile: function openFile(img) {
      shell.openPath(img);
      this.$notify({
        title: '打开文件',
        message: img.split('/').pop() + '正在打开',
        type: 'success',
        duration: 2000
      });
    }
  }
});