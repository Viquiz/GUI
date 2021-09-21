import React, { useCallback, useEffect, useState } from 'react';


export function useAsync(callback:any, dependencies= []){

	const [loading, setLoading] = useState(true);
	const [trigger,setTrigger] = useState(false);
	const [value, setValue] = useState();
	const [error, setError] = useState();
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
	return {loading,error,value,trigger:()=>{setTrigger(!trigger)}}
}