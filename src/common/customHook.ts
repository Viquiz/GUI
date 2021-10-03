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
	const callbackMemorize = useCallback((unmounted:boolean)=>{
		if(unmounted){
			setLoading(true);
		setError(undefined);
		console.log('loading')
		//this function prevent setting value to undefined 
		//because every time we set value to undefine the previous rendered component might by remove then create (which cause multiple render of un-change component)
		callback()
			.then((v)=>unmounted?setValue(v):{})
			.catch((v)=>unmounted?setError(v):{})
			.finally(()=>unmounted?setLoading(false):{})
		}
		
	},dependencies)
	useEffect(()=>{
		let unmounted = true;
		callbackMemorize(unmounted);
		return ()=> {unmounted = false};
	},[callbackMemorize,trigger])
	return {loading,error,value,trigger:()=>setTrigger(v=>!v)}
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

export function useValueDebounce<T>(value:T, delay:number) {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(
	  () => {
	    // Update debounced value after delay
	    const handler = setTimeout(() => {
	      setDebouncedValue(value);
	    }, delay);
	    // Cancel the timeout if value changes (also on delay change or unmount)
	    // This is how we prevent debounced value from updating if value is changed ...
	    // .. within the delay period. Timeout gets cleared and restarted.
	    return () => {
	      clearTimeout(handler);
	    };
	  },
	  [value, delay] // Only re-call effect if value or delay changes
	);
	return debouncedValue;
}

function usePrevious<T>(value:T) {
	// The ref object is a generic container whose current property is mutable ...
	// ... and can hold any value, similar to an instance property on a class
	const ref = useRef<T>();
	// Store current value in ref
	useEffect(() => {
	  ref.current = value;
	}, [value]); // Only re-run if value changes
	// Return previous value (happens before update in useEffect above)
	return ref.current;
 }

