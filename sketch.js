var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;

var survivalTime = 0;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1;
  console.log(monkey.y);
  
  monkey.setCollider("rectangle",0,0,monkey.length,monkey.width);
  
  ground = createSprite(300,350,1200,10);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
}


function draw() {
  background("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time : "+survivalTime,250,50);
  
  
  
  monkey.collide(ground);
  
  
  if (gameState === PLAY) {
    spawnBananas();
    spawnObstacles();
    
    survivalTime = Math.ceil(frameCount/frameRate())
    
    ground.velocityX = -4;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if (keyDown("space") && monkey.y > 300) {
      monkey.velocityY = -20;
    }
     
    if (monkey.collide(obstacleGroup)) {
      gameState = END;
    } 
  }
    else if (gameState === END) {
      monkey.velocityY = 0;
      monkey.velocityX = 0;
      
      ground.velocityX = 0;
    
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
    
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);   
    }
  
  
  drawSprites();
}


function spawnBananas() {
  
  if (frameCount % 60 === 0) {
    banana = createSprite(600,224,40,10);
    
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    
    banana.velocityX = -4;
    
    //assign lifetime to the variable
    banana.lifetime = 150;
    
    //add each banana the group
    bananaGroup.add(banana);
  }  
}


function spawnObstacles() {
  
  if (frameCount % 100 === 0) {
    obstacle = createSprite(600,307,40,10);
    
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2;
    
    obstacle.velocityX = -5;
    
    //assign lifetime to the variable
    obstacle.lifetime = 150;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
    obstacleGroup.setColliderEach("circle",0,0,200);   
  }  
}
