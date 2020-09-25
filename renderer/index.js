const fs = require('fs')
const { shell, BrowserWindow } = require('electron');

// 读取json配置文件
var set_info = fs.readFileSync('./cache/setting.json', 'utf-8', function (err, data) {
    if (err) {
        console.log("Read file error!");
        console.log(err.message);
    } else {
        console.log("Read file success.");
        // console.log(data);
        return data;
    }
});
set_info = JSON.parse(set_info);  // json数据格式化

// 获取图片列表
let list = fs.readdirSync('D:/PersonalProject/Aniku_electron/cache/images/');
let files = [];
for (let i = 0; i < 40; i++) {
    if (list[i].indexOf('.') != -1) {
        files.push('D:/PersonalProject/Aniku_electron/cache/images/' + list[i]);
    }
}
let fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];

// nav-menu
new Vue({
    el: '#nav_menu',
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        add(){
            // 新建窗口
            window.open('03-add.html');
        }
    }
})

// content
new Vue({
    el: '#content',
    data: {
        imgs: files,
        img_header: files[0],
        span: parseInt(24 / set_info['cols']),
        fit: fits[set_info['fit']],
        
    },
    methods: {
        changeHeader(img){
            this.img_header = img;
        },
        openFile(img) {
            shell.openPath(img);
            this.$notify({
                title: '打开文件',
                message: img.split('/').pop() + '正在打开',
                type: 'success',
                duration: 2000,
            });
        }
    }
})
