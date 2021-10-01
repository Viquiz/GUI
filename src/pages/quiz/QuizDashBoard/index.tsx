import React, { useEffect, useState } from "react";
import {getQuestionsByQuestionSet, getQuestionSet, putQuestion, putQuestionSet, Question, QuestionSet } from "../../../database";
import { useAsyncPreValue } from "@common/customHook";
import {QuestionCard,QuestionEditor} from "@components/QuestionCard";
import { omit, values } from "@fluentui/utilities";
import { ModalWrapper } from "@components/Modal";
import { Button } from "@components/button";
import { TextField } from "@fluentui/react";
import { useValueDebounce } from "@common/customHook";
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

interface Quiz extends Omit<QuestionSet,'id'|'_rev'>{};

interface QuizData{
    Quiz:QuestionSet,
    Questions:Question[]
}

const QuizDashBoard: React.FC<PROPS> = (props) => {
    const [value,setValue] = useState<QuizData|null>(null);
    const [mode,setMode] = useState<number>(-1);
    const  debounceValue = useValueDebounce(value,1000);
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
                <div>
                    <TextField value={value?.Quiz.title ?? ''} onChange={(evt)=>{
                        setTitle(evt.currentTarget.value);
                    }}/>
                    <TextField value={value?.Quiz.Class ?? ''} onChange={(evt)=>{
                        setClass(evt.currentTarget.value);
                    }}/>
                    <TextField value={value?.Quiz.description ?? ''} onChange={(evt)=>{
                        setDescription(evt.currentTarget.value);
                    }}/>
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
                await  putQuestion(value);
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
