/** @type {HTMLCanvasElement} */
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// tải ảnh

var basket = new Image();
var bg = new Image();
var bricksDown = new Image();

basket.src = "images/basket.png"; // rổ hứng
bg.src = "images/bg.png"; // background
bricksDown.src = "images/Bricks.png"; // viên gạch

// files nhạc

var sc = new Audio();
var run = new Audio();

sc.src = "sounds/punch.mp3";
run.src = "sounds/run.mp3";

// vị trí xuất hiện đầu tiên của basket - rổ
var bx = 400;
var by = 798;

var score = 0;
var miss = 0;
var bricksX = [0,225,450,675,800]; // cái này để random vị trí gạch rơi

document.addEventListener("keydown", keyHandler);

/**
 * Handle KeyPress
 * @param   {KeyboardEvent} event
 */
function keyHandler(event) {
    if (event.keyCode == 37)
        leftshift();
    else if (event.keyCode == 39)
        rightshift();
}

function rightshift() {
    bx += 20;
    //run.play();
}

function leftshift() {
    bx -= 20;
    //run.play();
}

var move = 1.5;
var bricks = [];
bricks[0] = { x: 0, y: 222 }

//
function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < bricks.length; i++) {
    ctx.drawImage(bricksDown, bricks[i].x, bricks[i].y);
    
    
    bricks[i].y++;

    if (bricks[i].y == 342) {
      bricks.push({
        x: bricksX[Math.floor(Math.random() * bricksX.length)],
        y: 222,
      });
    }

    if (bricks[i].y == 797) {
        miss += 1;

        // Loại bỏ brick tại vị trí hiện tại (i)
        bricks.splice(i, 1);

        // Giảm i đi -1 để viên gạch tiếp theo ko bị bỏ qua
        // tại lần lặp tiếp theo
        i--;
        continue;
    }

    if (miss >= 3) {
      // location.reload();
    }

    if (
      bx < bricks[i].x + bricksDown.width && basket.width + bx > bricks[i].x
      && by - basket.height < bricks[i].y + bricksDown.height && by > bricks[i].y
    ) {
        score++;

        // Loại bỏ brick tại vị trí hiện tại (i)
        bricks.splice(i, 1);
        //sc.play();

        // Giảm i đi -1 để viên gạch tiếp theo ko bị bỏ qua
        // tại lần lặp tiếp theo
        i--;
    }
  }

  ctx.drawImage(basket, bx, by - basket.height);

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 10);
  ctx.fillText("miss : " + miss, 800, cvs.height - 10);

  requestAnimationFrame(draw);
}
draw();
