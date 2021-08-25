function docReady(callback) {
	// see if DOM is already available
	if (document.readyState === "complete" || document.readyState === "interactive") {
	    // call on next available tick
	    setTimeout(callback, 1);
	} else {
	    document.addEventListener("DOMContentLoaded", callback);
	}
}    


docReady(()=>
{
	let maximize = document.getElementById('maximize-btn');
	let unmaximize = document.getElementById('unmaximize-btn');
	let minimize = document.getElementById('minimize-btn');
	let close = document.getElementById('close-btn');
	maximize.addEventListener("click",(EV)=>
	{
		maximize.classList.add('hidden');
		unmaximize.classList.remove('hidden');
		window.BrowserWindows.maximize();
	});
	unmaximize.addEventListener("click",(EV)=>
	{
		unmaximize.classList.add('hidden');
		maximize.classList.remove('hidden');
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
});