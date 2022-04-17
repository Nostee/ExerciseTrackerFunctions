function generate(numberOfActions,numberOfSamplePerActions){
    // -- VARIABLES TO BE CHANGED DEPENDING ON NUMBER OF DATA -- \\
    var numberOfActions = numberOfActions; 
    var numberOfItemPerActions = numberOfSamplePerActions; 

    var fs = require('fs');
    var dict = {};
    dict["label"] = 0;
    ctr = 0;

    for(let i = 1; i<=(numberOfActions*numberOfItemPerActions); i++) //NEW
    {
        console.log(i)
        dict["features"] = [ctr,ctr,ctr,ctr,ctr,ctr];
        ctr++;

        fs.appendFile(`data/`+`sample`+i+`.txt`,JSON.stringify(dict),function(err){
            if(err) throw err;
            console.log("saved!")
        });
        dict["label"] = dict["label"]+1;
        if(dict["label"]==numberOfActions)
        {
            dict["label"] = 0;
            ctr = 0;
        }
    }
}

module.exports = generate;

// SAMPLE USAGE in other file:
// const genData = require(__dirname+"/file_generator.js");
// genData(6,4)

// This file accepts numberOfActions and numberOfSamplePerActions.
// genData(<numberOfActions>,<numberOfSamplePerActions>)
// numberOfActions: The number of gestures/actions to be trained.
// numberOfSamplePerActions: The number of samples per actions to be trained.
