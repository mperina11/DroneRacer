
let canvasW = 1000;
let canvasH = 500;

const mix =  ["#9B5DE5","#F15BB5","#FEE440","#00BBF9","#00F5D4", "#FFBE0B","#FB5607","#FF006E","#8338EC","#3A86FF"];
const rainbow = ["#FF0000","#FF8700","#FFD300","#DEFF0A","#A1FF0A","#0AFF99","#0AEFFF","#147DF5","#580AFF","#BE0AFF"];

function setup() {
  createCanvas(canvasW, canvasH);
  // createP("Boid Count: " + flock_size);
  createP("- Something");

//   flock = new Flock();
//   // Add an initial set of boids into the system
//   for (let i = 0; i < 20; i++) {
//     let b = new Boid(width / 2,height / 2);
//     flock.addBoid(b);
//   }
}

function draw() {
  background('#219ebc');
  
  keyPressed();
}

// Add a new boid into the System
function mouseDragged() {
//   flock.addBoid(new Boid(mouseX, mouseY));
}

function keyPressed() {
//   if (keyCode === UP_ARROW) {
//     conv_flag = true;
//   }
}

