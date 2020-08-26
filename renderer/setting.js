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

// info 信息
new Vue({
    el: '#info',
    data: {
        name: set_info['name'],
        version: set_info["version"],
    }
});

// app1 弹框
new Vue({
    el: '#app1',
    data: function () {
        return { visible: false }
    }
});

// app2 计数器
var Main = {
    data() {
        return {
            num: 1
        };
    },
    methods: {
        handleChange(value) {
            console.log(value);
        }
    }
};
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app2')

// app3 通知
// new Vue().$mount('#app3')
new Vue({
    el: '#app3',
    methods: {
        open1() {
            this.$notify({
                title: '保存成功',
                message: '设置保存成功',
                type: 'success',
                duration: 2000,
            });
        },
        open2() {
            this.$notify.info({
                title: '取消保存',
                message: '设置未保存',
                duration: 2000,
            });
            location.reload();  // 刷新页面
        },
    }
});

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
                title: '保存成功',
                message: '设置保存成功',
                type: 'success',
                duration: 2000,
            });
        },
        radioChange(radio) {
            writeSetting("window", radio);
            this.$notify({
                title: '保存成功',
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
        heigth: set_info['heigth'],
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        size: { width: set_info['width'] + "px", heigth: set_info['heigth'] + "px" },
        fit: fits[set_info['fit'] - 1]
    },
    methods: {
        radioChange(label) {
            console.log(label);
            writeSetting("fit", label);
            this.$notify({
                title: '保存成功',
                message: '设置保存成功',
                type: 'success',
                duration: 2000,
            });
            location.reload();
        },
        setWidth(width) {
            writeSetting("width", width);
            this.$notify({
                title: '保存成功',
                message: '设置保存成功',
                type: 'success',
                duration: 2000,
            });
            reload:this.reload;
        },
        setHeigth(heigth) {
            writeSetting('heigth', heigth);
            this.$notify({
                title: '保存成功',
                message: '设置保存成功',
                type: 'success',
                duration: 2000,
            });
            reload:this.reload;
        }
    },
});

// app6 图片显示方式
var Main = {
    data() {
        return {
            fits: fits,
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            span: parseInt(24 / set_info['cols'])
        }
    }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app6')

