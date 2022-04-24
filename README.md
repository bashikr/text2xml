### Text2XML

To be able to use this tool a modern version of Node js has to be installed on your machine. The program takes a user input from the terminal which is a file name. It then checks if the file is found in the directory and if it is of a correct format. After that it does a basic validation of the text file.

### About the text file:

The file format should be as follows:

```
P|first name|last name
T|mobile number|home number
A|street|city|zipcode
F|name|year of birth
```

```
P could be followed by T, A and F
F could be followed by T and A
```
###### Example:

```
P|Carl Gustaf|Bernadotte
T|0768-101801|08-101801
A|Drottningholms slott|Stockholm|10001
F|Victoria|1977
A|Haga Slott|Stockholm|10002
F|Carl Philip|1979
T|0768-101802|08-101802
P|Barack|Obama
A|1600 Pennsylvania Avenue|Washington, D.C
```

Gives XML as:

```
<people>
  <person>
    <firstname>Carl Gustaf</firstname>
    <lastname>Bernadotte</lastname>
    <address>
      <street>Drottningholms slott</street>
      ...
     </address>
    <phone>
      <mobile>0768-101801</mobile>
      ...
    </phone>
    <family>
      <name>Victoria</name>
        <born>1977</born>
        <address>...</address>
     </family>
     <family>...</family>
  </person>
  <person>...</person>
</people>
```
#### How to use it:
1. Clone the repo as follows:

    `git clone git@github.com:bashikr/text2xml.git`
1. Navigate to the root of the repository
1. Execute the command line `npm install` in the terminal
1. Run `node index.js`
1. Give the name of the text file you want to convert to xml with the **.txt** extension.
    `Obs! The file should be in the same directory.`

#### Test cases:
There are some test scenarios as text files. They are placed in a folder called `tests`. when executing them one can see what happens if he/she:

1. Writes more than one letter in the tag cell inside the text file.
2. Writes a tag that is not like P, T, A, F or p, t, a, f.
3. Removes the last cell of a line.
4. Adds an empty line to the text file.
5. Adds more than one child tag to the family parent tag.
6. If the first tag is not P or p.