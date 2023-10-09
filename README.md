# Graphics Programming with_p5.js-Asteriod Game Clone
I created a asteroid game clone using p5.js libraries, hoping to demonstrate the mechanics of collision detection.

#### [Instructions]
This is a built using the p5.js library so therefore make sure that the p5 library is installed on your IDE(Visual Studio Code, etc..) before running the project. For VSCode users make sure to install the 'live-server' extension and right click the **index.html** file and choose the `Open with Live Server` option and the game will run on a HTML window on your browser. 
- Press SPACE to start game
- WASD to move spaceship
- Press SPACE to fire bullets and hit astheriods

#### The main `objective` of this project is 2 things:

1. The successful implementation constrcutor method, where I have multiple seperated Javascripts each purpose is to generate a specific environment
   - Such as the `bulletSystem.js` is to generate "Bullets" that emits from the spaceship whenever the user presses SPACE button
   - The `asteriodSystem.js` will be in charge of generating random shapes of astriod in the environment
   - The objective is to call these 2 Javascripts on the `sketch.js` and apply collision detection whenever a bullet comes into contact with an asteriod

2. The Collision detection System
   - The system takes the body of the 2 objects and creates a diameter around it, when the two objects overlapps itselves in diameter we can say that they have come into contact
   - As such any objects that comes into object should do the following these in `sketch,js`:
     - Spaceship to earth -> Game Over
     - Astheriod to earth -> Game Over
     - Astheriod to spaceship -> Game Over
     - SpaceShip near atmosphere -> increase in gravity
     - Bullets hit Asteriods -> +1 point

```
    //bullet collisions
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
```
