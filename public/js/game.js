//TODO create IIFE func with initialization (addEventListeners + initialization values for variables)
let box = 32; //TODO make const, rename to cell all const variable in the beginning of the file
let food;

(function () {
    createFood();
})();

let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");

let playingField = new Image();
playingField.src = "public/image/playingField.png";

let foodImage = new Image();
foodImage.src = "public/image/food.png";

let isPause = false;
let gameButton = document.querySelector(".gameButton");
gameButton.addEventListener("click", () => {
    isPause = !isPause;
    if (isPause) {
        clearInterval(game);
        gameButton.children[0].style.display = "none";
        gameButton.children[1].style.display = "initial"
    } else {
        game = setInterval(drawGame, 500 - score * 10)
        gameButton.children[0].style.display = "initial";
        gameButton.children[1].style.display = "none"
    }
})


let score = 0;

function createFood() {
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box, //TODO create variable for unknown numbers
        y: Math.floor(Math.random() * 15 + 1) * box
    }
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 8 * box
};

document.addEventListener("keydown", direction);

let dir = "left";

function direction(event) {
    console.log("user clicled arrow");
    if (event.keyCode === 37 && dir != "right") {
        dir = "left";
    } else if (event.keyCode === 38 && dir != "down") {
        dir = "up";
    } else if (event.keyCode === 39 && dir != "left") {
        dir = "right";
    } else if (event.keyCode === 40 && dir != "up") {
        dir = "down";
    }
}

//TODO make prettier, more fancy
function gameOver() {
    clearInterval(game);
    if (confirm("Game over. Do you want to try again?"))
        location.reload();
}

function drawGame() {
    console.log("direction", dir);
    ctx.drawImage(playingField, 0, 0);
    ctx.drawImage(foodImage, food.x, food.y);

    //TODO style does not change every draw game func (extract above into initialize func)
    ctx.fillStyle = "blue";
    ctx.font = "40px Arial";

    ctx.fillText(score, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        createFood();
    } else {
        snake.pop();
    }

    function eatTail(head, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (head.x == arr[i].x && head.y == arr[i].y) {
                gameOver();
            }
        }
    }

    console.log("snakeX: ", snakeX, "snakeY: ", snakeY);
    if (snakeX < box || snakeX > box * 17 || snakeY < box || snakeY > box * 15) {
        console.log("GAME OVER snakeX: ", snakeX, "snakeY: ", snakeY);
        gameOver();
    }

    if (dir == "left") {
        snakeX -= box;
    } else if (dir == "right") {
        snakeX += box;
    } else if (dir == "up") {
        snakeY -= box;
    } else if (dir == "down") {
        snakeY += box;
    }
    console.log("AFTER MOVE: snakeX: ", snakeX, "snakeY: ", snakeY);

    let newSnake = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newSnake, snake);

    snake.unshift(newSnake);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

let game = setInterval(drawGame, 500 - score * 10);