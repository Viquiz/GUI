
let is_maximize = false;
(()=>
{
	let maximize = document.getElementById('maximize-btn');
	let unmaximize = document.getElementById('unmaximize-btn');
	let minimize = document.getElementById('minimize-btn');
	let close = document.getElementById('close-btn');
	maximize.addEventListener("click",(EV)=>
	{
		maximize.classList.add('hidden');
		unmaximize.classList.remove('hidden');
		is_maximize = true;
		window.BrowserWindows.maximize();
	});
	unmaximize.addEventListener("click",(EV)=>
	{
		unmaximize.classList.add('hidden');
		maximize.classList.remove('hidden');
		is_maximize = false;
		window.BrowserWindows.maximize();
	});
	minimize.addEventListener("click",(EV)=>
	{
		window.BrowserWindows.minimize();
	});
	close.addEventListener("click",(EV)=>
	{
		window.BrowserWindows.close();
	});

	
	window.addEventListener("resize",(EV)=>
	{
		if(is_maximize)
		{
			unmaximize.classList.add('hidden');
			maximize.classList.remove('hidden');
			return;
		}
		maximize.classList.add('hidden');
		unmaximize.classList.remove('hidden');
	});
})();
