let gridSize = 20;
let points = [];
let P1, P2, P3, P4;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  P1 = createVector(-200, -200, -200);
  P2 = createVector(200, -200, -100); 
  P3 = createVector(-200, 200, 100);  
  P4 = createVector(200, 200, 200);  
  

  for (let u = 0; u <= gridSize; u++) {
    points[u] = [];
    for (let v = 0; v <= gridSize; v++) {
      let du = u / gridSize;
      let dv = v / gridSize;
      let Q = calculateCoonsSurface(du, dv);
      points[u][v] = Q;
    }
  }
}

function draw() {
  background(220);
  orbitControl(); 
  
  stroke(0);
  noFill();
  for (let u = 0; u < gridSize; u++) {
    for (let v = 0; v < gridSize; v++) {
      let p1 = points[u][v];
      let p2 = points[u + 1][v];
      let p3 = points[u][v + 1];
      let p4 = points[u + 1][v + 1];

      beginShape();
      vertex(p1.x, p1.y, p1.z);
      vertex(p2.x, p2.y, p2.z);
      vertex(p4.x, p4.y, p4.z);
      vertex(p3.x, p3.y, p3.z);
      endShape(CLOSE);
    }
  }
  
  drawProjections();
}


function calculateCoonsSurface(u, v) {
  let C1 = p5.Vector.lerp(P1, P3, u);
  let C2 = p5.Vector.lerp(P2, P4, u);
  
  let D1 = p5.Vector.lerp(P1, P2, v);
  let D2 = p5.Vector.lerp(P3, P4, v);
  
  //формула поверхні Кунса
  let Q = p5.Vector.add(
    p5.Vector.lerp(D1, D2, u),
    p5.Vector.lerp(C1, C2, v)
  );
  
  Q.z += 50 * sin(u * PI) * cos(v * PI);
  return Q;
}

function drawProjections() {
  //  x = 0
  stroke(255, 0, 0); //червона
  for (let u = 0; u < gridSize; u++) {
    for (let v = 0; v < gridSize; v++) {
      let p = points[u][v];
      line(0, p.y, p.z, 0, points[u + 1][v].y, points[u + 1][v].z);
    }
  }
  
  //  y = 0
  stroke(0, 255, 0); //зелена
  for (let u = 0; u < gridSize; u++) {
    for (let v = 0; v < gridSize; v++) {
      let p = points[u][v];
      line(p.x, 0, p.z, points[u + 1][v].x, 0, points[u + 1][v].z);
    }
  }
  
  // z = 0
  stroke(0, 0, 255); //синя
  for (let u = 0; u < gridSize; u++) {
    for (let v = 0; v < gridSize; v++) {
      let p = points[u][v];
      line(p.x, p.y, 0, points[u + 1][v].x, points[u + 1][v].y, 0);
    }
  }
}
