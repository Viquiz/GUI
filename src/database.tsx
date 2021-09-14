import { promises } from "dns";
import PouchDB from "pouchdb";
// to do : remove this ????
import { CardPROPS as Question } from "./components/Question_Card/question_card";
import {
    CardPROPS as QuestionSet,
    questionIDs,
} from "./components/Quiz_Card/quiz_card";

//using clound
// const HOST_ADD = "http://localhost:5984/"
// let questionDB = new PouchDB(HOST_ADD + 'question');
// let questionSetDB = new PouchDB(HOST_ADD + 'questionSet');

//use local data
let questionDB = new PouchDB("question");
let questionSetDB = new PouchDB("questionSet");

/********************************** QUESTION ************************************** */
const getAllQuestion = (callback: () => void): Question[] => {
    let result: Question[] = [];

    // promises
    questionDB
        .allDocs({
            include_docs: true,
            attachments: true,
        })
        .then(function (data) {
            console.log("get", data);
            //should have bug here
            // result = data as unknown as QuestionSet[];
            for (let i in data.rows) {
                //because im lazy
                let info = data.rows[i].doc as unknown as Question;
                result.push(info);
            }
            console.log("result", result);
            callback();
        })
        .catch(function (err) {
            console.log(err);
        });

    // await
    // try {
    //     let data = await questionDB.allDocs({
    //       include_docs: true,
    //       attachments: true,
    //     });
    //     // console.log("get",data);
    //     //should have bug here
    //     for(let i in data.rows){
    //         //because im lazy
    //         let info = data.rows[i].doc as unknown as QuestionSet;
    //         result.push(info);
    //     }

    //   } catch (err) {
    //     console.log(err);
    //   }

    // console.log("result",result);
    return result;
};

const getQuestionsByQuestionSet = (
    _id: string,
    callback: () => void
): Question[] => {
    let result: Question[] = [];

    questionSetDB.get(_id).then((data) => {
        let doc = data as unknown as QuestionSet;
        let keys = doc.questions as string[];
        console.log("keys", keys);
        questionDB
            .allDocs({
                include_docs: true,
                attachments: true,
                keys: keys,
            })
            .then(function (data) {
                console.log("get", data);
                //should have bug here
                // result = data as unknown as QuestionSet[];
                for (let i in data.rows) {
                    //because im lazy
                    let info = data.rows[i].doc as unknown as Question;
                    result.push(info);
                }
                console.log("result", result);
                callback();
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    // console.log("result",result);
    return result;
};

const addQuestion = (data: Question, callback: () => void) => {
    questionDB.put(data).then(callback);
};

const removeQuestion = (_id: string, callback: () => void) => {
    // because _rev is remove due to type cast above
    questionDB
        .get(_id)
        .then((data) => questionDB.remove(data._id, data._rev).then(callback));
};

// const addQuestion = (data: QuestionSet) => {
//     questionDB.put(data);
// }
/******************************************** SET ****************************************************/
const getAllQuestionSet = (callback: () => void): QuestionSet[] => {
    let result: QuestionSet[] = [];
    questionSetDB
        .allDocs({
            include_docs: true,
            attachments: true,
        })
        .then(function (data) {
            //   console.log("get", data);
            for (let i in data.rows) {
                let info = data.rows[i].doc as unknown as QuestionSet;
                result.push(info);
            }
            //   console.log("result", result);
            callback();
        })
        .catch(function (err) {
            console.log(err);
        });
    return result;
};

const getQuestionSet = (_id: string, callback: (data: QuestionSet) => void) => {
    // let result: QuestionSet;

    questionSetDB
        .get(_id)
        .then((data) => {
            let result = data as unknown as QuestionSet;
            callback(result);
        })
        .catch((err) => {
            console.log(err);
        });

    // return result;
};

const putQuestionSet = (data: QuestionSet, callback: () => void) => {
    questionSetDB.put(data).then(callback);
};

// const addQuestionToQuestionSet = (QuestionId: string, QuestionSetId: string, callback: () => void) => {
//     questionSetDB.get(QuestionSetId).then(
//         (data) => {
//             let i = data as unknown as QuestionSet;
//             (i.questions as string[]).push(QuestionId);

//             questionSetDB.put(data).then(()=>{
//                 callback();
//             }).catch((err)=>{
//                 console.log("err", err);
//             })

//         }
//     ).catch((err)=>{
//         console.log("err", err);
//     })
// }

// const removeQuestionFromQuestionSet = (QuestionId: string, QuestionSetId: string, callback: () => void) => {
//     questionSetDB.get(QuestionSetId).then(
//         (data) => {
//             let i = data as unknown as QuestionSet;
//             (i.questions as string[]).push(QuestionId);

//             questionSetDB.put(data).then(()=>{
//                 callback();
//             }).catch((err)=>{
//                 console.log("err", err);
//             })

//         }
//     ).catch((err)=>{
//         console.log("err", err);
//     })
// }

const removeQuestionSet = (_id: string, callback: () => void) => {
    // because _rev is remove due to type cast above
    questionSetDB
        .get(_id)
        .then((data) =>
            questionSetDB.remove(data._id, data._rev).then(callback)
        );
};

export {
    getAllQuestion,
    getQuestionsByQuestionSet,
    removeQuestion,
    // addEmptyQuestion,
    addQuestion,


    getQuestionSet,
    putQuestionSet,
    getAllQuestionSet,
    // addQuestionToQuestionSet,
    // removeQuestionFromQuestionSet,

    removeQuestionSet,
};
