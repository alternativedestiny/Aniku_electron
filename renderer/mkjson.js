const fs = require('fs');

// 全局变量
let folder = 'D:/PersonalProject/Aniku_electron/cache/images/'
let data_path = __dirname + '/../cache/'

// 读取csv文件, 输入文件路径, 输出二维数组
function read_csv() {
    let data = fs.readFileSync(data_path + 'index.csv', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        return data;
    })
    // console.log(data);
    let list = data.split('\r\n');  // 按行分割

    let csv_array = new Array();    // 创建二维数组
    for (let i = 0; i < list.length; i++) {
        csv_array[i] = new Array();
        let row = list[i].split(',');   // csv行数据分割
        for (let j = 0; j < row.length; j++) {
            csv_array[i][j] = row[j];
        }
    }
    return csv_array;
}

function update_index() {
    let ani_list = [];
    let flist = fs.readFileSync(folder);
    for (let i = 0; i < flist.length; i++) {
        if (fs.lstatSync(flist[i]).isFile()) {  // 判断文件/文件夹
            console.log(flist[i] + '是文件');
            // folder_list.push(flist[i]);
        } else {
            console.log(flist[i] + '是文件夹');
            ani_list.push(flist[i]);
            
        }
        
    }
}

function show_csv(data) {
    for (let i = 0; i < data.length; i++) {
        console.log("IndexName: " + data[i][0]);
    }
}

let data = read_csv();
show_csv(data);

// function add_json(folder) {
//     let flist = fs.readdirSync(folder);
//     let folder_list = [];
//     for (let i = 0; i < flist.length; i++) {
//         if (fs.lstatSync(flist[i]).isFile()) {
//             console.log(flist[i] + '是文件');
//             folder_list.push(flist[i]);
//         } else {
//             console.log(flist[i] + '是文件夹');
//         }
//     }

//     for (let i = 0; i < folder_list.length; i++) {
//         let index = fs.readFileSync(__dirname + fname, 'utf-8', (err, data) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             return data;
//         });
//         index = JSON.parse(index);
//         let data = {
//             name: folder_list[i],
//             path: __dirname + "/" + folder_list[i],
//             type: "电影",
//             homepage: false,
//             comment: ""
//         };

//         index.list.push(data);
//         var t = JSON.stringify(index, "", "\t");
//         fs.writeFileSync(__dirname + fname, t);
//     }
// }
// function read_index() {
//     let index_data = fs.readFileSync(__dirname + fname, 'utf-8', (err, data) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//     })

//     let a1 = JSON.parse(index_data);
//     let name_list = [];
//     let path_list = [];

//     for (let i = 0; i < a1.list.length; i++) {
//         name_list.push(a1.list[i].name);
//         path_list.push(a1.list[i].path);
//         console.log(a1.list[i].name);
//     }
// }

