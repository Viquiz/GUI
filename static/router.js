//@ts-check
"use strict";
const loader_skeleton = document.createElement("div");
loader_skeleton.classList.add("content--loader");
const content_view = document.getElementById("view");


const getQuery = (url)=>
{
	if(typeof(url) !== "string")
		throw TypeError(`Expected String - recieved ${typeof(url)}`);
	let i = url.indexOf('?');
	url = url.substr(i+1);
	let queries = url.split('&');
	let query_obj = queries.reduce((acc,curr)=>
	{
		let i = curr.indexOf('=');
		acc[curr.substring(0,i)] = curr.substr(i+1);
		return acc;
	},{});
	return query_obj;
}