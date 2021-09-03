const {app, BrowserWindow, ipcMain} = require("electron");
const Driver = require("./PCDriver");
const path = require("path")
const static_file  ="app";




let window = null;

app.whenReady().then(() => {
	window = new BrowserWindow({
		show:false,
		frame:false,
		webPreferences:{
			preload:path.join(__dirname,static_file,'preload.js')
		},
		autoHideMenuBar: true
	});
	window.loadFile(path.join(__dirname,"app","index.html"),{query: {views:"lib"}});	
	window.once("ready-to-show",()=>
	{
		window.show();
	})
	
	
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
});


ipcMain.handle('getDevices',()=>
{
	return Driver.device_list();
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


