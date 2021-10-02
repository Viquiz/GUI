import React, { useEffect, useState } from "react";
import { useSpring, animated} from "react-spring";
import { Question } from "src/database";
import { Textfit } from 'react-textfit';
import circle from './img/circle.png';
import triangle from './img/triangle.png';
import pentagon from './img/pentagon.png';
import rhombus from './img/Rhombus.png';
import wrong from './img/wrong.png';

const TransitionFade: React.FC<{ delay: number, cancle?: boolean}> = (props) => {
    const translation = useSpring({
        to: { opacity: 1 },
        from: { opacity: props.cancle?1:0 },
        delay: props.delay,
        config: { duration: 1000 },
    });
    return (
        <animated.div style={translation}>
            {props.children}
        </animated.div>
    );
};

const QuestionShow: React.FC<{ data: Question, showCorrectAnswer?:boolean}> = (props) => {

    useEffect(() => {

    }, []);

    return (
        <div className="leading-none h-1/2 mt-4">

            <div className="flex justify-around h-1/2">
                {props.data.answers.length &&
                    <TransitionFade delay={0} cancle = {props.showCorrectAnswer}>
                        {/* , fontSize: "110px"  */}
                        <div style={{ width: "40vw" }} className="flex" > 
                            <div className="object-contain">
                                <img height={100} width={100} className="absolute" src={circle} alt="where?" />
                                {props.showCorrectAnswer && 
                                !props.data.answers[0].isCorrect && 
                                <TransitionFade delay={0}>
                                    <img className="absolute" height={100} width={100} src={wrong} alt="wrong" />
                                </TransitionFade>}
                            </div>

                            <div className="flex ml-24 h-40">
                                <Textfit>{props.data.answers[0].text}</Textfit>
                            </div>
                        </div>
                    </TransitionFade>
                }

                {props.data.answers.length > 1 &&
                <TransitionFade delay={500} cancle = {props.showCorrectAnswer}>
                    <div style={{ width: "40vw" }} className="flex" >
                        <div className="object-contain">
                            <img height={100} width={100} className="absolute" src={triangle} alt="triangle" />
                            {props.showCorrectAnswer && 
                             !props.data.answers[1].isCorrect && 
                             <TransitionFade delay={1000}>
                                <img className="absolute" height={100} width={100} src={wrong} alt="wrong" />
                             </TransitionFade>}
                        </div>
                        <div className="flex ml-24 h-40">
                            <Textfit>{props.data.answers[1].text}</Textfit>
                        </div>
                    </div>
                </TransitionFade>
                }
            </div>  

            <div className="flex justify-around">
                {props.data.answers.length > 2 &&
                <TransitionFade delay={1000} cancle = {props.showCorrectAnswer}>
                    <div style={{ width: "40vw"}} className="flex" >
                        <div className="object-contain">
                            <img height={100} width={100} className="absolute" src={rhombus} alt="where?" />
                            {props.showCorrectAnswer && 
                            !props.data.answers[2].isCorrect && 
                                <TransitionFade delay={2000}>
                                    <img className="absolute" height={100} width={100} src={wrong} alt="wrong" />
                                </TransitionFade>
                            }
                        </div>
                        <div className="flex ml-24 h-40">
                            <Textfit>{props.data.answers[2].text}</Textfit>
                        </div>
                    </div>
                </TransitionFade>
                }

                {props.data.answers.length > 3 &&
                <TransitionFade delay={1500} cancle = {props.showCorrectAnswer}>
                    <div style={{ width: "40vw"}} className="flex" >
                        <div className="object-contain">
                            <img height={100} width={100} className="absolute" src={pentagon} alt="where?" />
                            {props.showCorrectAnswer && 
                            !props.data.answers[3].isCorrect && 
                            <TransitionFade delay={3000}>
                                <img className="absolute" height={100} width={100} src={wrong} alt="wrong" />
                            </TransitionFade>}
                        </div>
                        <div className="flex ml-24 h-40">
                            <Textfit>{props.data.answers[3].text}</Textfit>
                        </div>
                    </div>
                </TransitionFade>
                }
            </div>
        </div>
    );
}

export default QuestionShow