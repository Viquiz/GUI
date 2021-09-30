import React, { useCallback, useEffect, useRef, useState } from 'react';


export function useAsync<T>(callback:() => Promise<T>,defaultValue?:T, dependencies:any[] = [] as any[]){

	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState<T|undefined>(defaultValue);
	const [error, setError] = useState(undefined);
	const callbackMemorize = useCallback(()=>{
		setLoading(true);
		setValue(undefined);
		setError(undefined);
		callback()
			.then(setValue)
			.catch(setError)
			.finally(()=>setLoading(false))
	},dependencies)
	useEffect(()=>{
		callbackMemorize()
	},[callbackMemorize])
	return {loading,error,value}
}



export function useAsyncPreValue<T>(callback:() => Promise<T>,defaultValue?:T, dependencies:any[]= []){

	const [loading, setLoading] = useState(true);
	const [trigger,setTrigger] = useState(false);
	const [value, setValue] = useState<T|undefined>(defaultValue);
	const [error, setError] = useState(undefined);
	const callbackMemorize = useCallback(()=>{
		setLoading(true);
		setError(undefined);
		//this function prevent setting value to undefined 
		//because every time we set value to undefine the previous rendered component might by remove then create (which cause multiple render of un-change component)
		callback()
			.then(setValue)
			.catch(setError)
			.finally(()=>setLoading(false))
	},dependencies)
	useEffect(()=>{
		callbackMemorize()
	},[callbackMemorize,trigger])
	return {loading,error,value,trigger:callbackMemorize}
}
function clamp(min:number,max:number,value:number)
{
	if (value < min)
		return max;
	if (value > max)
		return min;
	return value;
}
export function useToggle<T>(state:T[]):[T,()=>void]{

	const [value, toggleValue] = useState<T>(state[0]);
	const c_state = useRef<number>(0);
	function NextValue(){
		c_state.current = clamp(0,state.length-1,c_state.current+1);
		toggleValue(state[c_state.current]);
		console.log(c_state)
	}
	return [value,NextValue]
	
}