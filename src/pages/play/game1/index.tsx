import { ProcessBar } from "@components/processBar";
import { stat } from "fs";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import {Question } from "src/database";
import PlayGame1 from "./play"
import TmpResult from "./tmpResult"
import FinalResult from "./finalResult"
interface GamePlayPROPS {
    [key: string]: unknown;
}

interface MatchParams {
    id: string;
}

const GamePlay1: React.FC<GamePlayPROPS> = (props) => {
    let data: Question = {
        _id: "12unknow3",
        title: "a question",
        answers: [{ isCorrect: true, text: "123aaaaaaaaaaaaaaaaaa", id: 0 }, { isCorrect: false, text: "345", id: 1 }],
        create: "",
        edit: "",
        gameMode: "10"
    }

    let match = useRouteMatch<MatchParams>("/Quiz/:id");

    const [state, setState] = useState(parseInt(data.gameMode));
    const [state2, setState2] = useState(0);

    useEffect(() => {
        // console.log("not loading db ... ");
        const timer=setTimeout(() => {
            if(state > 0)
                setState(state-1);
            else{
                setState(5);
                if(state2 < 2)
                    setState2(state2+1);
            }

          }, 1000);
          // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

    return (
        <div className="text-4xl">
            
            {/* Play game */}
            {state2 == 0 && <div>
                        <ProcessBar totalTime={parseInt(data.gameMode)} timeLeft={state} color = {(state / parseInt(data.gameMode)) * 100}/>
                        <PlayGame1 question={data}/>
                    </div>
            }
            {/* Each game result */}
            {state2 == 1 && <TmpResult question={data}/>}

            {/* final result */}
            {state2 == 2 && <FinalResult/>}
        </div>
    );
};
export default GamePlay1;
