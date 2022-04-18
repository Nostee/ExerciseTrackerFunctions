const { data } = require('@tensorflow/tfjs-node');

const fs = require('fs');
const path = require('path');
const directory = './data';

//eto na lng babaguhin tsaka yung sa predictData  para matry 
var numG = 8; //number of gestures

// ---- CREATION OF DUMMY DATA ---- \\
function createDummyData(){
    deleteAll();  //deleting all the files in the data folder
    setTimeout(fileGenerate,2000);    //make sure na delete muna ang mauna before maglagay ng bagong data

    //number of gesture and how many samples taken

    // This file accepts numberOfActions and numberOfSamplePerActions.
    // genData(<numberOfActions>,<numberOfSamplePerActions>)
    // Number of numberOfActions: The number of gestures/actoins to be trained.
    // Number of numberOfSamplePerActions: The number of samples per actions to be trained.
}

// ---- CREATION OF MODEL ---- \\
function createModel(){
    const genMod = require(__dirname+"/model_generator.js");
    //genMod(numG,300,0.015);

    var epoch = vars(numG).epoch;
    var split = vars(numG).split;
    
    //console.log(epoch,split);
    genMod(numG,epoch,split);
    

    // genMod(<Number of Gestures>,<Number of Epochs>,<Splitter Multiplier>)
    // Number of Gestures: It is the number of actions to be trained.
    // Number of Epochs: I'm not really sure about this but usually this is around 40 to 80. So experiment on the value.
    // Splitter Mutlipler: I'm not really sure about this but usually this is around 0.1 to 0.2. So experiment on the value.
}



// ---- PREDICTION ---- \\
function predictData(){
    let num = 5.6; //0 simula
    let currentLiveData = [num,num,num,num,num,num];
    const startPredict = require(__dirname+"/prediction.js");
    startPredict(currentLiveData)

    // This file accepts currentLiveData.
    // genData(<currentLiveData>)
    // currentLiveData: This is an array.
}










function deleteAll(){
    fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
        });
    }
    });
    console.log("all old data removed");
}

function fileGenerate(){
    const genMod = require(__dirname+"/file_generator.js");
    genMod(numG,4);
    vars(numG); //para makuha yung epoch and split 
}


function vars (numG){

    if (numG == 3){
        return {
            epoch: 30,
            split: 0.2
        }
    }

    else if (numG == 4){
        return {
            epoch: 60,
            split: 0.2
        }
    }

    else if (numG == 5){
        return {
            epoch: 90,
            split: 0.1
        }
    }

    else if (numG == 6){
        return {
            epoch: 120,
            split: 0.1
        }
    }

    else if (numG == 7){
        return {
            epoch: 150, //250
            split: 0.1
        }
    }

    else if (numG == 8){
        return {
            epoch: 180, //300
            split: 0.1
        }
    }

    
}




//createDummyData();
//createModel();
//predictData();