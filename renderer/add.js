const fs = require("fs");
const path = require("path");
const { dialog } = require("electron").remote;

// 读取json配置文件
var index = fs.readFileSync("./cache/index.json", 'utf-8', function (err, data) {
    if (err) {
        console.log("Read file error!");
        console.log(err.message);
    } else {
        console.log("Read file success.");
        // console.log(data);
        return data;
    }
});
// json数据格式化
index = JSON.parse(index);

// JSON数据写入
function jsonWrite(data) {
    index.list.push(data);
    var t = JSON.stringify(index, "", "\t");
    fs.writeFileSync('./cache/index.json', t);
}

// 读取文件列表
function listDir(path, ftypes) {
    let list = fs.readdirSync(path);
    if (list.length == 0) {
        console.log("read file error!");
    }
    // console.log(list.length);
    for (let i = 0; i < list.length; i++) {
        console.log(list[i]);
    }
}

new Vue({
    el: form,
    data: {
        form: {
            name: "",
            path: "",
            type: "电影",
            ftypes: ['rmvb', 'mp4'],
            file_type: ['rmvb', 'mp4', 'avi', 'mkv', 'jpg', 'png'],
            homepage: false,
            comment: ""
        },
        value: false,
        rules: {
            name: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
            ],
            path: [
                { required: true, message: "请选择文件路径", trigger: "blur" },
                { min: 2, trigger: "blur" }
            ]
        },
    },
    methods: {
        seletFolder() {
            // 选择文件/文件夹
            dialog.showOpenDialog({
                title: "选择文件夹",
                // defaultPath: "./cache/",
                buttonLabel: "选择文件夹",
                properties: ["openDirectory"]
            }).then(result => {
                this.form.path = result.filePaths[0];
                // console.log(form.path);
            }).catch(err => {
                console.log(err);
            })
        },
        onSubmit() {
            if (this.form.name == "") {  // 检测有没有输入文件名
                dialog.showMessageBox({
                    type: "warning",
                    title: "信息不全",
                    message: "请输入项目名"
                });
            } else if (this.form.path == "") {  // 检测有没有选择路径
                dialog.showMessageBox({
                    type: "warning",
                    title: "信息不全",
                    message: "请选择文件夹路径"
                });
            } else {  // 生成并保存json文件
                // 创建数据
                let data = {
                    name: this.form.name,
                    path: this.form.path,
                    type: this.form.type,
                    ftypes: this.form.ftypes,
                    homepage: this.form.homepage,
                    comment: this.form.comment
                };
                // 写入json
                jsonWrite(data);

                this.$notify({
                    title: "创建成功",
                    message: "正在读取文件列表...",
                    type: "success",
                    duration: 1000,
                });

                // 读取文件列表
                listDir(this.form.path);

                this.$notify({
                    title: "创建成功",
                    message: "创建 <" + this.form.name + "> 成功, 2s后窗口自动关闭",
                    type: "success",
                    duration: 2000,
                });

                // setTimeout(function () { window.close(); }, 2000);
            }
        },
        cancel() {
            window.close();
        }
    }
})