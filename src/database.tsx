import React from 'react';

import PouchDB from "pouchdb";
// to do : remove this ????

import {
    CardPROPS as QuestionSet,
    questionIDs,
} from "./components/Quiz_Card";



export type answer = {
    text:string,
    isCorrect:boolean,
    id?:number,
}

export interface Question {
	_id: string,
	_rev?: string,
	img: string,
	title: string,
	answers: answer[],
	create: string,
	edit: string,
	gameMode: string,
	[k: string]: unknown
}


//using cloud
// const HOST_ADD = "http://localhost:5984/"
// let questionDB = new PouchDB(HOST_ADD + 'question');
// let questionSetDB = new PouchDB(HOST_ADD + 'questionSet');

//use local data
const questionDB = new PouchDB("question");
const questionSetDB = new PouchDB("questionSet");

/********************************** QUESTION ************************************** */
async function getAllQuestion(){
    let data = await questionDB.allDocs({
        include_docs: true,
        attachments: true,
    });
    return data.rows.map(items =>items.doc) as Question[]
};


async function getQuestionsByQuestionSet(_Question_set_id: string){
    let data = await getQuestionSet(_Question_set_id);
    let keys = data.questions as string[];
    let questionSet = await questionDB.allDocs({
                include_docs: true,
                attachments: true,
                keys: keys,
            });
    let qSets  = questionSet.rows.map(items =>items.doc) as Question[];
    return [data,qSets];
};

async function addQuestion(data: Question){
    return questionDB.put(data);
};

async function removeQuestion(_id: string){
    // because _rev is remove due to type cast above
    let data = await  questionDB.get(_id);
    return questionDB.remove(data._id, data._rev);
};

/******************************************** SET ****************************************************/
async function getAllQuestionSet(){
    let data = await questionSetDB.allDocs({
        include_docs: true,
        attachments: true,
    });
    return data.rows.map(items =>items.doc) as QuestionSet[]
};

async function getQuestionSet(_Question_set_id: string){
    return (await  questionSetDB.get(_Question_set_id)) as QuestionSet;
};

async function putQuestionSet(data: QuestionSet){
    return questionSetDB.put(data);
};

async function removeQuestionSet(_id: string){
    // because _rev is remove due to type cast above
    let data = await questionSetDB.get(_id);
    return questionSetDB.remove(data._id, data._rev);
};


export {
    getAllQuestion,
    getQuestionsByQuestionSet,
    removeQuestion,
    addQuestion,


    getQuestionSet,
    putQuestionSet,
    getAllQuestionSet,


    removeQuestionSet,
};
