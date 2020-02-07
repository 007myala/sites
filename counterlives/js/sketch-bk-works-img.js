// OUAV Written by MARIa deniSE Yala
//
// Story Map - Last Modified 05/02/2020

let canvas;
let map;

let imgW; // story map
let imgH;

let centerX;
let centerY;

// Define the zoom vars
var zoomScale = 1;
var maxScale = 10;
var zoomFactor = 0.4;

// Define the pan vars
var panFromX;
var panFromY;

var panToX;
var panToY;

var xShift = 0;
var yShift = 0;

function preload(){
  map = loadImage('img/art.jpg');
}

function setup(){
  imgW = map.width;
  imgH = map.height;

  centerX = imgW / 2;
  centerY = imgH / 2;

  canvas = createCanvas(windowWidth, windowHeight);
  // canvas.mouseWheel(zoomStoryMap); // attach listener for activity on canvas only
}

function draw(){
  background(255);
  imageMode(CENTER);
  image(map, centerX, centerY, imgW, imgH);
  fill(255);
  ellipse(50,50,100,100);
}

// Pan function
function mousePressed(){
  if(mouseButton == LEFT){
    panFromX = mouseX;
    panFromY = mouseY;
  }
}

// Pan function - Touch
function touchStarted(){
  panFromX = mouseX;
  panFromY = mouseY;
  return false;
}

// Pan function continued
function mouseDragged(){
  if(mouseButton == LEFT){
    panToX = mouseX;
    panToY = mouseY;

    xShift = panToX - panFromX;
    yShift = panToY - panFromY;

    //Only pan with the image occupies the whole display
    if(centerX - imgW / 2 <= 0
    && centerX + imgW / 2 >= width
    && centerY - imgH / 2 <= 0
    && centerY + imgH / 2 >= height){
      centerX = centerX + xShift;
      centerY = centerY + yShift;
    }

    //Set the constraints for pan
    if(centerX - imgW / 2 > 0){
      centerX = imgW / 2;
    }

    if(centerX + imgW / 2 < width){
      centerX = width - imgW / 2;
    }

    if(centerY - imgH / 2 > 0){
      centerY = imgH / 2;
    }

    if(centerY + imgH / 2 < height){
      centerY = height - imgH / 2;
    }

    panFromX = panToX;
    panFromY = panToY;
  }
}

// Pan function continued - Touch
function touchMoved(){
  panToX = mouseX;
  panToY = mouseY;

  xShift = panToX - panFromX;
  yShift = panToY - panFromY;

  //Only pan with the image occupies the whole display
  if(centerX - imgW / 2 <= 0
  && centerX + imgW / 2 >= width
  && centerY - imgH / 2 <= 0
  && centerY + imgH / 2 >= height){
    centerX = centerX + xShift;
    centerY = centerY + yShift;
  }

  //Set the constraints for pan
  if(centerX - imgW / 2 > 0){
    centerX = imgW / 2;
  }

  if(centerX + imgW / 2 < width){
    centerX = width - imgW / 2;
  }

  if(centerY - imgH / 2 > 0){
    centerY = imgH / 2;
  }

  if(centerY + imgH / 2 < height){
    centerY = height - imgH / 2;
  }

  panFromX = panToX;
  panFromY = panToY;
}

// Zoom function
// Function fires with mousewheel mvt over canvas only
function zoomStoryMap(event){
}

function mouseWheel(event){
  var e = event.delta;
  print("You're mouse wheeling");
  // Zoom in
  if(e == -1){
    if(zoomScale < maxScale){
      zoomScale++;
      imgW = int(imgW * (1+zoomFactor));
      imgH = int(imgH * (1+zoomFactor));

      var oldCenterX = centerX;
      var oldCenterY = centerY;

      centerX = centerX - int(zoomFactor * (mouseX - centerX));
      centerY = centerY - int(zoomFactor * (mouseY - centerY));
    }
  }

  // Zoom out
  if(e == 1){
    if(zoomScale < 1){
      zoomScale = 1;
      imgW = map.width;
      imgH = map.height;
    }

    if(zoomScale > 1){
      zoomScale--;
      imgH = int(imgH/(1+zoomFactor));
      imgW = int(imgW/(1+zoomFactor));

      var oldCenterX = centerX;
      var oldCenterY = centerY;

      centerX = centerX + int((mouseX - centerX)*(zoomFactor/(zoomFactor+1)));
      centerY = centerY + int((mouseY - centerY)*(zoomFactor/(zoomFactor+1)));

      if(centerX - imgW / 2 > 0){
        centerX = imgW / 2;
      }

      if(centerX + imgW / 2 < width){
        centerX = width - imgW / 2;
      }

      if(centerY - imgH / 2 > 0){
        centerY = imgH / 2;
      }

      if(centerY + imgH / 2 < height){
        centerY = height - imgH / 2;
      }
    }
  }
}

function touchEnded(event){
  mouseWheel(event);
}
