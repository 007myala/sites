/*
  Fortune-Teller (HIV History) Game
  Demo for fortune-teller game - Thesis prototype 2
  Ver: 1.0
  Last Modified: 08 / 01 / 2020

  Ball - pic <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  Magic - Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  Witch Hat - Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  Wictch - Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  Tarot - Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  Tarot Knife - Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  Stars bg - jeremy-perkins-FsK54FVNRfM-unsplash
*/

var canvas;
let starsBg;
var personas = ['A','B','C','D','E','F','G'];
var topics = ['H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
               11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
               21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
var luckyNos = [1, 2, 3, 4, 7, 9, 11, 13, 26, 14, 16, 17, 19, 27, 20, 22, 23, 10];
var unluckyNos = [5, 6, 8, 12, 15, 18, 21, 24, 25, 28, 29, 30];
var personaLocked = false;
var topicLocked = false;
var luckLocked = false;
var isLucky = false;
var persona = '';
var topic = '';
var magicNum = 0;
var clickX = 0;
var clickY = 0;
var pX = 0;
var pY = 0;
var tX = 0;
var tY = 0;
var nX = 0;
var nY = 0;

var pTiles = [];
var tTiles = [];
var nTiles = [];

var haveFound = "- nothing yet";

function preload(){
  starsBg = loadImage('../fortuneteller/img/stars.jpg');
}
function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display','block');

  var w = 0; // increments of 50
  for(var i=0; i < 7; i++){
    var p = new Persona(w,personas[i]);
    pTiles.push(p);
    w = w + 50;
  }

  w = 0;
  for(var i=0; i < 10; i++){
    var t = new Topic(w,topics[i]);
    tTiles.push(t);
    w = w + 50;
  }

  w = 0;
  var c = 0;
  var row;
  for(var i=0; i < 30; i++){
    // make 2 rows of 15 tiles each
    if(i<15){
      row = 1;
    } else {
      row = 2;
    }
    var n;
    if(row == 1){
      n = new MagicNum(w,numbers[i],row);
      w = w + 50;
    } else {
      n = new MagicNum(c,numbers[i],row);
      c = c + 50;
    }
    nTiles.push(n);
  }
}

function draw(){
  image(starsBg, 0, 0,windowWidth,windowHeight);
  background('rgba(0,0,0,0.60)');
  noStroke();
  textFont('Georgia');
  // Draw Level 1 - Personas
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("L E V E L  O N E : P I C K  Y O U R  P E R S O N A",100,50);
  for(var i=0; i < pTiles.length; i++){
    pTiles[i].display(); // Get a persona and display
  }

  // Draw Level 2 - Topics
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("L E V E L  T W O : P I C K  Y O U R  T O P I C",100,200);
  for(var i=0; i < tTiles.length; i++){
    tTiles[i].display(); // Get a topic and display
  }

  // Draw Level 3 - Magic Numbers
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("L E V E L  T H R E E : P I C K  Y O U R  N U M B E R",100,350);
  for(var i=0; i < nTiles.length; i++){
    nTiles[i].display(); // Get a lucky/unlucky number
  }

  // Draw Level 4 - The Fortune
  var luckyNumber = "";
  if(isLucky){
    luckyNumber = " a lucky ";
  } else {
    luckyNumber = " an unlucky ";
  }
  // Watch for clicks
  fill(255);
  textSize(12);
  textAlign(LEFT);
  text("Y O U R   F O R T U N E :",100,650);
  textSize(24);
  text("Clicked persona " + persona + " and topic " + topic + " and" + luckyNumber + "number "+ magicNum + " and have found this " + haveFound, 100, 700);

  // Draw indicators - to show what line has been clicked.
  noFill(255);
  stroke(255);
  ellipse(pX,pY,50);
  ellipse(tX,tY,50);
  ellipse(nX,nY,50);

  // draw lines
  strokeWeight(2);
  line(900,50,900,600);

  line(50,600,1350,600);

  // directions
  textSize(28);
  textFont('Georgia');
  fill(255);
  textAlign(CENTER,CENTER);
  text("B L O O D  P O E T R Y",1100,120);
  textSize(14);
  noStroke();
  text("(A HIV history ~ fortune-telling game)",1100,150);
  text("D I R E C T I O N S",1100,200);

  stroke(255);
  strokeWeight(1);
  line(1000,210,1200,210);

  textAlign(LEFT);
  noStroke();
  text("1. Pick your persona",1000,230);
  text("2. Pick your topic to base the fortune on",1000,260);
  text("3. Pick a magic number:",1000,290);
  text("Some numbers are lucky and others are not!",1015,315);
}

