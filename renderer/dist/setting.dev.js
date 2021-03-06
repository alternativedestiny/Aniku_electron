"use strict";

var fs = require('fs'); // 读取json文件


var set_info = fs.readFileSync('./cache/setting.json', 'utf-8', function (err, data) {
  if (err) {
    console.log("Read file error!");
    console.log(err.message);
  } else {
    console.log("Read file success."); // console.log(data);

    return data;
  }
});
set_info = JSON.parse(set_info); // 将配置文件写入配置文件

function writeSetting(key, val) {
  set_info[key] = val;
  var t = JSON.stringify(set_info);
  fs.writeFileSync('./cache/setting.json', t);
} // console.log(set_info);
// console.log(set_info['name']);
// app4: slider滑块


new Vue({
  el: '#app4',
  data: {
    value1: set_info['cols'],
    radio: set_info['window'],
    color: set_info['color']
  },
  methods: {
    handleChange: function handleChange(value) {
      console.log(value);
      writeSetting("cols", value);
      this.$notify({
        title: '保存设置',
        message: '设置保存设置',
        type: 'success',
        duration: 2000
      });
    },
    colorChange: function colorChange(color) {
      writeSetting("color", color);
      this.$notify({
        title: '保存设置',
        message: '设置重启后生效',
        type: 'success',
        duration: 2000
      });
    },
    radioChange: function radioChange(radio) {
      writeSetting("window", radio);
      this.$notify({
        title: '保存设置',
        message: '设置重启后生效',
        type: 'success',
        duration: 2000
      });
    }
  }
}); // info 信息

new Vue({
  el: '#info',
  data: {
    name: set_info['name'],
    version: set_info["version"]
  }
}); // app5 选择图片大小和显示方式

new Vue({
  el: '#app5',
  data: {
    fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    radio: set_info['fit'],
    width: set_info['width'],
    height: set_info['height'],
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
  methods: {
    radioChange: function radioChange(radio) {
      console.log(radio);
      writeSetting("fit", radio);
      this.$notify({
        title: '保存设置',
        message: '设置保存设置',
        type: 'success',
        duration: 2000
      });
    },
    setWidth: function setWidth(width) {
      writeSetting("width", width);
      this.$notify({
        title: '保存设置',
        message: '设置保存设置',
        type: 'success',
        duration: 2000
      });
    },
    setHeight: function setHeight(height) {
      writeSetting("height", height);
      this.$notify({
        title: '保存设置',
        message: '高度设置保存',
        type: 'success',
        duration: 2000
      });
    }
  }
});