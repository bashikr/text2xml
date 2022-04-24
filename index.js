const readline = require("readline");
const utils = require("./utils.js");

async function processTextFile(input, output) {
  try {
    const txtToArray = await utils.readFromFile(input);
    const root = utils.createXML();
    const isValid = utils.validateTag(txtToArray);

    if (isValid) {
      let people = root.ele("people");
      var family, phone, address;
      var [personTag, familyTag, familyPersonTag] = [0, 0, 0];

      for (var i = 0; i < txtToArray.length; i++) {
        let currentTag = txtToArray[i][0].toLowerCase();

        if (currentTag === "p") {
          personTag += 1;
          var person = people.ele("person");
          person.ele("firstname").txt(txtToArray[i][1]);
          person.ele("lastname").txt(txtToArray[i][2]);
        }
        if (currentTag === "a") {
          if ((personTag && familyTag == 0) || familyPersonTag !== personTag) {
            address = person.ele("address");
            familyTag = 0;
          }
          if (familyPersonTag === personTag) {
            address = family.ele("address");
          }
          address.ele("street").txt(txtToArray[i][1]);
          address.ele("city").txt(txtToArray[i][2]);
          address.ele("zipCode").txt(txtToArray[i][3]);
        }
        if (currentTag === "t") {
          if ((personTag && familyTag == 0) || familyPersonTag !== personTag) {
            phone = person.ele("phone");
            familyTag = 0;
          }
          if (familyPersonTag === personTag) {
            phone = family.ele("phone");
          }
          phone.ele("mobile").txt(txtToArray[i][1]);
          phone.ele("home").txt(txtToArray[i][2]);
        }
        if (currentTag === "f" && personTag) {
          familyTag += 1;
          familyPersonTag = personTag;
          family = person.ele("family");
          family.ele("name").txt(txtToArray[i][1]);
          family.ele("born").txt(txtToArray[i][2]);
        }
      }
      const xml = root.end({ prettyPrint: true });
      utils.writeToXML(output, xml);
    } else {
      console.log("Not valid tags in the .txt file");
    }
  } catch (err) {
    throw new Error(err);
  }
}

(async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.write("Please enter a valid .txt file found in the current directory\n");

  rl.on("line", (line) => {
    var userInput = line.split(" ")[0];

    if (utils.checkFileFormat(userInput) == true) {
      processTextFile(userInput, "people");
      rl.close();
    } else {
      console.log(
        "Please enter a valid .txt file and get sure it is found in the directory"
      );
    }
  });
})();
