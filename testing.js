let currentActions = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight'];
let numberOfActions = currentActions.length;

// ---- CREATION OF DUMMY DATA ---- \\
async function createDummyData(){
    const genData = require(__dirname+"/file_generator.js");
    const delData = require(__dirname+"/delete_data.js");
    await delData();
    genData(numberOfActions,4);
    
    // This file accepts numberOfActions and numberOfSamplePerActions.
    // genData(<numberOfActions>,<numberOfSamplePerActions>)
    // Number of numberOfActions: The number of gestures/actoins to be trained.
    // Number of numberOfSamplePerActions: The number of samples per actions to be trained.
}

// ---- CREATION OF MODEL ---- \\
function createModel(){
    const genMod = require(__dirname+"/model_generator.js");
    genMod(numberOfActions);

    // genMod(<Number of Gestures>,<Number of Epochs>,<Splitter Multiplier>)
    // Number of Gestures: It is the number of actions to be trained.
    // Number of Epochs: I'm not really sure about this but usually this is around 40 to 80. So experiment on the value.
    // Splitter Mutlipler: I'm not really sure about this but usually this is around 0.1 to 0.2. So experiment on the value.
}

// ---- PREDICTION ---- \\
function predictData(){
    const startPredict = require(__dirname+"/prediction.js");
    let num = 8;
    let currentLiveData = [num,num,num,num,num,num];
    startPredict(currentLiveData,currentActions);

    // This file accepts currentLiveData.
    // genData(<currentLiveData>,<currentActions>)
    // currentLiveData: This is an array of the live data.
    // currentActions: This is an array of the current actions.
}

// createDummyData();
// createModel();
predictData();


