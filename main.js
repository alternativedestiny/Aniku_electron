// Modules to control application life and create native browser window
const { app, BrowserWindow, screen, Menu } = require('electron')
const path = require('path');
const { settings } = require('cluster');
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

function createWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  // console.log(width, height);
  w_list = [0, 800, 1366, 1920, 2160, width];
  h_list = [0, 600, 768, 1080, 1440, height];

  // console.log(width, height);
  const mainWindow = new BrowserWindow({
    width: w_list[set_info['window']],
    height: h_list[set_info['window']],
    webPreferences: {
      nodeIntegration: true,  // 增加全局使用node.js
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  let homepage = '01-index.html'
  // if (1) {
  //   homepage = 'test.html'
  // }
  // and load the index.html of the app.
  mainWindow.loadFile(homepage)
  // mainWindow.webContents.openDevTools(); // 调试窗口

  return mainWindow;
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  mainWindow = createWindow()
  // require('./static/menu.js')  // 菜单栏
  var templete = [
    {
      label: '菜单',
      submenu: [
        {
          label: '首页',
          accelerator: 'ctrl+h',
          click: () => {
            mainWindow.loadFile('01-index.html');
          }
        },
        {
          label: '设置',
          accelerator: 'ctrl+n',  // 快捷键
          click: () => {
            mainWindow.loadFile('02-setting.html');
          }
        },
        {
          label: '调试',
          accelerator: 'ctrl+d',  // 快捷键
          click: () => {
            mainWindow.webContents.openDevTools();
          }
        },
        {
          label: '刷新',
          accelerator: 'f5',  // 快捷键
          click: () => {
            mainWindow.reload();
          }
        },
        { label: '保存' }
      ]
    },
    {
      label: '首页',
      accelerator: 'ctrl+h',
      click: () => {
        mainWindow.loadFile('01-index.html');
      }
    },
    {
      label: '设置',
      accelerator: 'ctrl+n',  // 快捷键
      click: () => {
        mainWindow.loadFile('02-setting.html');
      }
    },
    {
      label: '增加',  // 调试用, 在主界面打开
      click: () => {
        mainWindow.loadFile('03-add.html');
      }
    },
    // {
    //   label: '增加',  // 实际用, 新建窗口打开
    //   click: () => {
    //     newWindow = new BrowserWindow({
    //       webPreferences: {
    //         nodeIntegration: true,  // 增加全局使用node.js
    //         enableRemoteModule: true,
    //         preload: path.join(__dirname, 'preload.js')
    //       }
    //     })
    //     newWindow.loadFile('03-add.html');
    //   }
    // },
    {
      label: '测试',
      accelerator: 'ctrl+t',  // 快捷键
      click: () => {
        mainWindow.loadFile('test.html');
      }
    }
  ]

  let m = Menu.buildFromTemplate(templete)

  Menu.setApplicationMenu(m)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
