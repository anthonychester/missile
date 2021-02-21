/* eslint-disable no-undef, no-unused-vars */

var x = 0;
var y = 0;

var tests = "";

x = Math.floor(Math.random() * 200) + 1;
y = Math.floor(Math.random() * 200) + 1;

entitys = {
  groups: 1,
  enemies: []
};

function add(who) {
  if (who === "enemies") {
    x = Math.floor(Math.random() * 200) + 1;
    y = Math.floor(Math.random() * 200) + 1;
    entitys.enemies.push({
      x: x,
      y: y,
      sx: x,
      sy: y,
      sta: 1,
      c: 0,
      cc: 0,
      color: "#FF0000"
    });
  }
}

for (var i = 0; i < 9; i++) {
  add("enemies");
}

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
  for (var i = 0; i < entitys.enemies.length; i++) {
    fill(entitys.enemies[i].color);
    noStroke();
    rect(entitys.enemies[i].x, entitys.enemies[i].y, 20, 20);
  }
  sqraure();

  //stroke(54, 204, 37);
  //strokeWeight(4);
  //line(x, y, x + 5, y);
  //stroke(126);
  //stroke(255);
  for (i = 0; i < entitys.enemies.length; i++) {
    if (entitys.enemies[i].sta !== 0 && entitys.enemies[i].sta !== 2) {
      if (entitys.enemies[i].x === windowHeight - 1) {
        entitys.enemies[i].x = entitys.enemies[i].sx;
        entitys.enemies[i].y = entitys.enemies[i].sy;
      } else {
        entitys.enemies[i].x = entitys.enemies[i].x + 1;
        entitys.enemies[i].y = entitys.enemies[i].y + 1;
      }
    } else if (entitys.enemies[i].sta === 2) {
      entitys.enemies[i].c = entitys.enemies[i].c + 1;
      if (entitys.enemies[i].c === 10) {
        entitys.enemies[i].cc = entitys.enemies[i].cc + 1;
        entitys.enemies[i].c = 0;
        if (entitys.enemies[i].color === "#FFFFFF") {
          entitys.enemies[i].color = "#000000";
        } else {
          entitys.enemies[i].color = "#FFFFFF";
        }
      }
      if (entitys.enemies[i].cc === 4) {
        entitys.enemies[i].sta = 0;
      }
    }
  }

  fill(255);
  textStyle(BOLD);
  textSize(20);
  text(tests, 60, 250);

  //fill(234, 31, 81);
  //noStroke();
  //rect(x, y, 5, 5);

  redraw();
}

function mousePressed() {
  texts = "press";
  for (i = 0; i < entitys.enemies.length; i++) {
    if (
      entitys.enemies[i].x < mouseX + 30 &&
      entitys.enemies[i].x > mouseX - 10 &&
      entitys.enemies[i].y < mouseY + 30 &&
      entitys.enemies[i].y > mouseY - 10
    ) {
      entitys.enemies[i].sta = 2;
    }
  }
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
