async function deleteAll() {
  var myPromise = new Promise((resolve) => {
    const fs = require("fs");
    const path = require("path");
    const directory = __dirname + "/data";
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
      console.log("all old data removed");
      resolve(true);
    });
  });
  let data = await myPromise;
  return data;
}

module.exports = deleteAll;
