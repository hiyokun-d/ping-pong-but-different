const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth;
canvas.height = innerHeight;

class Rectangle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c
    this.width = 15;
    this.height = 15
  }

  draw() {
    ctx.fillStyle = this.c
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Ball {
  constructor(x, y, c) {
    this.x = x;
    this.y = y
    this.c = c
    this.radius = 5
    this.speed = 10
    this.velocity = {
      x: 1,
      y: 0,
    }
  }

  draw() {
    ctx.fillStyle = this.c
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    this.move()
  }

  move() {
    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;
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

const ballLeft = new Ball((canvas.width / 10) / 2, (canvas.height / 10) / 2, "black")

// LEFT SIDE OF THE SCREEN
for (let i = 0; i < 50; i++) {
  const x = Math.floor(i * (canvas.width / 50) / 2);
  for (let j = 0; j < 45; j++) {
    const y = Math.floor(j * (canvas.height / 50));
    left.push(new Rectangle(x, y, "gray"))
  }
}

// RIGHT SIDE OF THE SCREEN
for (let i = 0; i < 50; i++) {
  const x = Math.floor(canvas.width - (i + 1) * (canvas.width / 50) / 2)
  for (let j = 0; j < 45; j++) {
    const y = Math.floor(j * (canvas.height / 50))
    right.push(new Rectangle(x, y, "lightgray"))
  }
}

function game() {
  requestAnimationFrame(game)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  left.forEach((k, i) => {
    k.draw()

  })

  right.forEach((k, i) => {
    k.draw()

    if (RectCircleColliding(ballLeft, k) && k.c === "black") {
      
      right[i] = new Rectangle(k.x, k.y, "gray")
    }
  })

  ballLeft.draw()
}

game()
