//Function that waits body to load for running the game.
function startGame(){
//Gets the canvas of html and assigns it to a varible.
const cvs = document.getElementById("snake");
//Assigns the canvas to the function for creating 2d context.
const ctx = cvs.getContext("2d");

//imports the image and assigns it to a variable.
const background = new Image();
background.src="img/ground.png";

//assigns to a variable called box the value for the squares in the background
const box = 32;

//creates the snake and assign how many squares it will have.
var snake = [];
snake[0] = {x : 9*box, y : 10*box};
snake[1] = {x : 8*box, y : 10*box};
snake[2] = {x : 7*box, y : 10*box};
/* 
           Get a bigger snake

snake[3] = {x : 6*box, y : 10*box};
snake[4] = {x : 5*box, y : 10*box};
snake[5] = {x : 4*box, y : 10*box};
snake[6] = {x : 3*box, y : 10*box};
snake[7] = {x : 2*box, y : 10*box};
snake[8] = {x : 1*box, y : 10*box};
snake[9] = {x : 0*box, y : 10*box}; */

//create apple and randomizes it's position
var apples = {
    x : Math.floor(Math.random()* 17 + 1)* box,
    y : Math.floor(Math.random()* 15 + 3)* box
};

//create most of the variables.
var score = 0;
var speed = 140;
var leftWall = box;
var topWall = 3 * box;
var rightWall = 17 * box;
var botttomWall = 17 * box;

//draws the content of the game.
function draw(){
    //assigns the background image to the canvas.
    ctx.drawImage(background,0,0);

    //creates the snake.
    for(var i = 0; i < snake.length; i++){
        ctx.fillStyle = (i==0) ? "green":"yellow";
        ctx.fillRect(snake[i].x, snake[i].y ,box, box); 
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y ,box, box);
    }

    //creates the apples.
    ctx.fillStyle = "red";
    ctx.fillRect(apples.x,apples.y,box,box);

    //creates the text for the score.
    ctx.fillStyle = "white";
    ctx.font = "35px arial";
    ctx.fillText(score,2 * box, 1.6 * box); 

    //assign values for the head of the snake.
    snakeX = snake[0].x;
    snakeY = snake[0].y;

    //functions for the directions of the keys.
    if( direction == "LEFT") snakeX -= box;
    if( direction == "TOP") snakeY -= box;
    if( direction == "RIGHT") snakeX += box;
    if( direction == "BOTTOM") snakeY += box;

    //creates another apple and increases the score when an apple is catch.
    if(snakeX == apples.x && snakeY == apples.y){
        score++;
        apples = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
// ----------------- MOVES THE SNAKE (SNAKE.POP AND SNAKE.UNSHIFT) -----------------    

    //if an apple is not catch it will get rid of the last element of the array to move the snake    
    }else{

        snake.pop();
    }
 
    //assigns a varible to the head so able to type just variable.axis.
    var headIncrease = {
        x : snakeX,
        y : snakeY
    }
    
    //when moving creates an element in the index 0 of the snake (draws the head).
    snake.unshift(headIncrease);

    //Game won.
    if(score >= 285){
        if (confirm('You won the game!! Do you want to play again?')) {
             //reloads the page if the user clicks confirm to play again.
            location.reload();
        } else {

        }
    }

    //Game Over (walls in the if statement and collision in the function.
    if (snakeX < leftWall || snakeX > rightWall || snakeY < topWall || snakeY > botttomWall || collision(headIncrease,snake)){
        //stops the game from running.
        clearInterval(game);
        //prompts the user for a try again.
        if (confirm('You lost! Do you want to restart the game?')) {
            //reloads the page if the user clicks confirm to try again.
            location.reload();
        } else {
            //nothing else.
        }
    }
        
}

//function for checking collisions from the snake on itself.
function collision(headIncrease,snake){
    for(var i = 3; i < snake.length; i++){
        if(headIncrease.x == snake[i].x && headIncrease.y == snake[i].y){
            return true;
        }          
    }    
    return false; 
}

//creates the variable for the directions and adds event listener for the keys.
var direction;
document.addEventListener("keydown",keyDirection);

//assigns the keys with the direction that they represent.
function keyDirection(event){
    if(event.keyCode == 37 && direction != "RIGHT"){
        direction = "LEFT";
    }else if(event.keyCode == 38 && direction != "BOTTOM"){
        direction = "TOP";
    }else if(event.keyCode == 39 && direction != "LEFT"){
        direction = "RIGHT";
    }else if(event.keyCode == 40 && direction != "TOP"){
        direction = "BOTTOM";
    }
}

// Calls the draw function to run the game (PLEASE CHANGE SPEED ON THE VARIABLE!).
var game = setInterval(draw, speed);
}