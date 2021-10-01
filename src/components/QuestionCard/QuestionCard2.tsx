import { addIcon, deleteIcon, editIcon } from "@common/icon";
import { Button } from "@components/button";
import { ButtonBar } from "@components/ButtonBar";
import { DefaultButton, IButtonStyles, IIconProps, IStackStyles, PrimaryButton, Stack } from "@fluentui/react";
import {MdEdit} from "react-icons/md";
import { answer, Question } from "src/database";


interface QuestionCARD_PROPS{
	onEnterEdit: ()=>void
	onAdd: ()=>void
	onDelete: ()=>void
	question:Question
	[key:string]:unknown;
}

const buttonStyles:IButtonStyles = {
	root:{
		position: 'absolute',
		transform: 'translateY(-50%)',
		top: 0,
		right: 15
		
		
	}

}
const buttonStackStyles:IStackStyles = {
	root:{
		position: 'absolute',
		transform: 'translate(-50%,-50%)',
		top: '100%',
		left: '50%'
	}
}
function QuestionCard({question,...props}:QuestionCARD_PROPS){
	

	return (
		<div className="w-800px min-h-24 max-h-24 mx-auto my-6 border border-black rounded-md shadow-lg flex flex-col relative" > 
		<div className="w-full h-22 border-b border-gray-700 p-7 shadow-lg">
		    <b>Câu hỏi:</b>
		    <span>{question.title}</span>
		</div>
		<div className="w-full min-h-0 flex-1 flex justify-start items-stretch p-6 overflow-hidden">
	
			<div className="w-full h-full overflow-y-scroll">
				<div className="w-full h-full grid grid-cols-2 gap-6 z-0">
					    {(question.answers as answer[]).map((item,index)=>{
						    return (
							    <div key={index} className={`text-white p-5 h-20 ${item.isCorrect ? 'bg-green-600':'bg-red-500'}`}>{item.text}
							    </div>
						    );
					    })
					    }
				</div>
			</div>
		</div>
		<DefaultButton styles={buttonStyles} text="Edit" iconProps={editIcon} onClick={props.onEnterEdit}/>
		<Stack horizontal styles={buttonStackStyles}>
			<DefaultButton text="Add" iconProps={addIcon} onClick={props.onAdd}/>
			<DefaultButton styles={{root:{color:'red'},rootHovered:{color:'red'},rootPressed:{color:'red'}}}
			 text="Delete" iconProps={deleteIcon} onClick={props.onDelete}/>
		</Stack>
	</div>);
		
}


export {QuestionCard}