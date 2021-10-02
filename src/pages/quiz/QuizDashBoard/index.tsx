import React, { useEffect, useMemo, useState } from "react";
import {getQuestionsByQuestionSet, getQuestionSet, putQuestion, putQuestionSet, Question, QuestionSet } from "../../../database";
import { useAsyncPreValue } from "@common/customHook";
import {QuestionCard,QuestionEditor} from "@components/QuestionCard";
import { omit, values } from "@fluentui/utilities";
import { ModalWrapper } from "@components/Modal";
import { Button } from "@components/button";
import { CommandBar, DefaultButton, Depths, Separator, Stack, StackItem, TextField } from "@fluentui/react";
import { useValueDebounce } from "@common/customHook";
import { MultilineEditableField, SingleLineEditableField } from "@components/EditableField";
import { useHistory } from "react-router";
import { addIcon } from "@common/icon";
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
    const lastEdit = useMemo(() =>{
        const date = new Date(value?.Quiz.edit ?? Date.now());
        return `${date.toLocaleDateString('vi')} - ${date.toLocaleTimeString('vi')}`;
    }, [value?.Quiz.edit])
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
                console.log('saving');
                let response = await putQuestionSet({...debounceValue.Quiz,edit:Date.now()});
                setValue((value) => {
                    console.log('saved');
                    return {...value,Quiz:{...value?.Quiz,_rev:response.rev,edit:Date.now()}} as QuizData
                });
            }
        })();
        return ()=>{
            //clean up code
        }
    },[debounceValue?.Quiz.title,debounceValue?.Quiz.description,debounceValue?.Quiz.Class,debounceValue?.Quiz.questions])

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
        console.log('add question')
        const template  = CreateQuestionTemplate();
        template._id = String(Date.now());
        let response = await putQuestion(template);
        if(response.ok)
            {
                template._rev = response.rev;
                setValue((v)=>{
                    let arr:Question[] = [...(v?.Questions?? [])];
                    arr.push(template);
                    const v2 = {...v?.Quiz}
                    const k = new Set(v2.questions as string[]);
                    k.add(template._id);
                    v2.questions = [...k]
                    return {Quiz:v2,Questions:arr} as QuizData;
                })
            }
    }
    async function DeleteQuestion(id:string){ 
            setValue((v)=>{
                const v2 = {...v?.Quiz,questions:(v?.Quiz.questions as string[]).filter(item => item !== id)} as QuestionSet;
                return {Questions:value?.Questions.filter(item => item._id !== id),Quiz:v2} as QuizData;
            })
    }
    
    if(mode < 0)
    {
        return (
            <div className="w-full h-full flex flex-col">
                
                {/* <Stack className='w-full min-h-14 ms-depth-16 flex justify-between flex-col' style={{boxShadow:Depths.depth8}}> */}
                <Stack style={{boxShadow:Depths.depth8}}>
                            <Stack horizontal>
                                <Stack.Item grow style={{width:'800px'}}>
                                    <div className="w-800px overflow-hidden m-2">
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
                                             } }/>
                                        </div>
                                    <MultilineEditableField
                                    className={`
                                    block
                                    ml-4
                                    p-2
                                    h-14
                                    w-800px
                                    resize-none
                                    text-md
                                    outline-none
                                    hover:underline
                                    border
                                    border-transparent
                                    hover:border-gray-900
                                    focus:border-button-primary
                                    `}
                                    value={value?.Quiz.description}
                                    onChange={function (evt){
                                        setDescription(evt.target.value);
                                     } }/>
                                </Stack.Item>
                                <Stack.Item grow align="start">
                               
                                    <div className="flex justify-start items-center text-lg">
                                        <span className='pb-2 font-extrabold'>Class:</span>
                                        <span className="inline-block w-28 overflow-hidden">
                                                    <SingleLineEditableField
                                        
                                                    className={`
                                                    
                                        
                                                    overflow-hidden
                                                    rounded-md
                                                    border-2
                                                    border-transparent
                                                    focus-within:border-button-primary
                                                    hover:border-gray-500
                                                    max-w-full`}
                                                    value={value?.Quiz.Class}
                                                    onChange={function (evt){
                                                        setClass(evt.target.value);
                                                     } }/>
                                        </span>
                                    </div>
                                    <div className="flex justify-start items-center text-lg">
                                        <span className='font-extrabold mr-2'>{`Last edit:   `}</span>{lastEdit}
                                    </div>
                                </Stack.Item>
                            </Stack>
                                 <CommandBar
                                 styles={{root:{borderBottom:'',borderTop:''}}}
                                 items={[
                                     {
                                        key: 'play',
                                        text: 'PLAY',
                                        iconProps: { iconName: 'Play'},
                                        onClick: () => {history.push(`/GamePlay1/${props.match.params.id}`)},
                                        }]}></CommandBar>
                            
                </Stack>
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
                    {!value?.Questions.length && 
                            <Separator>
                                    <DefaultButton text='ADD QUESTION' iconProps={addIcon}
                                    onClick={AddQuestion}/>
                            </Separator>}
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
