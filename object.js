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