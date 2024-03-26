const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth;
canvas.height = innerHeight;

class Rectangle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c
    this.width = 25;
    this.height = 25
  }

  draw() {
    ctx.fillStyle = this.c
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

}

class Ball {
  constructor(x, yRange, color, radius = 10, speed = 5, velocityYRange = [-1, 1]) {
    this.x = x;
    this.y = Math.random() * (yRange[1] - yRange[0]) + yRange[0]; // Randomize the initial y position
    this.color = color;
    this.radius = radius;
    this.speed = speed;
    this.velocity = {
      x: 1,
      y: Math.random() * (velocityYRange[1] - velocityYRange[0]) + velocityYRange[0] // Randomize the initial y-axis velocity
    };
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    this.move();
  }

  move() {
    // Update the next position based on velocity
    const nextX = this.x + this.velocity.x * this.speed;
    const nextY = this.y + this.velocity.y * this.speed;

    // Check if the next position is within the canvas bounds
    if (nextX > this.radius && nextX < canvas.width - this.radius) {
      this.x = nextX;
    } else {
      // If the next position would move the ball out of the canvas horizontally, reverse its horizontal velocity
      this.velocity.x *= -1;
    }

    // Check if the next position is within the canvas bounds
    if (nextY > this.radius && nextY < canvas.height - this.radius) {
      this.y = nextY;
    } else {
      // If the next position would move the ball out of the canvas vertically, reverse its vertical velocity
      this.velocity.y *= -1;
    }
  }
}



// Arena
const left = []
const right = []
// --------------

function RectCircleColliding(circle, rect) {
  var distX = Math.abs(circle.x - rect.x - rect.width / 2);
  var distY = Math.abs(circle.y - rect.y - rect.height / 2);

  if (distX > (rect.width / 2 + circle.radius)) { return false; }
  if (distY > (rect.height / 2 + circle.radius)) { return false; }

  if (distX <= (rect.width / 2)) { return true; }
  if (distY <= (rect.height / 2)) { return true; }

  var dx = distX - rect.width / 2;
  var dy = distY - rect.height / 2;
  return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}

// Define y-axis ranges for the initial position of balls
const yRange = [canvas.height / 10, canvas.height - canvas.height / 10];

// Initialize ballLeft with a randomized initial y position within the yRange
const ballLeft = new Ball((canvas.width / 10) / 2, yRange, "#011436");

// Initialize ballRight with a randomized initial y position within the yRange
const ballRight = new Ball(canvas.width - (canvas.width / 10) / 2, yRange, "#005f85");


const arena = 50
const arenaMargin = 50

// LEFT SIDE OF THE SCREEN
for (let i = 0; i < arena; i++) {
  const x = Math.floor(i * (canvas.width / arenaMargin) / 2);
  for (let j = 0; j < arena; j++) {
    const y = Math.floor(j * (canvas.height / arenaMargin));
    left.push(new Rectangle(x, y, "#005f85"))
  }
}

// RIGHT SIDE OF THE SCREEN
for (let i = 0; i < arena; i++) {
  const x = Math.floor(canvas.width - (i + 1) * (canvas.width / arenaMargin) / 2)
  for (let j = 0; j < arena; j++) {
    const y = Math.floor(j * (canvas.height / arenaMargin))
    right.push(new Rectangle(x, y, "#011436"))
  }
}

function game() {
  requestAnimationFrame(game)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

   left.forEach((k, i) => {
    k.draw();

    if (RectCircleColliding(ballRight, k) && k.c === "#005f85") {
      ballRight.velocity.x = -ballLeft.velocity.x;
      gsap.to(k, { duration: 0.5, width: 0, height: 0, onComplete: () =>{
        left.splice(i, 1, new Rectangle(k.x, k.y, "#011436"))
        right.push(new Rectangle(k.x, k.y, "#011436"));
      } });
    }
  });

  right.forEach((k, i) => {
    k.draw();

    if (RectCircleColliding(ballLeft, k) && k.c === "#011436") {
      ballLeft.velocity.x = -ballLeft.velocity.x;
      gsap.to(k, { duration: 0.5, width: 0, height: 0, onComplete: () => {
        right.splice(i, 1, new Rectangle(k.x, k.y, "#005f85"))
        left.push(new Rectangle(k.x, k.y, "#005f85"));
      } });
    }
  });

  ballLeft.draw();
  ballRight.draw();
}

game()
