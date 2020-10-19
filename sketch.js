//Create variables here
var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;


function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")
}

function setup() { 
  createCanvas(500,500);
  database = firebase.database();

   dog = createSprite(200, 300, 20, 20);
   dog.addImage(dogImg1)
   dog.scale = 0.2

   foodStock = database.ref('food')
   foodStock.on("value",readStock);
}


function draw() {  
background(46, 139, 87) 

if(keyDown(UP_ARROW)){
  writeStock(foodS)
  dog.addImage(dogImg)
}

  drawSprites();
  //add styles here
  fill("white");
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}
