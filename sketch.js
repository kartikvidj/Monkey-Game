
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananasGroup, obstaclesGroup;
var survivaltime=0;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  console.log(ground.x);
  bananasGroup=new Group();
  obstaclesGroup=new Group();
  
}


function draw() {
background(220);
  text("Score:"+score,500,50);
  
   if(gameState==PLAY){
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivaltime,100,50);
 
  if(ground.x<0){
    ground.x=200;
  }
  if(keyDown("space")&&monkey.y>305){
    monkey.velocityY=-16;
    
  }
  createBananas();
  createObstacles();
  if(monkey.isTouching(bananasGroup)){
    bananasGroup.destroyEach();
    score=score+1;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
    if(monkey.isTouching(obstaclesGroup)){
      gameState=END;
    }
    
  }
  else if (gameState==END){
    console.log("SORRY YOU LOSE");
    ground.velocityX=0;
    monkey.velocityY=0;
    
    bananasGroup.setLifetimeEach(-2);
    obstaclesGroup.setLifetimeEach(-2);
    
     bananasGroup.setVelocityEach(0);
    obstaclesGroup.setVelocityEach(0);
    
    if(keyDown("R")){
   gameState=PLAY;

    }
  }
  
  
  monkey.collide(ground);
  obstaclesGroup.debug=true;
  drawSprites();
}


function createBananas(){
  if(frameCount % 80 == 0){
    banana=createSprite(400,50,46,52);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=200;
    
    bananasGroup.add(banana);
    
  }
  
}
function createObstacles(){
  if (frameCount % 300 == 0){
    obstacle=createSprite(400,335,5,5);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.135;
    obstacle.velocityX=-5;
    obstacle.lifetime=200;
    obstaclesGroup.add(obstacle);
    
  }
}










