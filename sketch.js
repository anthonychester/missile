/* eslint-disable no-undef, no-unused-vars */

var x = 0;
var y = 0;

var Pspeed = 1;
var Espeed = 1;

var tests = "";

x = Math.floor(Math.random() * 200) + 1;
y = Math.floor(Math.random() * 200) + 1;

entitys = {
  groups: 2,
  enemies: [],
  protect: []
};

function add(who, xx = 0, yy = 0) {
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
      color: "#FF0000",
      health: 0,
      timer: 100
    });
  } else if (who === "protect") {
    //x = 250; //Math.floor(Math.random() * 200) + 1;
    //y = 440; //Math.floor(Math.random() * 200) + 1;
    entitys.protect.push({
      x: xx,
      y: yy,
      sx: xx,
      sy: yy,
      sta: 1,
      c: 0,
      cc: 0,
      color: "#3EFF03",
      change: {
        x: Pspeed,
        y: Pspeed
      },
      health: 1
    });
  }
}

add("protect", 250, 440);
add("protect", 350, 220);

for (var i = 0; i < 9; i++) {
  add("enemies");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  // Put setup code here
}

function bomb() {}

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

drawOn = {
  enemies: () => {
    for (var i = 0; i < entitys.enemies.length; i++) {
      if (entitys.enemies[i].sta === 1) {
        if (
          entitys.enemies[i].x < mouseX + 30 &&
          entitys.enemies[i].x > mouseX - 10 &&
          entitys.enemies[i].y < mouseY + 30 &&
          entitys.enemies[i].y > mouseY - 10
        ) {
          entitys.enemies[i].color = "#FFF003";
        } else {
          entitys.enemies[i].color = "#FF0000";
        }
      }
    }

    for (i = 0; i < entitys.enemies.length; i++) {
      fill(entitys.enemies[i].color);
      noStroke();
      rect(entitys.enemies[i].x, entitys.enemies[i].y, 20, 20);
    }
  },
  protect: () => {
    for (var i = 0; i < entitys.protect.length; i++) {
      if (entitys.protect[i].sta === 1) {
        fill(entitys.protect[i].color);
        noStroke();
        rect(entitys.protect[i].x, entitys.protect[i].y, 20, 20);

        stroke(255);
        strokeWeight(4);
        fill("#FFFFFF");
        Hsize = 30 * entitys.protect[i].health;
        rect(entitys.protect[i].x - 5, entitys.protect[i].y - 6, Hsize, 2);
      } else if (entitys.protect[i].sta === 2) {
      }
    }
  },
  all: () => {}
};

UpdateOn = {
  enemies: () => {
    for (i = 0; i < entitys.enemies.length; i++) {
      if (entitys.enemies[i].timer === 100) {
      } else {
        entitys.enemies[i].timer = entitys.enemies[i].timer + 1;
      }
      if (entitys.enemies[i].sta !== 0 && entitys.enemies[i].sta !== 2) {
        if (entitys.enemies[i].x === windowHeight - 1) {
          entitys.enemies[i].x = entitys.enemies[i].sx;
          entitys.enemies[i].y = entitys.enemies[i].sy;
        } else {
          var tx = 0; //entitys.enemies[i].x + 1;
          var ty = 0;

          for (ii = 0; ii < entitys.protect.length; ii++) {
            if (
              entitys.enemies[i].x < entitys.protect[ii].x + 30 &&
              entitys.enemies[i].x > entitys.protect[ii].x - 10 &&
              entitys.enemies[i].y < entitys.protect[ii].y + 30 &&
              entitys.enemies[i].y > entitys.protect[ii].y - 10
            ) {
              if (entitys.enemies[i].timer === 100) {
                if (entitys.protect[ii].health < 0) {
                  entitys.protect[ii].sta = 2;
                } else {
                  entitys.protect[ii].health = entitys.protect[ii].health - 0.1;
                  entitys.enemies[i].timer = 0;
                }
              }
            }

            //tests = ii;
            //entitys.enemies[i].y + 1;

            var dx = 0;
            var dy = 0;
            if (entitys.protect[ii].sta === 1) {
              var px = entitys.protect[ii].x;
              var py = entitys.protect[ii].y;
              var ex = entitys.enemies[i].x;
              var ey = entitys.enemies[i].y;

              var crdx = px - ex;
              var crdy = py - ey;

              var cdx = Math.abs(crdx);
              var cdy = Math.abs(crdy);

              //tests = ey;
              //tests = tests + ", " + py;
              if (cdx > tx) {
                tx = px;
              }
              if (cdy > ty) {
                ty = py;
              }
            }
          }

          //tests = tests + ", " + tx;

          if (tx === entitys.enemies[i].x) {
            entitys.enemies[i].x = entitys.enemies[i].x + 0;
          } else if (tx > entitys.enemies[i].x) {
            entitys.enemies[i].x = entitys.enemies[i].x + Espeed;
          } else if (tx < entitys.enemies[i].x) {
            entitys.enemies[i].x = entitys.enemies[i].x - Espeed;
          }

          if (ty === entitys.enemies[i].y) {
            entitys.enemies[i].y = entitys.enemies[i].y + 0;
          } else if (ty > entitys.enemies[i].y) {
            entitys.enemies[i].y = entitys.enemies[i].y + Espeed;
          } else if (ty < entitys.enemies[i].y) {
            entitys.enemies[i].y = entitys.enemies[i].y - Espeed;
          }
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
  },
  protect: () => {
    for (i = 0; i < entitys.protect.length; i++) {
      if (entitys.protect[i].x < 0 || entitys.protect[i].x > windowWidth) {
        entitys.protect[i].change.x = -entitys.protect[i].change.x;
      }
      if (entitys.protect[i].y < 0 || entitys.protect[i].y > windowWidth) {
        entitys.protect[i].change.y = -entitys.protect[i].change.y;
      }
      entitys.protect[i].x = entitys.protect[i].x + entitys.protect[i].change.x;
      entitys.protect[i].y = entitys.protect[i].y + entitys.protect[i].change.y;
    }
  },
  all: () => {}
};

drawOn.all();

function draw() {
  background(0);
  // Put drawings here
  drawOn.enemies();
  drawOn.protect();

  sqraure();

  //stroke(54, 204, 37);
  //strokeWeight(4);
  //line(x, y, x + 5, y);
  //stroke(126);
  //stroke(255);
  UpdateOn.enemies();
  UpdateOn.protect();

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
  //tests = "press";
  for (var i = 0; i < entitys.enemies.length; i++) {
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
