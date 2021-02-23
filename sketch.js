var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground,ground2, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,sky;

var score=0;

var gameOver, restart;

localStorage['HighestScore'] = 0;











function preload(){
  
 
  groundImage = loadImage("ground.png");
  
  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.gif");
  obstacle3 = loadImage("obstacle3.png");  
  
  
   gameOverImg = loadImage("gameOver1.png");
  restartImg = loadImage("restart1.png");

  
  trex_running =   loadAnimation("TREX1.png","TREX2.png","TREX3.png");
  trex_collided = loadAnimation("TREXDEAD.png");
  
  
  
  
  
  
  
}





function setup() {
  createCanvas(windowWidth, windowHeight);
  
 

  
  
  
 ground = createSprite(10,height-70,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2 ;
  ground.velocityX = -(6 + 3*score/100);
  ground.scale = 0.9;
  
  
  



  
  
  
 
  
  
  trex = createSprite(100,height-70,20,50); 
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);


gameOver = createSprite(windowWidth-100,windowHeight-100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,200);
  restart.addImage(restartImg);

   gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();


  camera.position.x = trex.x
  camera.position.y = trex.y

  gameOver.x = trex.x
  gameOver.y = trex.y


  restart.x = trex.x+200
  restart.y = trex.y

  trex.scale = 0.2;
  
  
  score = 0; 
  
  
  
  
  
  
}

function draw() {
  background("#00ffdd");
   console.log(score);
  
  fill("red");
  textSize(24);
  text("Score: "+ score, width-200,50);
  
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(6 + 3*score/100);
  
    if( touches.length>0 ||keyDown("space")  && trex.y >=300 ) {
      trex.velocityY = -10 ;
      touches = []; 
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   trex.collide(invisibleGround);
    
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
    
    
    
  }
  
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
  
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
   
    trex.changeAnimation("collided",trex_collided);
    
 
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)|| keyDown("enter")) {
      reset();
    }
  }
  
 
  drawSprites();
  
  

  trex.setCollider("rectangle",-120,0,140 ,300);
  
  
  
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width,height-70 ,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
               }
    
             
    obstacle.scale = 0.2;
    obstacle.lifetime = width     ;
  
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}










