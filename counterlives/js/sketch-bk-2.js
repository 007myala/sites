// OUAV Written by MARIa deniSE Yala
//
// Story Map - Last Modified 05/02/2020
// Scroll Down - https://editor.p5js.org/projects/S1w4g9gT
// ProcessingMapZoomPan - https://github.com/jinlong25/ProcessingMapZoomPan/blob/master/ProcessingMapZoomPan.pde
//

let canvas;
let map;

function preload(){
  map = loadImage('img/art.jpg');
}

// Keep the canvas centered on the web-page
function centerCanvas(){
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x,y);
  canvas.style('z-index','-1');
}

function setup(){
  canvas = createCanvas(200, 200);
  canvas.style('display','block');
  centerCanvas();
}

function draw(){
  background(0);
  fill(255);
  ellipse(100,100,10,10);
}

function windowResized(){
  centerCanvas();
  // resizeCanvas() // For when canvas is background...
}
