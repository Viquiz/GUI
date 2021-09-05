"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var window;
var static_file = "static";
electron_1.app.whenReady().then(function () {
    window = new electron_1.BrowserWindow({
        show: false,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, static_file, 'preload.js'),
            devTools: true
        },
        autoHideMenuBar: true
    });
    window.loadFile(path.join(__dirname, static_file, "index.html"), { query: { views: "home" } });
    window.once("ready-to-show", function () {
        window.show();
    });
    electron_1.globalShortcut.register('f5', function () {
        console.log('f5 is pressed');
        window.reload();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
    electron_1.globalShortcut.unregisterAll();
});
electron_1.ipcMain.on("message", function (event, args) {
    console.log(Buffer.from(args["msg"]));
});
electron_1.ipcMain.on('maximize', function () {
    if (window.isMaximized()) {
        window.unmaximize();
    }
    else {
        window.maximize();
    }
});
electron_1.ipcMain.on('minimize', function () {
    window.minimize();
});
electron_1.ipcMain.on('close', function () {
    window.close();
});
