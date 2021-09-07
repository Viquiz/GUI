import {ipcRenderer,contextBridge} from "electron";
contextBridge.exposeInMainWorld('Driver_API',{
	GetDeviceList: ()=> {
			return ipcRenderer.invoke("getDevices");
	},
	SendToDevice:(device_id:string ,message:string) =>
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