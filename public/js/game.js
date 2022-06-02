let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");

let playingField = new Image();
playingField.src = "public/image/playingField.png";

let foodImage = new Image();
foodImage.src = "public/image/food.png";

let box = 32;

let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

let head = new Image();
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 8 * box
};

document.addEventListener("keydown", direction);

let dir = "left";

function direction(event) {
    if (event.keyCode === 37 && dir != "right") {
        dir = "left";
    }
    else if (event.keyCode === 38 && dir != "down") {
        dir = "up";
    }
    else if (event.keyCode === 39 && dir != "left") {
        dir = "right";
    }
    else if (event.keyCode === 40 && dir != "up") {
        dir = "down";
    }
}

function drawGame() {
    ctx.drawImage(playingField, 0, 0);
    ctx.drawImage(foodImage, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(score, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        };
    }
    else {
        snake.pop();
    }

    function eatTail(head, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (head.x == arr[i].x && head.y == arr[i].y) {
                clearInterval(game);
            }
        }
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < box || snakeY > box * 15) {
        clearInterval(game);
        location.reload()
    }

    if (dir == "left") {
        snakeX -= box;
    }
    else if (dir == "right") {
        snakeX += box;
    }
    else if (dir == "up") {
        snakeY -= box;
    }
    else if (dir == "down") {
        snakeY += box;
    }

    let newSnake = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newSnake, snake);

    snake.unshift(newSnake);
}

let game = setInterval(drawGame, 200);