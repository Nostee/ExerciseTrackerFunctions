// ---- CREATION OF DUMMY DATA ---- \\
function createDummyData(){
    const genData = require(__dirname+"/file_generator.js");
    genData(5,4)

    // This file accepts numberOfActions and numberOfSamplePerActions.
    // genData(<numberOfActions>,<numberOfSamplePerActions>)
    // Number of numberOfActions: The number of gestures/actoins to be trained.
    // Number of numberOfSamplePerActions: The number of samples per actions to be trained.
}

// ---- CREATION OF MODEL ---- \\
function createModel(){
    const genMod = require(__dirname+"/model_generator.js");
    genMod(5,80,0.1);

    // genMod(<Number of Gestures>,<Number of Epochs>,<Splitter Multiplier>)
    // Number of Gestures: It is the number of actions to be trained.
    // Number of Epochs: I'm not really sure about this but usually this is around 40 to 80. So experiment on the value.
    // Splitter Mutlipler: I'm not really sure about this but usually this is around 0.1 to 0.2. So experiment on the value.
}

// ---- PREDICTION ---- \\
function predictData(){
    let num = 4;
    let currentLiveData = [num,num,num,num,num,num];
    const startPredict = require(__dirname+"/prediction.js");
    startPredict(currentLiveData)

    // This file accepts currentLiveData.
    // genData(<currentLiveData>)
    // currentLiveData: This is an array.
}

// createDummyData();
// createModel();
predictData();