const { contextBridge, ipcRenderer }  = require('electron')

contextBridge.exposeInMainWorld('Driver_API',{
	GetDeviceList: ()=> {
			return ipcRenderer.invoke("getDevices");
	},
	SendToDevice:(device_id,message) =>
	{
		ipcRenderer.send("message",{device_id:device_id,msg:message});
	}
})
contextBridge.exposeInMainWorld('BrowserWindows',{
	maximize: ()=> {
			ipcRenderer.send('maximize');
	},
	minimize:() =>
	{
		ipcRenderer.send("minimize");
	},
	close:()=>{
		ipcRenderer.send("close");
	}
})