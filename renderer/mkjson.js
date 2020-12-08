const fs = require('fs')

// 全局变量
let folder = 'D:/PersonalProject/Aniku_electron/cache/images/'
let fname = '/../cache/index.csv'

function read_folder() {
    let flist = fs.readdirSync(folder);
    for (let i = 0; i < flist.length; i++) {
        console.log(flist[i]);
    }
}

function read_index() {
    let folder_list = [];
    fs.readFile(__dirname + fname, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // console.log(data.toString());
        let list = data.split('\r\n');
        for (let xx in list) {
            console.log(list[xx]);
        }
    })
}

read_folder();
// read_index();
