

function* integerGenerator()
{
	let id:number = 0;
	while(true)
	{
		yield id++;
	}
}

export {integerGenerator}