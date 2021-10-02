import React, { useEffect, useState } from "react";
import {getQuestionsByQuestionSet, getQuestionSet, putQuestion, putQuestionSet, Question, QuestionSet } from "../../../database";
import { useAsyncPreValue } from "@common/customHook";
import {QuestionCard,QuestionEditor} from "@components/QuestionCard";
import { omit, values } from "@fluentui/utilities";
import { ModalWrapper } from "@components/Modal";
import { Button } from "@components/button";
import { CommandBar, TextField } from "@fluentui/react";
import { useValueDebounce } from "@common/customHook";
import { MultilineEditableField, SingleLineEditableField } from "@components/EditableField";
import { useHistory } from "react-router";
type PROPS = {
    t: string;
    [k: string]: any;
};

export interface MatchParams {
    id: string;
}


function CreateQuestionTemplate():Question{
    let template: Question = {
        _id: '',
        img: "",
        title: "New question",
        answers: [{text:'answer 1',isCorrect:true},{text:'answer 2',isCorrect:false}],
        create: "",
        edit: "",
        gameMode: "",
    };
    return template
};



interface QuizData{
    Quiz:QuestionSet,
    Questions:Question[]
}

const QuizDashBoard: React.FC<PROPS> = (props) => {
    const [value,setValue] = useState<QuizData|null>(null);
    const [mode,setMode] = useState<number>(-1);
    const  debounceValue = useValueDebounce(value,1000);
    const history = useHistory();
    //get question set
    //mode  => preview - edit
    //edit mode show Question editor with question gallery
    // add question
    useEffect(()=>{
        //top level async
        (async function(){
            const data = await getQuestionsByQuestionSet(props.match.params.id) as QuizData;
            setValue(data);
        })();
        return ()=>{
            //clean up code
        }
    },[])
    useEffect(()=>{
        //top level async
        (async function(){
            if(debounceValue && debounceValue.Quiz)
            {
                let response = await putQuestionSet({...debounceValue.Quiz,edit:new Date().toJSON()});
                console.log(response);
                setValue((value) => {
                    return {...value,Quiz:{...value?.Quiz,_rev:response.rev,edit:new Date().toJSON()}} as QuizData
                });
            }
        })();
        return ()=>{
            //clean up code
        }
    },[debounceValue?.Quiz.title,debounceValue?.Quiz.description,debounceValue?.Quiz.Class])

    function setTitle(_value:string){
        setValue(value => ({
            ...value,Quiz:{...value?.Quiz,title:_value}
        } as QuizData))
    }
    function setDescription(_value:string){
        setValue(value => ({
            ...value,Quiz:{...value?.Quiz,description:_value}
        } as QuizData))
    }
    function setClass(_value:string){
        setValue(value => ({
            ...value,Quiz:{...value?.Quiz,Class:_value}
        } as QuizData))
    }
    async function AddQuestion(){
    
    }
    async function DeleteQuestion(id:string){

    }
    if(mode < 0)
    {
        return (
            <div className="w-full h-full flex flex-col">
                <div className='w-full flex flex-col justify-start items-start min-h-14 p-2'>
                                <div className="w-800px overflow-hidden flex justify-start">
                                    <SingleLineEditableField
                                    
                                    className={`
                                    overflow-hidden
                                    rounded-md
                                    border-2
                                    border-transparent
                                    focus-within:border-button-primary
                                    hover:border-gray-500
                                    font-extrabold
                                    max-w-full
                                    text-4xl`}
                                    value={value?.Quiz.title}
                                    onChange={function (evt){
                                        setTitle(evt.target.value);
                                     } }></SingleLineEditableField>
                                </div>
                            <MultilineEditableField
                            className={`
                            block
                            p-2
                            h-14
                            w-800px
                            resize-none 
                            text-md
                            outline-none 
                            hover:underline
                            `}
                            value={value?.Quiz.description}
                            onChange={function (evt){
                                setDescription(evt.target.value);
                             } }></MultilineEditableField>
                             <CommandBar 
                             items={[
                                 {
                                    key: 'play',
                                    text: 'PLAY',
                                    iconProps: { iconName: 'Play'},
                                    onClick: () => {history.push(`/GamePlay1/${props.match.params.id}`)},
                                    }]}></CommandBar>
                </div>
                <div className="flex justify-items-start items-center content-start flex-col w-full flex-grow  overflow-y-scroll">
                    {value?.Questions.map((value,index)=> <QuestionCard key={value._id} question={value} onSave={function (question: Question): void {
                        throw new Error("Function not implemented.");
                    } } onAdd={function (): void {
                        AddQuestion();
                    } } onDelete={function (): void {
                        DeleteQuestion(value._id);
                    } } onEnterEdit={function (): void {
                        setMode(index);
                    } }/>
                    )}
                    <Button onClick={AddQuestion} className="h-14 w-56 bg-button-primary fixed bottom-0 right-0"></Button>
                </div>
            </div>
                )
    }
    return (
         <div className="w-full h-full relative">
             <QuestionEditor 
                     onSave={async function (value: Question) {
                            const response = await  putQuestion(value);
                            setValue(v =>{
                                const arr = [...(v?.Questions as Question[])]
                                arr[mode] = {...value,_rev:response.rev}
                                return {...v,Questions:arr} as QuizData
                            })
                     } } 
                     onBack={function (): void {
                // pop up modal to check if user wanna save
                // save -> put data into database
                // if not -> do nothing and return to mode  -1 (main dashboard)
                setMode(-1);
                     } } 
                question={value?.Questions[mode] as Question}/>
        
         </div>
        //add gallery to choose which question to edit
    );
};

export default QuizDashBoard;
