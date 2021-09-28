import React, { useCallback, useEffect, useState } from 'react';


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