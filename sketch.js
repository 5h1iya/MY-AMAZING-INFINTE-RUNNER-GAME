var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cyclist, cyclist_cycling , cyclist_crashing;
var background,backgroundImage;
var obstacleGroup,obstacle1, crisps, obstacle2, obstacle3;
var invisibleGround;

var jumpSound, collidedSound

var gameOver, restart,  gameOverImage,  restartImage

var score=0




function preload(){
   

  jumpSound = loadSound("jumpSound.wav")
  collidedSound = loadSound("collidedSound.wav")

    backgroundImage = loadImage("background.png");

    cyclist_cycling = loadAnimation("cyclist.png");
    crash = loadAnimation("crash.png");
   
    
    obstacle1 = loadImage("can2.png");
    obstacle1.scale = 0.2
    obstacle2 = loadImage("crisps2.png");
    obstacle3 = loadImage("waterBottle3.png");
    cyclist_cycling = loadAnimation("cyclist.png");
    crash = loadAnimation("crash.png");
    //score = 0

    gameOverImage = loadImage("gameOver.png")
    restartImage = loadImage("restart.png");
}
function setup() {

    createCanvas(windowWidth, windowHeight);

    cyclist = createSprite(230,765,20,50);
    cyclist.addAnimation("cycling", cyclist_cycling);
    cyclist.addAnimation("crashing", crash);
    cyclist.scale = 0.2;

    gameOver = createSprite(900,435);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 2

    restart = createSprite(905,700)
    restart.addImage(restartImage);
    restart.scale = 1.5;
  
    gameOver.visible = false;
    restart.visible = false;

    
    //can = createSprite(930,865,50,10)
    //can = createSprite(930,865,50,10)
    

    background = createSprite(200,180,400,20);
    background.addImage("background",backgroundImage);
    //background.scale = 0.4;
    background.x = background.width/2;
    background.velocityX = -(6 + 3*score/100);
    //background.depth = background.depth - 12;

    obstaclesGroup = new Group(); 

    invisibleGround = createSprite(200,960,400,10);
    invisibleGround.visible = false;
    invisibleGround.depth = invisibleGround.depth+2;

    score = 0;
}

function draw() {

  //  background(255);/

   //var se = text("Score:" + score, 200,100);
   //se = createSprite(200,50,50,20)
   //se.shapeColour("pink")
   //se.depth = se.depth+10;
   //text.fill("black")

  

    if (gameState===PLAY)
    {
        
        

        score = score + Math.round(getFrameRate()/60);
        background.velocityX = -(6 + 3*score/100);

        text("Score:" + score, 500,50);
        cyclist.depth = cyclist.depth+1;

        

        cyclist.collide(invisibleGround);
            
        //spawnObstacles()
        //cyclist.debug = true;
        cyclist.setCollider("circle",0,-180,1000);

       // background.velocityX = -(6 + 3*50/ 100);

        if (background.x < 0)
        {
            background.x = background.width/2;
        }

        if((touches.length > 0) || keyDown("space") && cyclist.y >= 159) {
            cyclist.velocityY = -25;
            jumpSound.play()
          }

          //if(cyclist.y >= 148){
           //cyclist.y >= 159 
          //}
        
          cyclist.velocityY = cyclist.velocityY + 0.8
          // can.depth = can.depth+1
          
          ///obstacle1.depth = obstacle1.depth+200
         // Idk ()
         if(obstaclesGroup.isTouching(cyclist)){
           
          gameState = END;
          collidedSound.play()
      }
    }
    if (gameState === END) {
      gameOver.visible = true;
     restart.visible = true;
     gameOver.depth =  gameOver.depth+4
      //set velcity of each game object to 0
      background.velocityX = 0;
      cyclist.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      
     crash.depth=crash.depth+1
     restart.depth = restart.depth + 9
    
      cyclist.changeAnimation("crashing",crash)

      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
     
      if(touches.length>0|| keyDown("SPACE")||mousePressedOver(restart)) {
        reset();
        touches = []
      }
    }

    spawnObstacles();

    drawSprites();
}


function spawnObstacles() {
    if(frameCount % 200 === 0) {
      var obstacle = createSprite(2000,850,10,40);
      ///obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
     
      
      ///generate random obstacles
     var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        default: break;
      }

      obstacle.scale = 2;
      //obstacle.lifetime = 2000;
      obstaclesGroup.add(obstacle);
      //obstaclesGroup.setDepthEach(7)
    }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  cyclist.changeAnimation("cycling", cyclist_cycling)
 
  
  score = 0;
  
}

/*function spawnObstacles(){
    if(frameCount % 60 == 0){
        var Obs = createSprite(600,120,40,10)

        var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
              default: break;
    }
}
}*/

//function Idk (){
  //  if(frameCount%60==0){
    //    obstacle1.addImage()
      //  obstacle1 = createSprite(600,120,40,10)

    //}
//}