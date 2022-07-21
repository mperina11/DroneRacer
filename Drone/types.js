function Type_A() { // Four Rings
    push();

    let x = 300;
    let y = 150;
    let size = 15;

    noFill();
    stroke(255, 204, 0);
    strokeWeight(3);
    translate(x, y);

    beginShape();

    circle(x - size / 2, y + size / 2, size);
    circle(x - size / 2, y - size / 2, size);
    circle(x + size / 2, y + size / 2, size);
    circle(x + size / 2, y - size / 2, size);

    endShape();

    pop();
}

function Type_B() { //
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + radians(90);
    // fill(127);
    // fill('#F679E5');
    fill(this.color);
    // stroke(200);
    push();
    noStroke();
    translate(this.position.x, this.position.y);
    // rotate(theta);

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

function Type_C() {
    
}