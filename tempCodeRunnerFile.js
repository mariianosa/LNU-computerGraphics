function draw() {
  background(220);
  orbitControl();

  
  // Малюємо саму поверхню
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
  
  // Проекції на площини
  drawProjections();
}