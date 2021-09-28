import React, { useEffect, useState } from "react";
import {getQuestionsByQuestionSet, getQuestionSet, putQuestion, putQuestionSet, Question, QuestionSet } from "../../../database";
import { useAsyncPreValue } from "@common/customHook";
import {QuestionCard,QuestionEditor} from "@components/QuestionCard";
import { values } from "@fluentui/utilities";
import { ModalWrapper } from "@components/Modal";
import { Button } from "@components/button";
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

type MODE = 'PREVIEW'|'EDIT';

const QuizDashBoard: React.FC<PROPS> = (props) => {
    const {loading,value,error,trigger} = useAsyncPreValue(async function (){ 
        return await getQuestionsByQuestionSet(props.match.params.id);
    }
    ,undefined,[props.match.params.id])
    const [mode,setMode] = useState<number>(-1);
    //get question set
    //mode  => preview - edit
    //edit mode show Question editor with question gallery
    // add question

    async function AddQuestion(){
        //generate a template Question
        //add to database
        //add current question id to current Set
        const template = CreateQuestionTemplate();
        try{
            template.title = "Click Here to edit question"
            template._id = String(new Date().getTime());
            const Quiz = value?.Quiz as QuestionSet;
            await putQuestion(template);
            await putQuestionSet({...Quiz,questions:[...(Quiz.questions as string[]),template._id]})
            trigger()
        }
        catch(error)
        {
            console.error(error)
        }
    }
    async function DeleteQuestion(id:string){
        //filter id out of question array
        try{
            const Quiz = value?.Quiz as QuestionSet;
            const questions = (Quiz.questions as string[]).filter(item => item != id)
            await putQuestionSet({...Quiz,questions:questions})
            trigger()
        }
        catch(error)
        {
            console.error(error)
        }
    }
    if(mode < 0)
    {
        return (
            <div className="flex justify-items-start items-center flex-col w-full min-h-full max-h-full  overflow-y-scroll">
                {value?.Questions.map((value,index)=> <QuestionCard key={value._id} question={value} onSave={function (question: Question): void {
                    throw new Error("Function not implemented.");
                } } onAdd={function (): void {
                    setMode(index);
                } } onDelete={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
                )}
                <Button onClick={AddQuestion} className="h-14 w-56 bg-button-primary fixed bottom-0 right-0"></Button>
            </div>
                )
    }
    return (
         <QuestionEditor 
        onSave={async function (value: Question) {
            await  putQuestion(value);
            trigger();
        } } 
        onBack={function (): void {

            // pop up modal to check if user wanna save
            // save -> put data into database
            // if not -> do nothing and return to mode  -1 (main dashboard)
            setMode(-1);
        } } 
        question={value?.Questions[mode] as Question}/>
        //add gallery to choose which question to edit
    );
};

export default QuizDashBoard;
