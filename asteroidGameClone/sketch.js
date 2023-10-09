/////// GLOBAL VARIABLES ////////
var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var GameScore;
var starLocs = [];
var timer = 5;
var SpwnLevel = 1;
var EarthImg;
var AsteriodImg;
var UFOImg;

//////////////// PRELOAD IMAGES /////////////////
// Earth = https://www.livescience.com/earth.html
// UFO = https://toppng.com/ufo-clipart-png-ufo-PNG-free-PNG-Images_273425
// Asteriod = https://www.nicepng.com/maxp/u2w7e6t4w7o0i1q8/
function preload(){
  EarthImg = loadImage('Earth.png');
  AsteriodImg = loadImage('asteriod.png');
  UFOImg = loadImage('UFO.png')
}

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  GameScore = 0;    // Starting GAME SCORE

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();
  ///////////////////// DRAW GAME SCORE ////////////////////
  fill(255, 204, 0);
  textSize(20);
  textAlign(LEFT);
  text("Asteroids Hit: "+ GameScore,20,20);    // WRITES GAME SCORE
  text("Time till next spawn: "+TimerCount()+" sec",20,40);    // WRITES ASteriod Level Spawn
  text("Asteroids Spawn Level: "+ SpwnLevel,20,60);    // WRITES ASteriod Level Spawn
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements

}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  imageMode(CENTER);
  image(EarthImg,earthLoc.x-50,earthLoc.y/2-300,earthSize.x+1300,earthSize.y+300);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    //spaceship-2-asteroid collisions
    //Checks Collision between asteriod and spaceship
    for (i = 0; i < asteroids.locations.length; i++){
      var asteroidLoc = asteroids.locations[i];
      var asteroidDiam = asteroids.diams[i];
      var r = isInside(asteroidLoc,
                       asteroidDiam,
                       spaceship.location,
                       spaceship.size);
      if (r){
          gameOver();
      }
    }
    //asteroid-2-earth collisions
    //Checks collision between asteriod and earth
    for (i = 0; i < asteroids.locations.length; i++){
      var asteroidLoc = asteroids.locations[i];
      var asteroidDiam = asteroids.diams[i];
      var AsteroidEarth = isInside(asteroidLoc,
                                   asteroidDiam,
                                   earthLoc,
                                   earthSize.y);
      if (AsteroidEarth){
          gameOver();
      }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    var ShiptoEarth = isInside(spaceship.location,
                               spaceship.size,
                               earthLoc,
                               earthSize.y);
    if (ShiptoEarth){
         gameOver();
    }
    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    var ShiptoAtmos = isInside(spaceship.location,
                               spaceship.size,
                               atmosphereLoc,
                               atmosphereSize.y);
    if (ShiptoAtmos){
         spaceship.setNearEarth();
    }
    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    var bulletSys = spaceship.bulletSys;
    var bullets = bulletSys.bullets;
    for (var i = 0; i < bullets.length; i++){
      for (j = 0; j < asteroids.locations.length; j++){
         var asteroidLoc = asteroids.locations[j];
         var asteroidDiam = asteroids.diams[j];
         var bulletCollide = isInside(asteroidLoc,
                                      asteroidDiam,
                                      bullets[i],
                                      bulletSys.diam);
         if (bulletCollide){
              asteroids.destroy(j); // When Collided destroy asteroid
              GameScore += 1;     // Increases GAME SCORE
         }
      }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function testIsInside(){
   var locA = createVector(50,50);
   var sizeA = 10;
   var locB = createVector(55,55);
   var sizeB = 10;
   var r = isInside(locA, sizeA, locB, sizeB);
   console.log(r);
}

function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var d = dist(locA.x,locA.y,locB.x,locB.y);
    var maxDist = sizeA/2 + sizeB/2;
    if(maxDist<d){
      return false;
    }
    else{
      return true;
    }
}

///////////////// Timer Function /////////////////////////////
function TimerCount(){
  if (frameCount % 60 == 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if(timer == -1 )
  {
    timer = 5;
    SpwnLevel += 1;
  }
  return timer;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill('red');
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2);
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
