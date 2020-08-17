var fs = require('fs');

window.onload = function () {
    var btn = this.document.querySelector('#open')
    var mybaby = this.document.querySelector('#txt')
    btn.onclick = function () {
        fs.readFile('test.txt', (err, data) => {
            mybaby.innerHTML = data
        })
    }
} 