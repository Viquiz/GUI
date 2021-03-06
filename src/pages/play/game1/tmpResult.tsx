import React, { useEffect } from 'react'
import { Question } from "src/database";
import { useSpring, animated } from "react-spring";
import { Textfit } from 'react-textfit';
import sample from './img/sample.png'; 

export interface TmpResultPROP {
    question: Question,
    answerResult: number[]
}

const TransitionHeight: React.FC<{ delay: number, ClassName: string }> = (props) => {
    const translation = useSpring({
        to: { height: "100%" },
        from: { height: "0%" },
        delay: props.delay,
        config: { duration: 1000 },
    });
    return (
        <animated.div className={props.ClassName} style={translation}>
            {props.children}
        </animated.div>
    );
};

const TmpResult: React.FC<TmpResultPROP> = (props) => {

    useEffect(() => {

    }, [])

    return (
        // <div className="h-screen w-full ">
            <div className="flex h-2/6 content-evenly items-end leading-none m-2">
                <TransitionHeight ClassName="flex self-start items-start h-full w-1/6 " delay={100}>
                    {props.answerResult.length > 0 && <div style={{ height: "" + props.answerResult[0] + "%", width: "" + (1 / props.answerResult.length) * 100 + "%", backgroundColor:"Magenta"}} className="h-full w-1/4 rounded-md m-2"></div>}
                    {props.answerResult.length > 1 && <div style={{ height: "" + props.answerResult[1] + "%", width: "" + (1 / props.answerResult.length) * 100 + "%", backgroundColor:"Chartreuse"}} className="h-full w-1/4 rounded-md m-2"></div>}
                    {props.answerResult.length > 2 && <div style={{ height: "" + props.answerResult[2] + "%", width: "" + (1 / props.answerResult.length) * 100 + "%", backgroundColor:"Cyan"}} className="h-full w-1/4 rounded-md m-2"></div>}
                    {props.answerResult.length > 3 && <div style={{ height: "" + props.answerResult[3] + "%", width: "" + (1 / props.answerResult.length) * 100 + "%", backgroundColor:"Blue"}} className="h-full w-1/4 rounded-md m-2"></div>}
                </TransitionHeight>

                <div className="flex self-start justify-center w-1/3">
                    {(props.question.img === "" || props.question.img === undefined)?
                        <img className="w-auto" src={sample} alt="where?" /> :
                        // "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                        <img className="w-auto" src={props.question.img} alt="where?" />
                    }
                </div>

                <div style={{ width: "50vw", height: "100%", fontSize: "111px" }}  className="flex ">
                    {/* <div className="text-center"> */}
                        <Textfit>
                        {props.question.title}
                        </Textfit>
                    {/* </div> */}
                </div>
            </div>
        // {/* </div> */}
    );
}
export default TmpResult;