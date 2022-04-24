const fs = require("fs");
const events = require("events");
const readline = require("readline");
const { create } = require("xmlbuilder2");

async function readFromFile(fileName) {
  const linesArray = [];
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      var res = line.split("|");
      linesArray.push(res);
    });

    await events.once(rl, "close");
    return linesArray;
  } catch (err) {
    console.error(err);
  }
}

function createXML() {
  try {
    var root = create({ version: "1.0", encoding: "UTF-8" });

    return root;
  } catch (err) {
    throw new Error(err);
  }
}

function writeToXML(fileName, xml) {
  try {
    let full_file_name = "./" + fileName + ".xml";

    let writer = fs.createWriteStream(full_file_name, function (err) {
      if (err) throw new Error(err);
    });
    console.log(xml);
    writer.write(xml);
  } catch (err) {
    throw new Error(err);
  }
}

function containsOnly(array1, array2) {
  return array2.every((elem) => array1.includes(elem.toLowerCase()));
}

function validateTag(linesArrays) {
  let tags = linesArrays.map((x) => {
    return x[0];
  });

  firstTag = tags[0].toLowerCase();

  if (!containsOnly(["a", "p", "t", "f"], tags)) {
    return false;
  }
  if (firstTag === "p") {
    return true;
  }
  return false;
}

function checkFileFormat(userInput) {
  var ext = userInput.split(".").pop();

  if (fs.existsSync("./" + userInput) && ext === "txt") {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  readFromFile,
  createXML,
  writeToXML,
  checkFileFormat,
  validateTag,
};
