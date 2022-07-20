// Canvas
const canvasW = 1200;
const canvasH = 600;

// Gates sizes
const gateW = 30;
const gateH = 75;
const gateOffsetX = gateW/2;
const gateOffsetY = gateH/2;

// seed
let seed = 123456;

// Colors
const mix =  ["#9B5DE5","#F15BB5","#FEE440","#00BBF9","#00F5D4", "#FFBE0B","#FB5607","#FF006E","#8338EC","#3A86FF"];
const rainbow = ["#FF0000","#FF8700","#FFD300","#DEFF0A","#A1FF0A","#0AFF99","#0AEFFF","#147DF5","#580AFF","#BE0AFF"];
let gate_color;

// Debug Flag
let debug = true;

// Points
let Points = [];
let gateEdges = [];

// Drones
let swarm; // hold drones 

function setup() {
  createCanvas(canvasW, canvasH);
  createButton("Reroll").mousePressed(() => { seed++; createPoints_Gates(); });
  createButton("Toggle Debug").mousePressed(() => { if (debug) {debug=false;} else {debug=true;} });
  createP("- text here");

  createPoints_Gates();

  swarm = new Swarm();
  for (let i=0; i < 1; i++) {
    let d = new Drone(50, 100);
    swarm.addDrone(d);
    console.log("D: ", d);
  }
}

function draw() {
  randomSeed(seed);
  background('#219ebc');

  // Debug
  if (debug) {
    // debug_drawSectors();
    debug_drawSectorOffsets();
    // debug_drawPoints();
    // debug_drawPointLines();
    debug_drawRectPoints();
  }
  
  // Draw Track
  createGates();
  createTrackCornersLeft();
  createTrackCornersRight();
  createTrackLines();

  // Run Drones
  // testDraw();

  swarm.run();
}

function testDraw() { // Test Drone Shape
  push();
  
  fill('yellow');
  noStroke();
  translate(500, 200);
  
  beginShape();

  // Top Left
  vertex(5, -5); 
  vertex(20, -10);
  vertex(25, -25);
  vertex(10, -20);
  vertex(5, -5);

  // Bottom Right
  vertex(5, 5); 
  vertex(20, 10);
  vertex(25, 25);
  vertex(10, 20);
  vertex(5, 5);

  // Bottom Left
  vertex(-5, 5); 
  vertex(-20, 10);
  vertex(-25, 25);
  vertex(-10, 20);
  vertex(-5, 5);

  // Top Left
  vertex(-5, -5); 
  vertex(-20, -10);
  vertex(-25, -25);
  vertex(-10, -20);
  vertex(-5, -5);

  endShape();
  
  pop();
}
