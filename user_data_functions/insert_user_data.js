const date = require(__dirname + "/get_current_date.js");
const fs = require("fs");
let currentDate = date();

async function getData() {
  var myPromise = new Promise((resolve) => {
    let dataContainer = [];
    const csv = require("csv-parser");
    fs.createReadStream("../user_data/exercise.csv")
      .pipe(csv())
      .on("data", (row) => {
        dataContainer.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(dataContainer);
      });
  });
  let data = await myPromise;
  return data;
}

async function writeExerciseData(exercise,counter) {
  let data = await getData();
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "../user_data/exercise.csv",
    header: [
      { id: "date", title: "date" },
      { id: "exercise", title: "exercise" },
      { id: "counter", title: "counter" },
    ],
  });

  let exists = 0;
  data.forEach((value)=>{
    if(value['date']==currentDate){
      if(value['exercise']==exercise){
        exists = 1;
        let newCount = parseInt(value['counter'])+counter;
        value['counter'] = newCount;
      }
    }
  })

  if(exists==0){
    data.push({
      date: currentDate,
      exercise: exercise,
      counter: counter,
    });
  }
  
  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
}

async function writePostureData(time_start,time_end,verdict) {
  let data = await getData();
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "../user_data/posture.csv",
    header: [
      { id: "date", title: "date" },
      { id: "time_start", title: "time_start" },
      { id: "time_end", title: "time_end" },
      { id: "verdict", title: "verdict" },
    ],
  });

  data.push({
    date: currentDate,
    time_start: time_start,
    time_end: time_end,
    verdict: verdict,
  });
  
  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
}

writeExerciseData("Exercise",5);
// writePostureData("12:00 AM","12:30 AM","Good");
