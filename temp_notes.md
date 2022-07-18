Drone() {
	this.current_gate = 0; // init to 0
	this.position = createVector(x, y);
	this.lap = 0; // init to 0
	this.last_gate_passed = false; // at last gate to track lap
}

update() {
	if (this.atGate()) {
		// count lap
		if (this.current_gate == 0 && this.last_gate_passed) {
			this.lap++;
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


findGate() {
	seek(Points[this.current_gate]);
}


atGate() {
	let x_dst = p5.Vector.dist(this.position, Points[this.current_gate]);
	let y_dst = p5.Vector.dist(this.position, Points[this.current_gate]);
	
	if (x_dst < 2 && y_dst < 2) {
		return true;
	}
	
	return false;
}
