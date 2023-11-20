class Shape {
  constructor() {
    this.logocolor = "";
  }
  setColor(logocolor) {
    this.logocolor = logocolor;
  }
}

class Circle extends Shape {
  render() {
    return `<circle cx="150" cy="100" r="100" fill="${this.logocolor}"/>`;
  }
}

class Square extends Shape {
  render() {
    return `<rect x="50" height="200" width="200" fill="${this.logocolor}"/>`;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.logocolor}"/>`;
  }
}

module.exports = { Circle, Square, Triangle };
