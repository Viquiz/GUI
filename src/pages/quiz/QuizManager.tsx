import { randomInt } from "crypto";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    Link,
    Route,
    Switch,
    useHistory,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import Quiz_card from "@components/Quiz_Card";
import {
    getAllQuestionSet,
    putQuestionSet,
    removeQuestionSet,
    QuestionSet,
} from "../../database";

import {Button} from "@components/button";
import { useAsync, useAsyncPreValue } from "@common/customHook";
import { DetailsList, IColumn, SelectionMode } from "@fluentui/react";

type PROPS = {
    t: string;
    [k: string]: unknown;
};

const DisplayColumns:IColumn[] = [{
    key:'title',
    name:'Title',
    fieldName:'title',
    minWidth:700,
    maxWidth:700,
    onRender:(item:QuestionSet) => { return <div>{item.title}</div>}

},
{
    key:'desc',
    name:'Description',
    fieldName:'description',
    minWidth:300,
    maxWidth:300,
    onRender:(item:QuestionSet) => { return  <div className='w-full overflow-hidden overflow-ellipsis'>{item.description}</div>}


},
{
    key:'class',
    name:'Class',
    fieldName:'class',
    minWidth:50,
    maxWidth:50,
    onRender:(item:QuestionSet) => {return  <div>{item.Class}</div>}
},
{
    key:'edited',
    name:'Last modified',
    fieldName:'description',
    minWidth:0,
    maxWidth:150,
    onRender:(item:QuestionSet) => {
        const date = new Date(item.edit);
        return  <div>{`${date.toLocaleDateString('vi')} - ${date.toLocaleTimeString('vi')}`}</div>}
}
]
const QuizManager: React.FC<PROPS> = (props) => {
    const { url } = useRouteMatch();
    const history = useHistory();
    const {loading,value,error,trigger} = useAsyncPreValue(getAllQuestionSet);
    const addSet = () => {
        let templateCardPROPS: QuestionSet = {
            _id: String(new Date().getTime()),
            title: "new set",
            description: "idk",
            create: new Date().toJSON(),
            edit: new Date().toJSON(),
            Class: "unknown",
            questions: [],
        };
        putQuestionSet(templateCardPROPS).then(()=> trigger()).catch(console.log)
    };
    const removeQuest = (_id: string) => {
        removeQuestionSet(_id).then(()=> trigger())
    };

    function onItemInvoke(item:QuestionSet)
    {
        history.push(`${(props.match as any).path }/${item._id}`)
    }
    return (
        <div className="h-full flex flex-col justify-start">
            <div className="flex-1 overflow-x-hidden overflow-y-scroll min-h-0 pb-8">
                <DetailsList
                styles={{root:{fontSize:'24px'}}}
                columns={DisplayColumns} 
                items={value?.map(item=>{
                    item.key = item._id;
                    return (item);
                    }) as any[] ?? []}
                    selectionMode={SelectionMode.none}
                    onItemInvoked={onItemInvoke}
                >
                </DetailsList>
                {/* {value?(value as QuestionSet[]).map((item) => (
                    <Link key={item._id} to={`${(props.match as any).path}/${item._id}`}>
                        <Quiz_card key={item._id} Quiz={item}>
                            <Button
                                disabled={false}
                                className="bg-button-primary"
                                text="remove"
                                onClick={() => removeQuest(item._id)}
                            />
                        </Quiz_card>
                    </Link>
                )):loading?"loading":"failed to load"} */}
            </div>
            <div
                style={{
                    height: "50px",
                    backgroundColor: "green",
                }}
            >
                <Button
                    disabled={false}
                    className="bg-button-primary"
                    text="Add new set"
                    onClick={() => addSet()}
                />
            </div>
        </div>
    );
};

export default QuizManager;
