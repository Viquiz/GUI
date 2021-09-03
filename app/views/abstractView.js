export default class{
	constructor(){}
	setTitle(_title)
	{
		let title  = document.getElementById("title");
		let default_title = 'Viquiz';
		title.innerText = _title + ' - ' + default_title;
	}
}