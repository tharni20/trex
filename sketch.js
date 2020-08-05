var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex ,trexAnimation;
var ground,groundImage;
var invisibleground;
var cloud,cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var count;
var cloudGroup;
var obstacleGroup;
var gameOver, overImage;
var restart, restartImage;
var trexcollide;

function preload() {
  trexAnimation = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  
  trexcollide = loadAnimation ("trex_collided.png");
  
  groundImage = loadImage ("ground2.png");
  
  cloudImage = loadImage ("cloud.png");
  
  obstacle1 = loadImage ("obstacle1.png");
  
  obstacle2 = loadImage ("obstacle2.png");
  
  obstacle3 = loadImage ("obstacle3.png");
  
  obstacle4 = loadImage ("obstacle4.png");
  
  obstacle5 = loadImage ("obstacle5.png");
  
  obstacle6 = loadImage ("obstacle6.png");
  
  overImage = loadImage ("gameOver.png");
  
  restartImage = loadImage ("restart.png");
}

function setup() {
  createCanvas(400, 400);
   
   trex = createSprite (50,350,15,15);
trex.addAnimation("t1",trexAnimation);  
trex.addAnimation("t2",trexcollide);
  trex.scale = 0.5;
  
  ground = createSprite (200,380,400,20);
  ground.addImage ("g1",groundImage);
  
  invisibleground = createSprite (200,390,400,20);
  invisibleground.visible = false;
  
  gameOver = createSprite(200,300,15,15);
  gameOver.addImage ("g2",overImage);
  gameOver.scale = 0.5;
  
  restart = createSprite(200,340,15,15);
  restart.addImage ("r1",restartImage);
  restart.scale = 0.5;
  
  count = 0;
  
  cloudGroup = new Group();
  
  obstacleGroup = new Group ();
  
  gameOver.visible = false;
  restart.visible = false;
 
}


function draw() {
  background(180);
  
 trex.collide(invisibleground);
  
  if(gameState === PLAY){
  
    if (keyDown("space")) {
    trex.velocityY = -12; 
  }  
    count = count+Math.round(getFrameRate() /60);
   
   trex.velocityY = trex.velocityY + 0.8;
    
    
   
  spawnClouds();
  
  spawnObstacles();
    
   

  if(obstacleGroup.isTouching(trex)){
      gameState = END;
    trex.changeAnimation("t2",trexcollide);
    }
 }
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
}
  text("Score:"+ count, 250, 100);
  
  drawSprites();
  
}

function reset () {
  gameState = PLAY;
  restart.visible = false;
  gameOver.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  count = 0;
  trex.changeAnimation("t1",trexAnimation);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage("c1", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    
    switch (rand) {
      case 1: obstacle.addImage (obstacle1);
        break; 
      case 2: obstacle.addImage (obstacle2);
        break;
      case 3: obstacle.addImage (obstacle3);
        break;
      case 4: obstacle.addImage (obstacle4);
        break;
      case 5: obstacle.addImage (obstacle5);
        break;
      case 6: obstacle.addImage (obstacle6);
        break;
      default: break;
    }
        
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}