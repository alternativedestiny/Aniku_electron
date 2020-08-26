const { Menu, BrowserWindow } = require('electron')

var templete = [
    {
        label: '菜单',
        submenu: [
            {
                label: '设置',
                accelerator: 'ctrl+n',  // 快捷键
                click: () => {
                    
                }
            },
            { label: '保存' }
        ]
    },
    {
        label: '菜单',
        submenu: [
            { label: '设置' },
            { label: '保存' }
        ]
    }
]

let m = Menu.buildFromTemplate(templete)

Menu.setApplicationMenu(m)
