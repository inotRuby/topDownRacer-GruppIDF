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
