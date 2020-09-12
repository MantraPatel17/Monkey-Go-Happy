var monkey, monkey_running;
var banana, bananaImage, obstacleGroup, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var jungle, jungleImage;
var invisibleGround;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("Jungle.jpg");

}

function setup() {

  createCanvas(600, 500);

  //creating background
  jungle = createSprite(300, 250, 600, 600);
  jungle.addImage(jungleImage);
  jungle.scale = 1;

  invisibleGround = createSprite(300, 450, 600, 20);
  invisibleGround.visible = false;

  monkey = createSprite(100, 420, 30, 30);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  foodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {


  // moving ground
  jungle.velocityX = -3

  //setting the animation for background
  if (jungle.x < 180) {
    jungle.x = jungle.width / 2;
  }

  monkey.collide(invisibleGround);

  //jump when the space key is pressed
  if (keyDown("space") && monkey.y >= 409) {
    monkey.velocityY = -15;
  }

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;

  fruit();
  obstacle();
  
  if(foodGroup.isTouching(monkey)){
   foodGroup.destroyEach();   
  }

  drawSprites();

  score = score + Math.round(getFrameRate()/60);
  fill("skyblue");
  textSize(25)
  text("Survival Time : " + score, 300, 50);
}

function fruit() {


  if (World.frameCount % 80 === 0) {
    banana = createSprite(400, 200, 20, 20);
    banana.addImage("moving", bananaImage);
    banana.y = Math.round(random(300, 350));
    banana.velocityX = -10;
    banana.setlifetime = 60;
    banana.scale = 0.1;
    foodGroup.add(banana)
  }
}

function obstacle() {

  if (World.frameCount % 300 === 0) {
    obstacles = createSprite(300, 415, 30, 30);
    obstacles.addImage("moving", obstacleImage);
    obstacles.velocityX = -6;
    obstacles.lifetime = 100;
    obstacles.scale = 0.2;
    obstacleGroup.add(obstacles)
  }
}