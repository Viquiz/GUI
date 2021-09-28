import React, { useEffect, useState } from 'react'

function ModalWrapper(PROPS:any) {
	const [show,setShow] = useState(true)
	useEffect(()=>{
		return ()=>{
			console.log("unmounted")
		}
	},[])
	return (show?
		<div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-70 z-50" onClick={()=>{
			setShow(false);
		}}>
			{PROPS.children}
		</div>:
		<></>
	)
}

export {ModalWrapper}
