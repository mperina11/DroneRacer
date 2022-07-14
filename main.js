// Canvas
const canvasW = 1000;
const canvasH = 500;

// seed
let seed = 12345;

// Colors
const mix =  ["#9B5DE5","#F15BB5","#FEE440","#00BBF9","#00F5D4", "#FFBE0B","#FB5607","#FF006E","#8338EC","#3A86FF"];
const rainbow = ["#FF0000","#FF8700","#FFD300","#DEFF0A","#A1FF0A","#0AFF99","#0AEFFF","#147DF5","#580AFF","#BE0AFF"];

// Debug Flag
let debug = true;

// Points
let Points = [];


function setup() {
  createCanvas(canvasW, canvasH);
  createButton("Reroll").mousePressed(() => { seed++; createPoints(); });
  createP("- Something");

  createPoints();


//   flock = new Flock();
//   // Add an initial set of boids into the system
//   for (let i = 0; i < 20; i++) {
//     let b = new Boid(width / 2,height / 2);
//     flock.addBoid(b);
//   }
}

function draw() {
  randomSeed(seed);
  background('#219ebc');

  // Debug
  if (debug) {
    debug_drawSectors();
    debug_drawPoints();
    debug_drawPointLines();
  }

  createGates();

}

function createPoints() {
  for (let i=0; i < Sectors.length; i++) {
    Points[i] = {
      "p": i + 1,
      "x": random(Sectors[i].x1, Sectors[i].x2),
      "y": random(Sectors[i].y1, Sectors[i].y2)
    };
  }
  console.log(Points);
}

function createGates() {
  fill('orange');
  for (let i=0; i < Points.length; i++) {
    rect(Points[i].x, Points[i].y, 20, 50);
  }
}

function debug_drawSectors() {
  //  x1,y1 ,x2,y2
  line(0, 0, 0, 500);
  line(250, 0, 250, 500);
  line(500, 0, 500, 500);
  line(750, 0, 750, 500);
  line(1000, 0, 1000, 500);
  line(0, 250, 1000, 250);
}

function debug_drawPoints() {
  fill('red');
  for (let i=0; i < Points.length; i++) {
    circle(Points[i].x, Points[i].y, 10);
  }
}

function debug_drawPointLines() {
  for (let i=0; i < Points.length; i++) {
    if (i == 7) { // end to start
      line(Points[i].x, Points[i].y, Points[0].x, Points[0].y);
    }
    else {
      line(Points[i].x, Points[i].y, Points[i+1].x, Points[i+1].y);
    }
  }}