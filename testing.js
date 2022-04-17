// ---- CREATION OF DUMMY DATA ---- \\
function createDummyData(){
    const genData = require(__dirname+"/file_generator.js");
    genData(6,4)

    // This file accepts numberOfActions and numberOfSamplePerActions.
    // genData(<numberOfActions>,<numberOfSamplePerActions>)
    // Number of numberOfActions: The number of gestures/actoins to be trained.
    // Number of numberOfSamplePerActions: The number of samples per actions to be trained.
}

// ---- CREATION OF MODEL ---- \\
function createModel(){
    const genMod = require(__dirname+"/model_generator.js");
    genMod(6,80,0.1);

    // genMod(<Number of Gestures>,<Number of Epochs>,<Splitter Multiplier>)
    // Number of Gestures: It is the number of actions to be trained.
    // Number of Epochs: I'm not really sure about this but usually this is around 40 to 80. So experiment on the value.
    // Splitter Mutlipler: I'm not really sure about this but usually this is around 0.1 to 0.2. So experiment on the value.
}

// ---- PREDICTION ---- \\
function predictData(){
    const startPredict = require(__dirname+"/prediction.js");
    let num = 5;
    let currentLiveData = [num,num,num,num,num,num];
    let currentActions =  ['Zero','One','Two','Three','Four','Five'];
    startPredict(currentLiveData,currentActions);

    // This file accepts currentLiveData.
    // genData(<currentLiveData>,<currentActions>)
    // currentLiveData: This is an array of the live data.
    // currentActions: This is an array of the current actions.
}

// createDummyData();
// createModel();
predictData();