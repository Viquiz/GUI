"use strict";

const getQuery = (url:string)=>
{
	let i = url.indexOf('?');
	url = url.substr(i+1);
	let queries = url.split('&');
	let query_obj = queries.reduce((acc: any,curr:string)=>
	{
		let i = curr.indexOf('=');
		acc[curr.substring(0,i)] = curr.substr(i+1);
		return acc;
	},{});
	return query_obj;
}


