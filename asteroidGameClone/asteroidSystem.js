class AsteroidSystem {

  //creates arrays to store each asteroid's data
  constructor(){
    this.locations = [];
    this.velocities = [];
    this.accelerations = [];
    this.diams = [];
  }

  run(){
      this.spawn();
      this.move();
      this.draw();
  }

  // spawns asteroid at random intervals
  spawn(){
    if (random(1)<(0.01*SpwnLevel)){    // As the spawnLevel gets larger, the 0.01 multiplies 
                                        // Causing more matches with random(1) and spawns more frequently, increasing in spawn rates overtime making the game progressively harder 
                                        // Eventually it will hit a max of random(1) < 1 which is true 100% of the time , estimated time to reach is 500 seconds 
      this.accelerations.push(new createVector(0,random(0.1,1)));
      this.velocities.push(new createVector(0, 0));
      this.locations.push(new createVector(random(width), 0));
      this.diams.push(random(30,50));
      console.log('Asteriod Spawn Level: ',+SpwnLevel);
    }
  }


  //moves all asteroids
  move(){
    for (var i=0; i<this.locations.length; i++){
      this.velocities[i].add(this.accelerations[i]);
      this.locations[i].add(this.velocities[i]);
      this.accelerations[i].mult(0);
    }
  }

  applyForce(f){
    for (var i=0; i<this.locations.length; i++){
      this.accelerations[i].add(f);
    }
  }

  //draws all asteroids
  draw(){
    imageMode(CENTER);
    for (var i=0; i<this.locations.length; i++){
      image(AsteriodImg,this.locations[i].x, this.locations[i].y, this.diams[i], this.diams[i]);
    }
  }

  //function that calculates effect of gravity on each asteroid and accelerates it
  calcGravity(centerOfMass){
    for (var i=0; i<this.locations.length; i++){
      var gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
      gravity.normalize();
      gravity.mult(0.001);
      this.applyForce(gravity);
    }
  }

  //destroys all data associated with each asteroid
  destroy(index){
    this.locations.splice(index,1);
    this.velocities.splice(index,1);
    this.accelerations.splice(index,1);
    this.diams.splice(index,1);
  }
}
