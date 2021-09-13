import { promises } from 'dns';
import PouchDB from 'pouchdb';
import { CardPROPS as QuestionSet } from './components/Question_Card/question_card';

//load all db
var questionDB = new PouchDB('http://localhost:5984/question');

// save some thing
// const doc = {
// 	"_id": "mittens",
// 	"name": "Mittens",
// 	"occupation": "kitten",
// 	"age": 3,
// 	"hobbies": [
// 	  "playing with balls of yarn",
// 	  "chasing laser pointers",
// 	  "lookin' hella cute"
// 	]
//   }
// database.put(doc);

//get data
// database.get('mittens').then(function (doc) {
// 	console.log(doc);
// });

//
const getAllQuestion = (callback: () => void ):QuestionSet[] => {
    let result:QuestionSet[] = [];

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
            let info = data.rows[i].doc as unknown as QuestionSet;
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

const addQuestion = (data: QuestionSet, callback: () => void) => {
    questionDB.put(data).then(callback);
}

const removeQuestion = (_id: string, callback: () => void) => {
    // because _rev is remove due to type cast above 
    questionDB.get(_id).then((data) => questionDB.remove(data._id,data._rev).then(callback));
    
}
// const addQuestion = (data: QuestionSet) => {
//     questionDB.put(data);
// }

export {
    getAllQuestion,
    removeQuestion,
    // addEmptyQuestion,
    addQuestion
};
