/* eslint-disable no-undef, no-unused-vars */

var x = 0;
var y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  // Put setup code here
}

function sqraure() {
  stroke(54, 204, 37);
  strokeWeight(4);
  line(mouseX, mouseY, mouseX + 20, mouseY);
  line(mouseX, mouseY + 20, mouseX + 20, mouseY + 20);
  line(mouseX, mouseY + 20, mouseX, mouseY);
  line(mouseX + 20, mouseY + 20, mouseX + 20, mouseY);

  line(mouseX + 10, mouseY, mouseX + 10, 0);
  line(mouseX + 10, mouseY + 20, mouseX + 10, windowHeight);
  line(mouseX, mouseY + 10, 0, mouseY + 10);
  line(mouseX + 20, mouseY + 10, windowWidth, mouseY + 10);
}

function draw() {
  background(0);
  // Put drawings here
  //fill(234, 31, 81);
  //noStroke();

  //rect(x, y, 20, 20);

  sqraure();
  //stroke(54, 204, 37);
  //strokeWeight(4);
  //line(x, y, x + 5, y);
  //stroke(126);
  //stroke(255);

  x = x + 1;
  y = y + 1;
  //fill(255);
  //textStyle(BOLD);
  //textSize(140);
  //text("p5*", 60, 250);

  //fill(234, 31, 81);
  //noStroke();
  //rect(x, y, 5, 5);

  redraw();
}

function mousePressed() {}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
