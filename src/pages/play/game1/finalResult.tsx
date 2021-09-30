import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { IconContext } from "react-icons/lib";
import { ImStarFull } from "react-icons/im";

// move to database
export interface StudentScore {
    name: string,
    score: number,
    timeRespond?: number;
}
export interface FinalResultPROP {
    students: StudentScore[],
    maxScore: number;
}

const TransitionScore = ({
    data,
    maxScore,
    delay,
    number,
}: {
    data: StudentScore;
    maxScore: number;
    delay: number;
    number: number;
}) => {
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
        delay: delay,
        config: { duration: 1000 },
    });
    return (
        <animated.div style={props}>
            <IconContext.Provider
                value={{
                    size: "3em",
                    // /* top 1: gold, 2: yellow, 3:  gray 4: white = no color*/
                    color:
                        number === 1
                            ? "gold"
                            : number === 2
                            ? "yellow"
                            : number === 3
                            ? "gray"
                            : "white",
                    className: "global-class-name",
                }}
            >
                <span className="relative flex justify-between container items-center">
                    <span className="object-contain w-28">
                        <span className="absolute mt-9 ml-10 text-gray-700">{number}</span>
                        <ImStarFull />
                    </span>
                    <span className="m-6">
                        {data.name} 
                    </span>
                    <span className="justify-end m-6 text-gray-500">{data.score}/{maxScore}</span>
                </span>
            </IconContext.Provider>
        </animated.div>
    );
};

const FinalResult: React.FC<FinalResultPROP> = (props) => {
    const [studentData,setStudentData] = useState(props.students);

    // const [sortDecrease,setSortDecrease] = useState(props.maxScore);
    const [rank,setRank] = useState<number[]>([]);

    useEffect(() => {
        //sort score
        setStudentData(studentData.sort(((a,b)=> {
            return b.score - a.score;
        })));
        //for case same rank  0 because +1
        let rankcount = 1;
        let sortDecrease = props.maxScore;

        let tmpRank:number[] = [];

        studentData.forEach(element => {
            if(element.score < sortDecrease){
                rankcount+=1;
                sortDecrease = element.score;
            }
            tmpRank.push(rankcount);
        });
        
        setRank(tmpRank);

    }, [studentData, rank, props]);

    return (
        <div className="h-screen w-full overflow-y-auto">
            {/* err */}
            {studentData.length === 0 && (
                <div className="grid justify-items-center">
                    Opps No one to show
                </div>
            )}

            {/* TOP row */}
            {studentData.length !== 0 && <div className="grid justify-end w-2/3">
                {studentData.map((student: StudentScore, index) => {
                    return (
                        <TransitionScore
                            key = {index}
                            data = {student}
                            maxScore = {props.maxScore}
                            // slowly show the result with in 7 seconds
                            delay = {
                                (7000 - index * 1000) > 0 ? (7000 - index * 1000) : 1000
                            }
                            number = {rank[index]}/>
                    );
                })}
            </div>
            }
        </div>
    );
};
export default FinalResult;
