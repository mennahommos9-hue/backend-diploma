const fs = require("fs");
const EventEmitter = require("events");
const fileEmitter = new EventEmitter();

fileEmitter.on("mergeFiles", (file1Content, file2Content) => {
  fs.writeFile(
    "file3.txt",
    `Hello From file 3\n${file1Content}\n${file2Content}`,
    "utf8",
    (err) => {
      if (err) return console.log(err);
    },
  );
  console.log("File 3 created successfully")
});

module.exports = {
    fileEmitter,
}
