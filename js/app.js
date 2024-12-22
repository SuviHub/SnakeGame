//Game constants & variables
let inputDir = {x:0 , y:0};
const foodSound = new Audio('assets/eat.mp3');
const gameOverSound = new Audio('assets/game-over.mp3');
const moveSound = new Audio('assets/turn.mp3');
let speed = 10;
let lastpaintTime = 0;
let a = 5;
let b = 19;
let snakeArr = [
    {x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())}
]
let food = {x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())};
let score = 0;

//Game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime = ctime;
    gameEngine();

}

function isCollide(snake) {
    //if you come into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    if(snake[0].x > 20 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0){
            return true;
    } 
    return false;
}

function gameEngine() {
    //Part 1 : Update food & snake
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir = {x:0 , y:0};
        alert("Game Over !! Press any key to play again");
        snakeArr = [{x:13 , y:15}]; 
        score = 0; 

    }

    //if you have eaten the food , increment the score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("highScore" , JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "High Score : " + hiscoreval;
        }
        scoreBox.innerHTML = `Snake Length : ${score}`;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 17;
        food = {x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())}
    }

    //moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //PArt 2 : Display snake and food
    //Display snake
    board.innerHTML = "";
    snakeArr.forEach((el, idx) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = el.y;
        snakeElement.style.gridColumnStart = el.x; 
        if(idx === 0 ){
            snakeElement.classList.add('head');
        }else {
           snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);


        //Display food
        foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x; 
        foodElement.classList.add('food');
        board.appendChild(foodElement);

    })
}


///Main logic
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    hiscoreval = 0;
    localStorage.setItem("highScore" , JSON.stringify(hiscoreval));
}else {
    hiscoreval = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score : " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e=> {
    inputDir = {x: 0, y:1}; //Start game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp"); 
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1; 
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;     
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0; 
            break;

        default:
            break;
    }
});

