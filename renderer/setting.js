const fs = require('fs')

// 读取json文件
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
set_info = JSON.parse(set_info);

// 将配置文件写入配置文件
function writeSetting(key, val) {
    set_info[key] = val;
    var t = JSON.stringify(set_info);
    fs.writeFileSync('./cache/setting.json', t);
}

// console.log(set_info);
// console.log(set_info['name']);

// app4: slider滑块
new Vue({
    el: '#app4',
    data: {
        value1: set_info['cols'],
        radio: set_info['window']
    },
    methods: {
        handleChange(value) {
            console.log(value);
            writeSetting("cols", value);
            this.$notify({
                title: '保存设置',
                message: '设置保存设置',
                type: 'success',
                duration: 2000,
            });
        },
        radioChange(radio) {
            writeSetting("window", radio);
            this.$notify({
                title: '保存设置',
                message: '设置重启后生效',
                type: 'success',
                duration: 2000,
            });
        }
    },
});

// app5 选择并保存图片显示方式
let fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];
new Vue({
    el: '#app5',
    data: {
        radio: set_info['fit'],
        width: set_info['width'],
        height: set_info['height'],
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        width: set_info['width'],
        fit: fits[set_info['fit']]
    },
    methods: {
        radioChange(radio) {
            console.log(radio);
            writeSetting("fit", radio);
            this.$notify({
                title: '保存设置',
                message: '设置保存设置',
                type: 'success',
                duration: 2000,
            });
            location.reload();
        },
        setWidth(width) {
            writeSetting("width", width);
            this.$notify({
                title: '保存设置',
                message: '设置保存设置',
                type: 'success',
                duration: 2000,
            });
        },
        setHeight(height) {
            writeSetting("height", height);
            this.$notify({
                title: '保存设置',
                message: '高度设置保存',
                type: 'success',
                duration: 2000,
            });
        }
    },
});

// info 信息
new Vue({
    el: '#info',
    data: {
        name: set_info['name'],
        version: set_info["version"],
    }
});
