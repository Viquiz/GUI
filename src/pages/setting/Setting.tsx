import React from 'react'
import { Route } from 'react-router-dom'
import Button from '../../components/button/button'

export default function Setting(props:any) {
	console.log(props.match.url)
	return (
		<Button/>
	)
}
