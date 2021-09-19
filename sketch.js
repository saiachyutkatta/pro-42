var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  heading = createElement("h1")
  scoreboard= createElement("h1")
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
scoreboard.html("score: "+score)
scoreboard.style('color:red')
scoreboard.position(width-200,20)
heading.html("life: "+life)
heading.style('color:red')
heading.position(150,20)

  if(gameState===1){
    gun.y=mouseY  

if(frameCount% 80 ===0){
  drawBlueBubble()
}


if(frameCount% 100 ===0){
  drawredBubble()
}

    if(keyDown("space")){
     shootBullet()
}
if (blueBubbleGroup.collide(backBoard)){
  handleGameover(blueBubbleGroup);
}
if (redBubbleGroup.collide(backBoard)) {
  handleGameover(redBubbleGroup);
}

if(blueBubbleGroup.collide(bulletGroup)){
  handleBubbleCollision(blueBubbleGroup);
}

if(redBubbleGroup.collide(bulletGroup)){
  handleBubbleCollision(redBubbleGroup);
}
    drawSprites();
  }
     
}

function shootBullet(){
  bullet = createSprite(150,width/2,50,20)
  bullet.y = gun.y-20
  bullet.velocityX = 7
bullet.addImage(bulletImg)
bullet.scale = .12
bulletGroup.add(bullet)
bullet.lifetime = 400
}  


function drawBlueBubble(){
  BlueBubble = createSprite(800,random(20,780),40,40)
  
  BlueBubble.velocityX = -8
  BlueBubble.addImage(blueBubbleImg)
  BlueBubble.scale = 0.1
  blueBubbleGroup.add(BlueBubble)
BlueBubble.lifetime = 400
}  

function drawredBubble(){
  redBubble = createSprite(800,random(20,780),40,40)
  
  redBubble.velocityX = -8
  redBubble.addImage(redBubbleImg)
  redBubble.scale = 0.1
  redBubbleGroup.add(redBubble)
  redBubble.lifetime = 400
}  
function handleBubbleCollision(bubbleGroup){
  if (life > 0) {
     score=score+1;
  }

  blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg)
  blast.scale=0.3
  blast.life=20
  bulletGroup.destroyEach()
  bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){

  life=life-1;
  bubbleGroup.destroyEach();
  

  if (life === 0) {
    gameState=2
    
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
      "https://cdn-0.emojis.wiki/emoji-pics/facebook/thumbs-down-facebook.png", imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

}