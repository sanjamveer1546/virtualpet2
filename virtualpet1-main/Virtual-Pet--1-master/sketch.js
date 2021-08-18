var dog, happyDog, database, foodS ,dogImg, foodStock, btnFeed, btnAddFood,fedTime, lastFed,foodObj;

function preload()
{
dogImg = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();
 
 
  foodObj= new Food();
  foodObj.getFoodStock();

  database.ref("FeedTime").on("value",function(data){
     lastFed=data.val()
  })

  dog=createSprite(250,350,20,20);
  dog.addImage("value",dogImg)
  dog.scale=0.2;
  
  btnFeed = createButton("Feed the dog")
  btnFeed.position(500,95);
  btnFeed.mousePressed(feedDog);

  btnAddFood= createButton("Add Food")
  btnAddFood.position(600,95)
  btnAddFood.mousePressed(addFoods);
}

 function feedDog(){ 
   if(foodObj.foodStock>0){
     console.log("feeding")
      foodObj.deductFood();
     database.ref("/").update({
       FeedTime:hour()
     })
   } 
}
function addFoods(){  
  
  foodObj.foodStock++;
  foodObj.updateFoodStock(foodObj.foodStock);
}

function draw() {  
  
  background(rgb(46,139,87));
 
  foodObj.display();

  drawSprites();
  //add styles here
  textSize(20);
  fill(0);
  stroke("white")
  text("FOOD REMAINING : "+foodObj.foodStock ,120,250);
if(lastFed>12){
  text("LAST FED : "+lastFed%12+"pm" ,350,30);

}
else if(lastFed==12){
  text("LAST FED : 12 noon",350,30);
}
else{
  text("LAST FED : "+lastFed+"am" ,350,30);
}


}

