const fs = require("fs");
const { fileEmitter } = require("./event");

let file1Content , file2Content , filesRead = 0

fs.readFile("file1.txt", "utf8", (err, data) => {
  if (err) return console.log(err);

  file1Content = `File 1 Message => ${data}`
  filesRead++

  if(filesRead === 2){
    fileEmitter.emit("mergeFiles" , file1Content , file2Content)
}
});

fs.readFile("file2.txt", "utf8", (err, data) => {
  if (err) return console.log(err);

  file2Content = `File 2 Message => ${data}`
  filesRead++

  if(filesRead === 2){
    fileEmitter.emit("mergeFiles" , file1Content , file2Content)
}
});



console.log("waiting for reading files...");
