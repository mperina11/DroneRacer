function Swarm() {
  this.drones = [];
}

Swarm.prototype.run = function () {
  for (let i = 0; i < this.drones.length; i++) {
    this.drones[i].run(this.drones);  // Passing the entire list of boids to each boid individually
    // console.log("Drone Current Gate: ", this.drones[i].current_gate);
  }
}

Swarm.prototype.addDrone = function (b) {
  this.drones.push(b);
}


function Drone(x, y) {
  this.current_gate = 0; // init to 0
	this.lap = 0; // init to 0
	this.last_gate_passed = false; // at last gate to track lap
  // this.type = random(droneTypesSelect);
  // console.log("T: ", this.type);
  let sign;
  if (random(0, 1) < 0.5) {
    sign = 1;
  }
  else {
    sign = -1;
  }

  this.current_gateOffset = sign * (gateOffsetY/(random(1,3)));
  // console.log("CO: ", this.current_gateOffset);
  // this.current_gateOffset = 0; // init to 0

  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.position = createVector(x, y);
  this.r = 4.0;
  // this.maxspeed = 3;    // Maximum speed
  this.maxspeed = random(4,5);
  this.maxforce = 0.05; // Maximum steering force
  this.color = random(mix);
}

Drone.prototype.run = function (drones) {
  if (!pause) {
    this.swarm(drones);
    this.update();
}
  
  this.render();
}

Drone.prototype.applyForce = function (force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Drone.prototype.swarm = function (drones) {
  let sep = this.separate(drones);   // Separation
  // let avo = this.avoid(drones);      // Avoid walls + Box
  let gat = this.findGate(drones);       // Feed
  // Arbitrarily weight these forces
  sep.mult(5.0);
  // avo.mult(3.0);
  gat.mult(7.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  // this.applyForce(avo);
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

  // 
  if (this.atGate()) {

    // update offset
    let sign;
    if (random(0, 1) < 0.5) {
      sign = 1;
    }
    else {
      sign = -1;
    }
    this.current_gateOffset = sign * (gateOffsetY / (random(1, 3)));
    // console.log("CO: ", this.current_gateOffset);
    this.maxspeed = random(4,5);

		// count lap
		if (this.current_gate == 0 && this.last_gate_passed) {
			this.lap++;
      // console.log("Lap: ", this.lap);
		}
		// next gate
		this.current_gate++;
		// check last gate 
		if (this.current_gate == 8) {
			this.current_gate = 0; // back to start
			this.last_gate_passed = true;
		}
	}
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
  Type_B(this.position.x, this.position.y, this.color);
}


// Separation
// Method checks for nearby boids and steers away
Drone.prototype.separate = function (drones) {
  let desiredseparation = 50.0;
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

Drone.prototype.findGate = function () {
  let p = createVector(Points[this.current_gate].x, Points[this.current_gate].y + this.current_gateOffset);
  let find = this.seek(p);
  // circle(p.x, p.y, 10); // Debug circle
  return find;
}

// check if drone is at gate
Drone.prototype.atGate = function () {
  let p = createVector(Points[this.current_gate].x, Points[this.current_gate].y + this.current_gateOffset);
  let dst = p5.Vector.dist(this.position, p);

  if (dst < 4) {
    return true;
  }

	return false;
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

  return steer;
}
