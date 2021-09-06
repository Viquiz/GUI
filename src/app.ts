import {app, BrowserWindow, ipcMain, globalShortcut} from "electron";
import path = require("path");

let window:BrowserWindow;
const static_file = "static";

app.whenReady().then(() => {
	window = new BrowserWindow({
		show:false,
		frame:false,
		webPreferences:{
			preload:path.join(__dirname,static_file,'preload.js'),
			devTools: true
		},
		autoHideMenuBar: true
	});
	window.loadFile(path.join(__dirname,static_file,"index.html"),{query: {views:"home"}});	
	window.once("ready-to-show",()=>
	{
		window.show();
	})
	globalShortcut.register('f5', function() {
		console.log('f5 is pressed')
		window.reload()
	})
	
	
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
	globalShortcut.unregisterAll();
});


ipcMain.on("message",(event,args)=>
{
	console.log(Buffer.from(args["msg"]));
});




ipcMain.on('maximize',()=>
{
	if(window.isMaximized())
	{
		window.unmaximize();
	}
	else{
		window.maximize();
	}
});
ipcMain.on('minimize',()=>
{
	window.minimize();
});
ipcMain.on('close',()=>
{
	window.close();
});


