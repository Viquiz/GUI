import {app, BrowserWindow, globalShortcut, ipcMain} from "electron";
import path from "path";

let window:BrowserWindow;

app.whenReady().then(() => {
	window = new BrowserWindow({
		minWidth:900,
		minHeight:500,
		show:false,
		frame:false,
		webPreferences:{
			preload:path.join(__dirname,'preload.js'),
			devTools: true
		},
		autoHideMenuBar: true
	});
	window.loadURL(`http://localhost:13125`);
	window.once("ready-to-show",()=>
	{
		window.show();
	})
	globalShortcut.register('f5', function() {
		window.reload();
	})
	window.on("maximize",()=>{
		window.webContents.send("maximize",true);
	})
	window.on("unmaximize",()=>{
		window.webContents.send("maximize",false);
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

