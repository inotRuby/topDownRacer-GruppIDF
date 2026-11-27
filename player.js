class Player {
    constructor(x, y, width, height, speed, color) {
        // här behövs ingenting ändras om inte fler stats behövs
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
    }

    hanteraStyrning(keyLista) {
        // this.vx och this.vy är hastigheten vi lägger på spelarens x och y värden (för nu)
        // systemet måste ändras att kunna hantera svängningar
        // a och d ska vrida rectangeln istället för att flytta den
        this.angle ??= 0; // which way the car points (radians)
        this.fart ??= 0;  // current forward speed (negative = reversing)

        if (keyLista["ArrowUp"] || keyLista["w"] || keyLista["W"]) this.fart += 0.2;
        if (keyLista["ArrowDown"] || keyLista["s"] || keyLista["S"]) this.fart -= 0.2;

        // only turn while moving
        if (Math.abs(this.fart) > 0.1) {
            if (keyLista["ArrowLeft"] || keyLista["a"] || keyLista["A"]) this.angle -= 0.05;
            if (keyLista["ArrowRight"] || keyLista["d"] || keyLista["D"]) this.angle += 0.05;
        }
    }

    uppdatera() {
        // här ska självaste förflyttning ske
        // eventuel extra logik som spelaren behöver
        this.fart *= 0.96; // friction: slow down a little every frame
        this.fart = Math.max(-this.speed, Math.min(this.speed, this.fart)); // top speed
        this.x += Math.cos(this.angle) * this.fart;
        this.y += Math.sin(this.angle) * this.fart;
    }

    kollision() {
        // här ska kollisionshantering ske
        // tänk på att vi inte jobbar med en cirkulär hitbox utan en fyrkantig hitbox
    }

    rita(ctx) {
        ctx.save(); // kommer ihåg canvas state
        ctx.translate(this.x, this.y); //flyttar bil position 
        ctx.rotate(this.angle || 0); // roterar bil position
        ctx.fillStyle = this.color; // sätter färg på bil
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height); // ritar bil
        ctx.restore(); // återställer canvas state
}}








const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Spelare
const player = {
x: 100,
y: 200,
radius: 15,
speed: 200 // pixlar per sekund
};

// Hinder (Rektangel)
const obstacle = {
x: 250,
y: 125,
width: 100,
height: 150
};

// Knappar
const keys = {};
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

let lastTime = performance.now();

function update(dt) {
// 1. Läs in riktning från WASD
let dx = 0;
let dy = 0;

if (keys['w']) dy -= 1;
if (keys['s']) dy += 1;
if (keys['a']) dx -= 1;
if (keys['d']) dx += 1;

// Normalisera vid diagonal rörelse
if (dx !== 0 && dy !== 0) {
    const length = Math.hypot(dx, dy);
    dx /= length;
    dy /= length;
}

// Beräkna ny position
let nextX = player.x + dx * player.speed * dt;
let nextY = player.y + dy * player.speed * dt;

// 2. Kollision mot Canvas kanter
nextX = Math.max(player.radius, Math.min(canvas.width - player.radius, nextX));
nextY = Math.max(player.radius, Math.min(canvas.height - player.radius, nextY));

// 3. Kollision mot hindret (Cirkel mot Rektangel)
const closestX = Math.max(obstacle.x, Math.min(nextX, obstacle.x + obstacle.width));
const closestY = Math.max(obstacle.y, Math.min(nextY, obstacle.y + obstacle.height));

const distX = nextX - closestX;
const distY = nextY - closestY;
const distance = Math.hypot(distX, distY);

if (distance < player.radius) {
    const overlap = player.radius - distance;
    if (distance > 0) {
        nextX += (distX / distance) * overlap;
        nextY += (distY / distance) * overlap;
    }
}

// Tilldela uppdaterade koordinater
player.x = nextX;
player.y = nextY;
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Rita Hinder
ctx.fillStyle = '#e74c3c';
ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

// Rita Spelare
ctx.beginPath();
ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
ctx.fillStyle = '#3498db';
ctx.fill();
}

function loop(time) {
const dt = (time - lastTime) / 1000;
lastTime = time;

update(dt);
draw();

requestAnimationFrame(loop);
}

requestAnimationFrame(time => {
lastTime = time;
loop(time);
});
