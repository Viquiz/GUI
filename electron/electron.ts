import {app, BrowserWindow, globalShortcut, ipcMain} from "electron";
import path from "path";
// import websql from 'websql';

// var db = websql('mydb.db', '1.0', 'description', 1);

let window:BrowserWindow;

app.whenReady().then(() => {
	window = new BrowserWindow({
		show:false,
		frame:false,
		//resizable:false,
		webPreferences:{
			preload:path.join(__dirname,'preload.js'),
			devTools: true
		},
		autoHideMenuBar: true
	});
	window.loadURL("http://localhost:11234");
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
	globalShortcut.unregisterAll();
	if (process.platform !== 'darwin') app.quit()
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

