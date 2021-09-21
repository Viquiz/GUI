import React, { useEffect, useRef, useState } from 'react'
import { FaFilter, FaReact } from 'react-icons/fa'
import {Button} from '@components/button'
import {DropDown,DropDownItems} from '@components/DropDownButton'
import {ToggleButton} from '@components/ToggleButton'
import { SearchBox } from '@components/SearchBox'
import { CheckBox } from '@components/CheckBox'
import { QuestionCard  } from '@components/QuestionCard'

const items:any =[{
	icon:FaFilter,
	text:"filter"
},
{
	icon:FaReact,
	text:"Test"
},]

export default function Setting(props:any) {

	return (<div className="align-top w-full overflow-y-scroll h-full">
		
		
		</div>
	)
}
