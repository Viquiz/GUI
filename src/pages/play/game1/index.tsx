import { ProcessBar } from "@components/processBar";
import { useAsyncPreValue } from "@common/customHook";
import React, { useEffect, useState } from "react";
import {getQuestionsByQuestionSet, Question} from "../../../database";
import PlayGame1 from "./play"
import TmpResult from "./tmpResult"
import FinalResult from "./finalResult"
import QuestionShow from "./questionShow";
interface GamePlayPROPS {
    [k: string]: any;
}

export interface MatchParams {
    id: string;
}

const GamePlay1: React.FC<GamePlayPROPS> = (props) => {

    const {loading,value,error,trigger} = useAsyncPreValue(async function (){ 
        return await getQuestionsByQuestionSet(props.match.params.id);
    }
    ,undefined,[props.match.params.id])

    let data: Question = {
        _id: "12unknow3",
        title: "a question",
        answers: [{ isCorrect: false, text: "123aaaa ad fdas fa aaaaa sd faaaaa daaa ad aaa", id: 0 }, 
                  { isCorrect: true, text: "345", id: 1 },
                  { isCorrect: false, text: "3 adf ad fsadf a dfa d45", id: 2 },
                  { isCorrect: false, text: "345", id: 3 }
                ],
        create: "",
        edit: "",
        gameMode: "10" //time in seconds
    }

    // let match = useRouteMatch<MatchParams>("/GamePlay1/:id");


    const [countDown, setCountDown] = useState(parseInt(data.gameMode));
    const [questionCount, setQuestionCount] = useState(0); 
    const [showTmpResult, setShowTmpResult] = useState(false);

    const tmpScoreWaitTime = 5;

    useEffect(() => {
        // console.log("not loading db ... ");
        const timer=setTimeout(() => {
            if(countDown > 0)
                setCountDown(countDown-1);
            else if(value !== undefined){
                if(showTmpResult){
                    if(questionCount < value.Questions.length)
                        setQuestionCount(questionCount+1);
                    setCountDown(parseInt(data.gameMode));
                }else{
                    setCountDown(tmpScoreWaitTime); 
                }
                setShowTmpResult(!showTmpResult)
            }
          }, 1000);
          // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

    const randomfc = () =>{
        return Math.floor(Math.random() * (100 + 1));
    }

    return (
        <div className="text-4xl ">
            
            {value?
                (

                /* Play game */
                (questionCount < value.Questions.length && !showTmpResult)? 
                <div className="h-screen w-full">
                    <ProcessBar totalTime={parseInt(data.gameMode)} timeLeft={countDown} color = {(countDown / parseInt(data.gameMode)) * 100}/>
                    <PlayGame1 question={(value?.Questions[questionCount] as Question)}/>
                    <QuestionShow data={(value?.Questions[questionCount] as Question)} showCorrectAnswer = {false}/>
                </div>
                /* Each game result */
                :(questionCount < value.Questions.length)?
                <div className="h-screen w-full">
                    {/* hmm this bar bug ? */}
                    <ProcessBar totalTime={parseInt(data.gameMode)} timeLeft={countDown} color = {(countDown / tmpScoreWaitTime) * 100}/>
                    <TmpResult question={(value?.Questions[questionCount] as Question)} answerResult={
                        (value.Questions[questionCount].answers.length === 4)?[10,30,20,40]
                        :(value.Questions[questionCount].answers.length === 3)?[10,70,20]
                        :(value.Questions[questionCount].answers.length === 2)?[10,90]
                        :[100]
                    }/>
                    <QuestionShow data={(value?.Questions[questionCount] as Question)} showCorrectAnswer={true} />
                </div>

                
                /* final result */
                :
                <FinalResult students = {
                [
                    {name:"Nguyen Thi Buoi", score: randomfc()},
                    {name:"Nguyen Van A", score: randomfc()},
                    {name:"Nguyen Van B", score: randomfc()},
                    {name:"Nguyen Van C", score: randomfc()},
                    {name:"Nguyen Van C", score: randomfc()},
                    {name:"Nguyen Van Teo", score: randomfc()},
                    {name:"Nguyen Thi Buoi", score: randomfc()},
                    {name:"Nguyen Van Thi E", score: randomfc()},
                    {name:"Nguyen Van Teo", score: randomfc()}
                ]} maxScore =  {100}/>
                )
                :loading?"loading":"failed to load"}
        </div>
    );
};
export default GamePlay1;
