function generate(numOfLabels){
    var fs = require('fs');
    const { features } = require('process');
    
    // Count Number of Files
    var folderName = "./data";
    var numFiles = fs.readdirSync(folderName, (err, files) => {withFileTypes: true});

    // Get File name of Files
    var files = fs.readdirSync(folderName);

    // Get Data from Files and Merge
    var dataArray = [];
    for(var ctr = 0;ctr<numFiles.length;ctr++){
        dataArray[ctr]=JSON.parse(fs.readFileSync(`data/`+files[ctr],'utf8',(err, data)=>{return data}))
    }
    var numSamplesPerGesture = numFiles.length; //number of files in the data
    var totalNumDataPerFile =  dataArray[0]['features'].length;  // number of data in array in each file

    // Variables that Depend on Number of Gestures
    var numOfLabels = numOfLabels;
    var _epochs = (numOfLabels,((numOfLabels-2)*30))+10;
    var _splitter = 0.1;

    var _labels = [];
    var _features = [];
    for(let i = 0;i<numOfLabels;i++){
        _labels.push([""]);
        _features.push([""]);
    }

    // Formatting Data; 
    for(var ctr = 0;ctr<dataArray.length;ctr++){
        var obj = dataArray[ctr]
        var objL = obj['label']
        var objF = obj['features']
        _labels[objL].push(objL)
        _features[objL].push(objF)
    }
    for(var ctr=0;ctr<_labels.length;ctr++){
        _labels[ctr].shift();
        _features[ctr].shift();
    }

    // Converting to Tensors
    _labels = _labels.flat()
    _features = _features.flat()
    const tf = require('@tensorflow/tfjs-node');

    convertToTensors(_features,_labels)
    var featuresTensor;
    var labelsTensor;
    function convertToTensors(featuresData,labelData){
        featuresTensor = tf.tensor2d(featuresData,[numSamplesPerGesture,totalNumDataPerFile]);
        labelsTensor = tf.oneHot(tf.tensor1d(labelData).toInt(),numOfLabels);
    }

    //Splitting
    var trainTesters =  splitter();
    var trainingFeatures = trainTesters[0];
    var trainingLabels = trainTesters[1];
    var testingFeatures = trainTesters[2];
    var testingLabels = trainTesters[3];
    function splitter()
    {
        const numTestExamples = Math.round(numSamplesPerGesture*_splitter);
        const numTrainExamples = numSamplesPerGesture - numTestExamples;

        const trainingFeatures = featuresTensor.slice([0,0],[numTrainExamples,totalNumDataPerFile]);
        const testingFeatures = featuresTensor.slice([numTrainExamples,0],[numTestExamples,totalNumDataPerFile]);
        const trainingLabels = labelsTensor.slice([0,0],[numTrainExamples,numOfLabels]);
        const testingLabels = labelsTensor.slice([numTrainExamples,0],[numTestExamples,numOfLabels]);
        return [trainingFeatures,trainingLabels,testingFeatures,testingLabels];
    }

    // Training the Model
    const createModel = async (trainingFeatures,trainingLabels,testingFeatures,testingLabels) => {
        const params = {learningRate:0.1,epochs:_epochs};
        const model = tf.sequential();
        model.add(tf.layers.dense({
            units: 10,
            activation: 'sigmoid',
            inputShape: [trainingFeatures.shape[1]]
        }));
        model.add(tf.layers.dense({units:numOfLabels,activation:'softmax'})); 

        const optimizer = tf.train.adam(params.learningRate);

        model.compile({
            optimizer: optimizer,
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });

        await model.fit(trainingFeatures,trainingLabels,{
            epochs: params.epochs,
            validationData: [testingFeatures,testingLabels]
        })

        await model.save('file://model')
    }

    createModel(trainingFeatures,trainingLabels,testingFeatures,testingLabels);
}

module.exports = generate;

// SAMPLE USAGE in other file:
// const genMod = require(__dirname+"/model_generator.js");
// genMod(6)

// This file accepts numOfLabels,_epochs and _splitter.
// genMod(<Number of Gestures>)
// Number of Gestures: It is the number of actions to be trained.