/* Persona class */
function Persona(c,p){
  this.c = 100+c;
  this.p = p;
  this.cX = this.c + 25;
  this.cY = 125;

  this.display = function(){
    noFill();
    // rectMode(CENTER);
    rect(this.c,100,50,50);
    fill(255);
    textSize(24);
    textFont('Georgia');
    textAlign(CENTER,CENTER);
    text(this.p,this.cX,this.cY);
  }

  this.clickCheck = function(mX,mY){
    var d = dist(mX,mY,this.cX,this.cY);
    if(d < 25){
      // Inside circle i.e distance smaller than radius
      // Lock the persona and everything else.
      personaLocked = true;
      persona = this.p;
      // Update the persona indicator
      pX = this.cX;
      pY = this.cY;
    } else {
      // Outside. Do nothing
    }
  }
}

/* Topics class */
function Topic(c,t){
  this.c = 100 + c;
  this.t = t;
  this.cX = this.c + 25;
  this.cY = 275;

  this.display = function(){
    fill(255);
    textSize(24);
    textFont('Georgia');
    textAlign(CENTER,CENTER);
    text(this.t,this.cX,this.cY);
  }

  this.clickCheck = function(mX,mY){
    var d = dist(mX,mY,this.cX,this.cY);
    if(d < 25){
      topicLocked = true;
      topic = this.t;
      // Update the topic indicator
      tX = this.cX;
      tY = this.cY;
    } else {}
  }
}

/* MagicNum class */
function MagicNum(c,n,row){
  this.c = 100 + c;
  this.n = n;
  this.row = row;
  this.l = 0; // 0 (unluck no) and 1 (lucky no)
  this.cX = this.c + 25;
  this.cY = 0;

  this.display = function(){
    var y;
    if(this.row == 1){
      y = 400;
      this.cY = 425;
    } else {
      y = 500;
      this.cY = 525;
    }
    textSize(24);
    textFont('Georgia');
    textAlign(CENTER,CENTER);
    if(this.row == 1){
      y = 380;
    } else {
      y = 480;
    }
    text(this.n,this.cX,this.cY);
    setLuck(y);
  }

  function setLuck(y){
    var msg = "";
    if(luckyNos.includes(this.n)){
      this.l = 1;
    } else {
      this.l = 0;
    }
  }

  this.clickCheck = function(mX,mY){
    var d = dist(mX,mY,this.cX,this.cY);
    if(d < 25){
      luckLocked = true;
      magicNum = this.n;
      // Update the persona indicator
      nX = this.cX;
      nY = this.cY;
      if(luckyNos.includes(this.n)){
        haveFound = ": good luck";
      } else if(!luckyNos.includes(this.n)){
        haveFound = ": bad luck";
      }
      if(this.l === 0){
        isLucky = false;
      } else {
        isLucky = true;
      }
    }
  }
}

function mousePressed(){
  clickX = mouseX;
  clickY = mouseY;

  // Check the area that has been clicked.
  if(!personaLocked){
    for(var i=0; i < pTiles.length; i++){
      pTiles[i].clickCheck(clickX,clickY);
      if(personaLocked){
        break;
      }
    }
  }

  if(!topicLocked){
    for(var i=0; i < tTiles.length; i++){
      tTiles[i].clickCheck(clickX,clickY);
      if(topicLocked){
        break;
      }
    }
  }

  if(!luckLocked){
    for(var i=0; i < nTiles.length; i++){
      nTiles[i].clickCheck(clickX,clickY);
      if(luckLocked){
        break;
      }
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
