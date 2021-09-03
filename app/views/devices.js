import abstractView from "./abstractView.js";

export default class extends abstractView{
	constructor()
	{
		super();
		this.setTitle('Devices');
	}

	getHTML()
	{
		return new Promise((resolve,reject)=>
		{
			Driver_API.GetDeviceList().then((value)=>
			{
				let result = `
					<p>${value[0].path}</p>
				`;
				resolve(result);
			});
		});
	}
}

