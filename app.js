const {app, BrowserWindow, ipcMain} = require("electron");
const Driver = require("./PCDriver");
const path = require("path")
const static_file  ="app";




let win = null;
app.whenReady().then(() => {
	win = new BrowserWindow({
		webPreferences:{
			preload:path.join(__dirname,static_file,'preload.js')
		},
		autoHideMenuBar: true
	});
	win.loadURL(`file://${__dirname}/app/index.html`);	
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