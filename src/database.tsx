import { promises } from 'dns';
import PouchDB from 'pouchdb';
// to do : remove this ????
import { CardPROPS as QuestionList } from './components/Question_Card/question_card';
import { CardPROPS as QuestionSet} from './components/Quiz_Card/quiz_card';
//load all db
var questionDB = new PouchDB('http://localhost:5984/question');
var questionSetDB = new PouchDB('http://localhost:5984/questionSet');

/********************************** QUESTION ************************************** */
const getAllQuestion = (callback: () => void ):QuestionList[] => {
    let result:QuestionList[] = [];

    // promises
    questionDB.allDocs({
        include_docs: true,
        attachments: true,
    }).then(function (data) {
        console.log("get",data);
        //should have bug here 
        // result = data as unknown as QuestionSet[];
        for(let i in data.rows){
            //because im lazy 
            let info = data.rows[i].doc as unknown as QuestionList;
            result.push(info); 
        }
        console.log("result",result);
        callback();
    }).catch(function (err) {
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
}
//where is my overloading :(((((

// const addEmptyQuestion = () => {
//     // add data with an empty Id ?
//     questionDB.put({});
// }

const addQuestion = (data: QuestionList, callback: () => void) => {
    questionDB.put(data).then(callback);
}

const removeQuestion = (_id: string, callback: () => void) => {
    // because _rev is remove due to type cast above 
    questionDB.get(_id).then((data) => questionDB.remove(data._id,data._rev).then(callback));
    
}

// const addQuestion = (data: QuestionSet) => {
//     questionDB.put(data);
// }
/******************************************** SET */
const getAllQuestionSet = (callback: () => void ):QuestionSet[] => {
    let result:QuestionSet[] = [];
    questionSetDB.allDocs({
        include_docs: true,
        attachments: true,
    }).then(function (data) {
        console.log("get",data);
        for(let i in data.rows){
            let info = data.rows[i].doc as unknown as QuestionSet;
            result.push(info); 
        }
        console.log("result",result);
        callback();
    }).catch(function (err) {
        console.log(err);
    });
    return result;
}

const addQuestionSet = (data: QuestionSet, callback: () => void) => {
    questionSetDB.put(data).then(callback);
}

const removeQuestionSet = (_id: string, callback: () => void) => {
    // because _rev is remove due to type cast above 
    questionSetDB.get(_id).then((data) => questionSetDB.remove(data._id,data._rev).then(callback));
    
}


export {
    getAllQuestion,
    removeQuestion,
    // addEmptyQuestion,
    addQuestion,

    getAllQuestionSet,
    addQuestionSet,
    removeQuestionSet
};
