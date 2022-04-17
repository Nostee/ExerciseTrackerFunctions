function start(currentLiveData,currentActions){
    const tf = require('@tensorflow/tfjs');
    require('@tensorflow/tfjs-node');
    
    const gestureClasses = currentActions;
    var model;
    var _liveData;
    const init = async (liveData) => {
        _liveData = liveData
        model = await tf.loadLayersModel('file://model/model.json');
        predict(model);
    }
    const predict = (model => {
        tf.tidy(()=>{
            const input = tf.tensor2d(_liveData,[1,currentLiveData.length]);
            const prediction = model.predict(input);
            const gesturePredicted = gestureClasses[prediction.argMax(-1).dataSync()[0]];
            console.log(gesturePredicted);

            // // How to determine the truth value
            // truth = [3,3,3,3,3,3]; // dummy data only
            // checkAccuracy(truth,input);
            // console.log("<--------------->")
        });
    })

    function startPredict(liveData)
    {
        init(liveData);
    }

    // function checkAccuracy(truth,input)
    // {
    //     const mse = tf.metrics.meanSquaredError(tf.tensor2d(truth,[1,6]), input);
    //     var accuracy = (100-(mse.dataSync()[0]*100)).toFixed(2)+"% Accurate.";
    //     console.log(accuracy);
    // }

    startPredict(currentLiveData);
}

module.exports = start;

// SAMPLE USAGE in other file:
// const startPredict = require(__dirname+"/prediction.js");
// startPredict(currentLiveData,currentActions)

// This file accepts currentLiveData.
// genData(<currentLiveData>,<currentActions>)
// currentLiveData: This is an array of the live data.
// currentActions: This is an array of the current actions available.
















