var dog, happyDog, database, foodS ,dogImg, foodStock, btnFeed, btnAddFood,fedTime, lastFed,foodObj;

function preload()
{
dogImg = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();
 
  foodStock=database.ref('Food');
  foodStock.on("value",function(data){
   foodS=data.val();
  });

  dog=createSprite(250,350,20,20);
  dog.addImage("value",dogImg)
  dog.scale=0.2;
  foodObj= new Food()
  btnFeed = createButton("Feed the dog")
  btnFeed.position(700,95);
  btnFeed.mousePressed(feedDog);

  btnAddFood= createButton("Add Food")
  btnAddFood.position(800,95)
  btnAddFood.mousePessed(addFoods);
}


function draw() {  
  
  background(rgb(46,139,87));
 
  if(keyWentDown(UP_ARROW)){
     writeStock(foodS)
     dog.addImage("value",dogHappy);
  }
  

  drawSprites();
  //add styles here
  textSize(20);
  fill(0);
  stroke("white")
  text("FOOD REMAINING : "+foodS ,120,250);
}

function writeStock(x){

if(x<=0){
  x=0;
}
else{
  x=x-1;
}

 database.ref('/').update({
    Food : x
  })
}


