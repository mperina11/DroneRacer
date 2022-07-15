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
    }
  }
  
  function debug_drawRectPoints() {
    fill('red');
    for (let i=0; i < gateEdges.length; i++) {
      circle(gateEdges[i].tl_x, gateEdges[i].tl_y, 10);
      circle(gateEdges[i].tr_x, gateEdges[i].tr_y, 10);
      circle(gateEdges[i].bl_x, gateEdges[i].bl_y, 10);
      circle(gateEdges[i].br_x, gateEdges[i].br_y, 10);
    }
  }
  