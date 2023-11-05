// Control the number of frames in the bloom cycle
let cycleDuration = 2000;
let whiteDots = [];

let fireworks = []; // Can store multiple fireworks
let song;

function preload() {
  // add audio
  song = loadSound("audio/Real-Love.mp3");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(18, 88, 116); // Set background color
  angleMode(DEGREES);

  // Create 17 fireworks
  let positions = [
    { x: 0.14, y: 0.13 },
    { x: 0.43, y: 0.06 },
    { x: 0.73, y: -0.01 },
    { x: 0.04, y: 0.4 },
    { x: 0.33, y: 0.36 },
    { x: 0.63, y: 0.27 },
    { x: 0.95, y: 0.21 },
    { x: -0.02, y: 0.7 },
    { x: 0.24, y: 0.63 },
    { x: 0.56, y: 0.56 },
    { x: 0.86, y: 0.49 },
    { x: 0.16, y: 0.91 },
    { x: 0.47, y: 0.85 },
    { x: 0.76, y: 0.77 },
    { x: 1.00, y: 0.74 },
    { x: 0.67, y: 1.05 },
    { x: 0.95, y: 1.00 }
  ];
  // Use loop to create all fireworks
  for (let pos of positions) {
    fireworks.push(new Firework(pos.x * width, pos.y * height, 0.5, 1));
  }


  // Create randomly distributed white dots
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(5, 15);
    whiteDots.push(new WhiteDot(x, y, size));
  }




}



function draw() {
  let bgcol = color("#02496C");
  bgcol.setAlpha(5);
  background(bgcol);

  // Draw white dots
  for (let dot of whiteDots) {
    dot.show();
  }

  // Only draw and update fireworks if music is playing
  if (song.isPlaying()) {
    for (let fw of fireworks) {
      fw.show();
      fw.update();
    }
  }

  // Draw interaction hint text only if music is not playing
  if (!song.isPlaying()) {
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(255);
    noStroke();
    text("Click to control the animation", width / 2, height / 2);
  }

}

// Toggle playback on or off with a mouse click
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Update positions for fireworks
  fireworks.forEach((firework, index) => {
    firework.updatePosition(positions[index].x * width, positions[index].y * height);
  });

  // Update positions for white dots
  whiteDots.forEach(dot => {
    dot.updatePosition(random(width), random(height));
  });

}

class Firework {
  constructor(x, y, expansionSpeed, rotationSpeed) {
    // firework position
    this.x = x;
    this.y = y;

    this.cycleStartTime = millis();
    this.rotation = 0;
    // Set bloom speed
    this.expansionSpeed = expansionSpeed;
    // Set rotation speed
    this.rotationSpeed = rotationSpeed;

    let colors1 = "CFDDFB-FCA522-E1FFF6-FBD2D9".split("-").map(a => "#" + a);
    this.FireworkColor = color(random(colors1));
    let colors2 = "110671-239940-D9354B-CE57B1-E7853C-089494".split("-").map(a => "#" + a);
    this.circleColor1 = color(random(colors2));
    let colors3 = "2F3333-DF4558-58A06B-75B5E0-BA5BD8".split("-").map(a => "#" + a);
    this.circleColor2 = color(random(colors3));
    this.circleColor3 = color(random(colors3));
    this.circleColor4 = color(random(colors3));
  }

  // draw fireworks
  show() {
    push();
    translate(this.x, this.y);
    fill(this.FireworkColor);
    noStroke();

    // Set time
    let time = millis() - this.cycleStartTime;
    let t = (time % cycleDuration) / cycleDuration;

    let size = map(t, 0, 1, 0, min(windowWidth, windowHeight) / 6);

    // Update rotation speed
    this.rotation += this.rotationSpeed;
    rotate(this.rotation);

    for (let i = 0; i < 360; i += 10) {
      let ex = size * sin(i);
      let ey = size * cos(i);
      ellipse(ex, ey, 10, 10);
      circle(ex, ey, 10);

      push();
      fill(this.circleColor1);
      circle(ex, ey, 5)
      pop();
    }
    fill(this.circleColor2)
    circle(0, 0, 50)

    fill(this.circleColor3)
    circle(0, 0, 40)

    fill(this.circleColor4)
    circle(0, 0, 20)

    pop();
  }

  // Fireworks bloom repeatedly
  update() {
    if (millis() - this.cycleStartTime >= cycleDuration) {
      this.cycleStartTime = millis();
    }
  }

  updatePosition(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

}

class WhiteDot {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  updatePosition(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}