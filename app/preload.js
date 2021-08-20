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