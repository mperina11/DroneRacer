function createPoints_Gates() {
    for (let i=0; i < Sectors.length; i++) {
      Points[i] = {
        "p": i + 1,
        "x": random(Sectors[i].x1, Sectors[i].x2),
        "y": random(Sectors[i].y1, Sectors[i].y2)
      };
    }
  
    for (let i = 0; i < Sectors.length; i++) {
      gateEdges[i] = {
        "g": i + 1,
        "tl_x": Points[i].x - gateOffsetX, // Top Left
        "tl_y": Points[i].y - gateOffsetY,
        "tr_x": Points[i].x + gateOffsetX, // Top Right
        "tr_y": Points[i].y - gateOffsetY,
        "bl_x": Points[i].x - gateOffsetX, // Bottom Left
        "bl_y": Points[i].y + gateOffsetY,
        "br_x": Points[i].x + gateOffsetX, // Bottom Right
        "br_y": Points[i].y + gateOffsetY,
      };
    }
  
    gate_color = random(mix);

    // console.log(Points);
    // console.log(gateEdges);
  }
  
  function createGates() {
    fill(gate_color);
    for (let i=0; i < Points.length; i++) {
        rect(Points[i].x - gateOffsetX, Points[i].y - gateOffsetY, gateW, gateH);    
    }
  }
  
  function createTrackCornersLeft() {
    // A = 1_bl
    // B = 8_tl
    // C = 1_tl
    // D = 8_bl
  
    // 1B to 8T
    let A = createVector(gateEdges[0].bl_x, gateEdges[0].bl_y);
    let B = createVector(gateEdges[7].tl_x, gateEdges[7].tl_y);
    
    let dist = p5.Vector.dist(A, B);
    let ab1 = dist * 0.25;
    let ab2 = dist * 0.75;  
    
    let unit_ab = p5.Vector.sub(A, B);
    unit_ab.normalize();
    
    let p_ab1 = createVector(B.x + unit_ab.x * ab1, B.y + unit_ab.y * ab1);
    let p_ab2 = createVector(B.x + unit_ab.x * ab2, B.y + unit_ab.y * ab2);  
  
    // fill('red');
    // circle(p_ab1.x, p_ab1.y, 10);
    // circle(p_ab2.x, p_ab2.y, 10);
  
    p_ab1.x -= 25;
    p_ab2.x -= 25;
    // fill('green');
    // circle(p_ab1.x, p_ab1.y, 10);
    // circle(p_ab2.x, p_ab2.y, 10);
  
    noFill();
    push();
    bezier(gateEdges[7].tl_x, gateEdges[7].tl_y, p_ab1.x, p_ab1.y, p_ab2.x, p_ab2.y, gateEdges[0].bl_x, gateEdges[0].bl_y);
    pop();
  
    // 1T to 8B
    let C = createVector(gateEdges[0].tl_x, gateEdges[0].tl_y);
    let D = createVector(gateEdges[7].bl_x, gateEdges[7].bl_y);
    dist = p5.Vector.dist(C,D);
    let cd1 = dist * 0.25;
    let cd2 = dist * 0.75;
    
    let unit_cd = p5.Vector.sub(C, D);
    unit_cd.normalize(); 
    
    let p_cd1 = createVector(D.x + unit_cd.x * cd1, D.y + unit_cd.y * cd1);
    let p_cd2 = createVector(D.x + unit_cd.x * cd2, D.y + unit_cd.y * cd2);
  
    p_cd1.x -= 25*4;
    p_cd2.x -= 25*4;   
    
    push();
    bezier(gateEdges[7].bl_x, gateEdges[7].bl_y, p_cd1.x, p_cd1.y, p_cd2.x, p_cd2.y, gateEdges[0].tl_x, gateEdges[0].tl_y);
    pop();
  }
  
  function createTrackCornersRight() {
    // A = 3_br
    // B = 4_tr
    // C = 3_tr
    // D = 4_br
  
    // 3B to 4T
    let A = createVector(gateEdges[3].br_x, gateEdges[3].br_y);
    let B = createVector(gateEdges[4].tr_x, gateEdges[4].tr_y);
    
    let dist = p5.Vector.dist(A, B);
    let ab1 = dist * 0.25;
    let ab2 = dist * 0.75;  
    
    let unit_ab = p5.Vector.sub(A, B);
    unit_ab.normalize();
    
    let p_ab1 = createVector(B.x + unit_ab.x * ab1, B.y + unit_ab.y * ab1);
    let p_ab2 = createVector(B.x + unit_ab.x * ab2, B.y + unit_ab.y * ab2);  
  
    // fill('red');
    // circle(p_ab1.x, p_ab1.y, 10);
    // circle(p_ab2.x, p_ab2.y, 10);
  
    p_ab1.x += 25;
    p_ab2.x += 25;
    // fill('green');
    // circle(p_ab1.x, p_ab1.y, 10);
    // circle(p_ab2.x, p_ab2.y, 10);
  
    noFill();
    push();
    bezier(gateEdges[4].tr_x, gateEdges[4].tr_y, p_ab1.x, p_ab1.y, p_ab2.x, p_ab2.y, gateEdges[3].br_x, gateEdges[3].br_y);
    pop();
  
    // 3T to 4B
    let C = createVector(gateEdges[3].tr_x, gateEdges[3].tr_y);
    let D = createVector(gateEdges[4].br_x, gateEdges[4].br_y);
    dist = p5.Vector.dist(C,D);
    let cd1 = dist * 0.25;
    let cd2 = dist * 0.75;
    
    let unit_cd = p5.Vector.sub(C, D);
    unit_cd.normalize(); 
    
    let p_cd1 = createVector(D.x + unit_cd.x * cd1, D.y + unit_cd.y * cd1);
    let p_cd2 = createVector(D.x + unit_cd.x * cd2, D.y + unit_cd.y * cd2);
  
    p_cd1.x += 25*4;
    p_cd2.x += 25*4;   
    
    push();
    bezier(gateEdges[4].br_x, gateEdges[4].br_y, p_cd1.x, p_cd1.y, p_cd2.x, p_cd2.y, gateEdges[3].tr_x, gateEdges[3].tr_y);
    pop();
  }
  
  function createTrackLines() {
    for (let i=0; i < 3; i++) {
      line(gateEdges[i].tr_x, gateEdges[i].tr_y, gateEdges[i+1].tl_x, gateEdges[i+1].tl_y);
      line(gateEdges[i].br_x, gateEdges[i].br_y, gateEdges[i+1].bl_x, gateEdges[i+1].bl_y);
    }
    for (let i=4; i < 7; i++) {
      line(gateEdges[i].tl_x, gateEdges[i].tl_y, gateEdges[i+1].tr_x, gateEdges[i+1].tr_y);
      line(gateEdges[i].bl_x, gateEdges[i].bl_y, gateEdges[i+1].br_x, gateEdges[i+1].br_y);
    }
  }