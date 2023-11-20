const fs = require("fs");
const { Circle, Square, Triangle } = require("./assets/shapes");
const inquirer = require("inquirer");

class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }
  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }
  setTextElement(text, textcolor) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textcolor}">${text}</text>`;
  }
  setShapeelement(shape) {
    this.shapeElement = shape.render();
  }
}
//questions for inquirer
questions = [
  {
    type: "input",
    message: "Please enter the 3 characters to present your logo",
    name: "text",
  },
  {
    type: "input",
    message: "Please enter color for logo text",
    name: "textcolor",
  },
  {
    type: "list",
    message: "Please choose a shape from below",
    name: "shape",
    choices: ["Square", "Circle", "Triangle"],
  },
  {
    type: "input",
    message: "Please enter color for logo",
    name: "logocolor",
  },
];

//writes file and created your logo.svg file
function writeToFile(filename, data) {
  fs.writeFile(filename, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("generated logo.svg");
  });
}

function logoGenerator() {
  var svgString = "";
  //questions prompt with inquirer
  inquirer.prompt(questions).then((responses) => {
    let shapeChoice = responses["shape"];
    let shapeColor = responses["logocolor"];
    let text = responses["text"];
    let textColor = responses["textcolor"];
    let filePath = "logo.svg";
    let userShape;

    //if statements for the shape choices which pull in the shape object per the choice
    if (shapeChoice === "Square") {
      userShape = new Square();
    } else if (shapeChoice === "Circle") {
      userShape = new Circle();
    } else if (shapeChoice === "Triangle") {
      userShape = new Triangle();
    } else console.log("Error in shape");
    userShape.setColor(shapeColor);

    // creating the SVG and then implementing the choices
    var svg = new Svg();
    svg.setTextElement(text, textColor);
    svg.setShapeelement(userShape);
    // rendering the string that will go into the svg file
    svgString = svg.render();
    
    writeToFile(filePath, svgString);
  });
}

logoGenerator();
