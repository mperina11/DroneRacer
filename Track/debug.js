function debug_drawSectors() {
    //  x1,y1 ,x2,y2
    line(0, 0, 0, 600);
    line(300, 0, 300, 600);
    line(600, 0, 600, 600);
    line(900, 0, 900, 600);
    line(1200, 0, 1200, 600);
    line(0, 300, 1200, 300);
  }

  function debug_drawSectorOffsets() {
    for (let i=0; i < 4; i++) {
      line(Sectors[i].x1, 0, Sectors[i].x1, 600);
      line(Sectors[i].x2, 0, Sectors[i].x2, 600);
    }
    line(0, Sectors[0].y1, 1200, Sectors[0].y1);
    line(0, Sectors[0].y2, 1200, Sectors[0].y2);
    line(0, Sectors[7].y1, 1200, Sectors[7].y1);
    line(0, Sectors[7].y2, 1200, Sectors[7].y2);
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
  