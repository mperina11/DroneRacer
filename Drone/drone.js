function Swarm() {
  this.drones = [];
}

Swarm.prototype.run = function () {
  for (let i = 0; i < this.drones.length; i++) {
    this.drones[i].run(this.drones);  // Passing the entire list of boids to each boid individually
  }
}

Swarm.prototype.addDrone = function (b) {
  this.drones.push(b);
}


function Drone(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 4.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
  this.color = random(mix);
}

Drone.prototype.run = function (drones) {
  this.swarm(drones);
  this.update();
  // this.borders();
  this.render();
}

Drone.prototype.applyForce = function (force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Drone.prototype.swarm = function (drones) {
  let sep = this.separate(drones);   // Separation
  let avo = this.avoid(drones);      // Avoid walls + Box
  let gat = this.findGate(drones);       // Feed
  // Arbitrarily weight these forces
  sep.mult(10.0);
  avo.mult(3.0);
  gat.mult(10.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(avo);
  this.applyForce(gat);
}


// Method to update location
Drone.prototype.update = function () {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Drone.prototype.seek = function (target) {
  let desired = p5.Vector.sub(target, this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Drone.prototype.render = function () {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
  // fill(127);
  // fill('#F679E5');
  fill(this.color);
  // stroke(200);
  noStroke();
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);

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

// Wraparound
Drone.prototype.borders = function () {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Drone.prototype.separate = function (drones) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < drones.length; i++) {
    let d = p5.Vector.dist(this.position, drones[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, drones[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

Drone.prototype.findGate = function (drones) {
  let eat = createVector(0, 0);

  if (feed_flag) {
    eat = this.seek(feedPosition);
  }

  return eat;
}

// check if drone is at gate
Drone.prototype.atGate = function () {
  // at gate
  // return true;

  // not at gate
  // return false;
}


Drone.prototype.avoid = function (drones) {
  let steer = createVector(0, 0);

  // Avoid Walls
  if (this.position.x <= 0) {
    steer.add(createVector(1, 0));
  }
  if (this.position.x > canvasW) { // width of canvas
    steer.add(createVector(-1, 0));
  }
  if (this.position.y <= 0) {
    steer.add(createVector(0, 1));
  }
  if (this.position.y > canvasH) { // height of canvas
    steer.add(createVector(0, -1));
  }

  // Avoid Bottom Box
  // rect(220, 290, 200, 220, 20, 20);
  // LeftSide
  // if (this.position.x == 210 && this.position.y >= 280) {
  //   steer.add(createVector(0, 1));
  // }
  // // Top+
  // if (this.position.x >= 210 && this.position.x <= 430 && this.position.y >= 280) {
  //   steer.add(createVector(0, -1));
  // }
  // if (this.position.x == 430 && this.position.y >= 280) {
  //   steer.add(createVector(0, 1));
  // }


  return steer;
}
