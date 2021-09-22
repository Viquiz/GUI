import React, { useCallback, useEffect, useState } from 'react';


export function useAsync<T>(callback:() => Promise<T>,defaultValue?:T, dependencies= []){

	const [loading, setLoading] = useState(true);
	const [trigger,setTrigger] = useState(false);
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
	},[callbackMemorize,trigger])
	return {loading,error,value,trigger:()=>{setTrigger(!trigger)},setValue}
}
export function useAsyncPreValue<T>(callback:() => Promise<T>,defaultValue?:T, dependencies= []){

	const [loading, setLoading] = useState(true);
	const [trigger,setTrigger] = useState(false);
	const [value, setValue] = useState<T|undefined>(defaultValue);
	const [error, setError] = useState(undefined);
	const callbackMemorize = useCallback(()=>{
		setLoading(true);
		setError(undefined);
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