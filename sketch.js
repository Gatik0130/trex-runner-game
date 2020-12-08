var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimages,obstacles1,obstacles2,obstacles3,obstacles4,obstacles5,obstacles6,obstaclegroup,cloudgroup;
var cloud,obstacle
var score=0
var PLAY=1,END=0;
var gameState=PLAY;
var restart,gameover,gameoverImage,restartImage;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  restartImage=loadImage("restart.png")
  gameoverImage=loadImage("gameOver.png");
  
  groundImage = loadImage("ground2.png")
  cloudimages=loadImage ("cloud.png")
  obstacles1=loadImage("obstacle1.png")
  obstacles2=loadImage("obstacle2.png")
  obstacles3=loadImage("obstacle3.png")
  obstacles4=loadImage("obstacle4.png")
  obstacles5=loadImage("obstacle5.png")
  obstacles6=loadImage("obstacle6.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
trex.addAnimation("collided", trex_collided);

  trex.scale = 0.5;
  
  restart=createSprite(300,140,20,20)
  restart.addImage(restartImage)
  restart.scale=0.5
  gameover=createSprite(300,100,20,20)
  gameover.addImage(gameoverImage)
    gameover.scale=0.5
  
  gameover.visible=false
  restart.visible=false
  
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  obstaclegroup=new Group()
  cloudgroup= new Group()
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(180);
  
  if (gameState===PLAY){
    score=score+Math.round(getFrameRate()/60)
    if(obstaclegroup.isTouching(trex)){
      gameState=END
    }
    
    ground.velocityX = -2;
    if(keyDown("space")&& trex.y>160) {
    trex.velocityY = -10;
      
  }
    trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  cloud30();
  obstacle30();
  }
  else if (gameState===END){
    trex.changeAnimation("collided",trex_collided);
    trex.velocityY=0
    ground.velocityX=0
    gameover.visible=true
    restart.visible=true
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1)
     cloudgroup.setLifetimeEach(-1)
    if (mousePressedOver(restart)){
      reset();
    }
  }
  text("SCORE "+ score,500,50)
  
  
  
  trex.collide(invisibleGround);
  drawSprites();
}
function cloud30(){
  if (World.frameCount%60===0){
     cloud =createSprite(600,120,20,20)
    cloud.y=random(80,120)
    cloud.addImage(cloudimages)
    cloud.scale=0.5
    cloud.velocityX=-3
    cloud.lifetime=200
    cloud.depth=trex.depth
    trex.depth=trex.depth+1
    cloudgroup.add(cloud)
    
  }}
  function obstacle30(){
  if (World.frameCount%60===0){
     obstacle =createSprite(600,165,20,20)
     var r=Math.round(random(1,6))
     switch(r){
          case 1:obstacle.addImage(obstacles1)
         break;
         case 2:obstacle.addImage(obstacles2)
         break;
         case 3:obstacle.addImage(obstacles3)
         break;
         case 4:obstacle.addImage(obstacles4)
         break;
         case 5:obstacle.addImage(obstacles5)
         break;
         case 6:obstacle.addImage(obstacles6)
         break;
         default:break
     } 
    
    obstacle.scale=0.5
    obstacle.velocityX=-3
    obstacle.lifetime=200
   
    obstaclegroup.add(obstacle)
  
  
} }
    
function reset(){
  gameState=PLAY
  gameover.visible=false
  restart.visible=false
  obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
  trex.changeAnimation("running",trex_running)
  score=0
  
  
}