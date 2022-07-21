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
let debug = false;

// Points
let Points = [];
let gateEdges = [];

// Laps
let Finish = 5;
let finished = false;   

// Drones
let swarm; // hold drones 
let pause = true; // pause

// Player
let movingRight = false;
let movingLeft = false;
let movingUp = false;
let movingDown = false;
let player_speed = 4.2;
let player_color = 'white';
let player_pause = true;
let player_lap = 0; // init to 0
let player_current_gate = 0; // init to 0
let player_last_gate_passed = false;
let xpos = 10;
let ypos = 100;

function setup() {
  createCanvas(canvasW, canvasH);
  createButton("Reroll").mousePressed(() => { seed++; createPoints_Gates(); });
  createButton("Toggle Debug").mousePressed(() => { if (debug) {debug=false;} else {debug=true;} });
  createP(" 'n' to Start ");
  createP(" 'm' to Pause ");

  createPoints_Gates();

  swarm = new Swarm();
  for (let i=1; i < 5; i++) {
    let d = new Drone(10, 100 + 25*i);
    swarm.addDrone(d);
    console.log("D: ", d);
  }
  randomSeed(seed);
}

function draw() {
  // randomSeed(seed);
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

  Start();
  Pause();
  swarm.run();
  player_run();
  playerCheckGate();
  console.log("PG: ", player_current_gate);

  // Display
  let display_gate = player_current_gate;
  if (player_current_gate == 0) {
    display_gate = 8;
  }
  textSize(20);
  text("Current Lap = " + player_lap + " | Race Finished = " + finished +
       "\nGates Passed = " + display_gate, 10, 10, width/2, height/2);  

  for (let i=0; i < Points.length; i++) {
    fill('black');
    text(i+1, Points[i].x - 5, Points[i].y - 5, width/2, height/2);
  }

  if (player_lap == Finish) {
    pause = true;
    player_pause = true;
    finished = true;
  }

}

function Start() {
  if (key == 'n') {
    pause = false; 
    player_pause = false; 
  }
}

function Pause() {
  if (key == 'm') {
    pause = true; 
    player_pause = true;
  }
}

function player_run() {
  
  // draw moving character
  // fill(0, 0, 255);
  // ellipse(xpos, ypos, 75, 75);
  
  Type_B(xpos, ypos, player_color);

  if (!player_pause) {
    // update moving character
    if (movingRight) {
      xpos += player_speed;
    }
    if (movingLeft) {
      xpos -= player_speed;
    }
    if (movingUp) {
      ypos -= player_speed;
    }
    if (movingDown) {
      ypos += player_speed;
    }
}
}


function keyPressed() {
  if (key == 'w') {
    movingUp = true;
  }
  if (key == 'a') {
    movingLeft = true;
  }
  if (key == 's') {
    movingDown = true;
  }
  if (key == 'd') {
    movingRight = true;
  }
}

function keyReleased() {
  if (key == 'w') {
    movingUp = false;
  }
  if (key == 'a') {
    movingLeft = false;
  }
  if (key == 's') {
    movingDown = false;
  }
  if (key == 'd') {
    movingRight = false;
  }
}

function player_atGate() {

  let position = createVector(xpos, ypos);

  let p = createVector(Points[player_current_gate].x, Points[player_current_gate].y);
  let dst = p5.Vector.dist(position, p);

  if (dst < gateOffsetY) {
    return true;
  }

	return false;
}

function playerCheckGate() {
  if (player_atGate()) {

		// count lap
		if (player_current_gate == 0 && player_last_gate_passed) {
			player_lap++;
			console.log("PL: ", player_lap);
		}
		// next gate
		player_current_gate++;
		// check last gate 
		if (player_current_gate == 8) {
			player_current_gate = 0; // back to start
			player_last_gate_passed = true;
		}
	}
}