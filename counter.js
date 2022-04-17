var fs = require('fs');

var a = JSON.parse(fs.readFileSync(`data/sample1.txt`,'utf8',(err, data)=>{return data}))

console.log(a["features"].length)