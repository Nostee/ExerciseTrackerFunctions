const date = require(__dirname + "/get_current_date.js");
const fs = require("fs");

// DUMMY DATA
let currentDate = date();
let nameOfExercise = "push-up";
let counter = 5;

// GET DATA
async function getData() {
  var myPromise = new Promise((resolve) => {
    let dataContainer = [];
    const csv = require("csv-parser");
    fs.createReadStream("out.csv")
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

// WRITE DATA
async function writeData() {
  let data = await getData();
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "out.csv",
    header: [
      { id: "name", title: "name" },
      { id: "surname", title: "surname" },
      { id: "age", title: "age" },
      { id: "gender", title: "gender" },
    ],
  });

  data.push({
    name: "Johny",
    surname: "Snowy",
    age: "23",
    gender: "M",
  });

  console.log(data);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
}

writeData();
