
//IMPORTANT!!!
// Ändra ej denna fil och kopiera INGET från denna filen
// Denna fil ska inte heller vara ihopkopplad

class SpelObjekt {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.kollisionsradie = width / 2;
        this.aktiv = true;
    }


    påObjektet (px, py) {
        // beräkna avståndet från punkten till mitten av detta objekt
        const dx = px - this.x;
        const dy = py - this.y;
        return Math.hypot(dx, dy) <= this.kollisionsradie;
    }

    krockarMed(annatObjekt) {
        // cirkelkollision mellan två objekt
        const dx = annatObjekt.x - this.x;
        const dy = annatObjekt.y - this.y;
        const avstand = Math.hypot(dx, dy);
        return avstand < (this.kollisionsradie + annatObjekt.kollisionsradie);
    }

    uppdatera() {
        // implementeras i underklasser vid behov
    }

    rita(ctx) {
        // ändras till att rita en rektangel
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.kollisionsradie, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        
    }
}

class FlyttbartObjekt extends SpelObjekt {
    constructor(x, y, width, height, bildKalla) {
        super(x, y, width, height, bildKalla);
        this.vx = 0;
        this.vy = 0;
    }

    flytta(dx, dy) {
        this.x += dx;
        this.y += dy; 
    }

    uppdatera(){
        this.flytta(this.vx, this.vy);
    }
}

class StatisktObjekt extends SpelObjekt {
    constructor(x, y, width, height, bildKalla) {
        super(x, y, width, height, bildKalla);
    }
}


// ========================================================================
// KONKRETA KLASSER (Fyll i egna metoder och logik här)
// ========================================================================

class Spelare extends FlyttbartObjekt {

    constructor(x, y) {
        super(x, y, 40, 40, "player.png"); // "player.png" ska vara tom för att kunna rita bara hitbox
    }

    hanteraStyrning(keyLista) {
        this.vx = 0;
        this.vy = 0;
        if (keyLista["ArrowUp"] || keyLista["w"]) this.vy = -4;
        if (keyLista["ArrowDown"] || keyLista["s"]) this.vy = 4;
        if (keyLista["ArrowLeft"] || keyLista["a"]) this.vx = -4;
        if (keyLista["ArrowRight"] || keyLista["d"]) this.vx = 4;
    }

    uppdatera() {
        super.uppdatera();
        // eventuell extra logik för spelaren (t.ex. stoppa vid skärmkanter)
    }
}



class Block extends StatisktObjekt {
    // här läggs objekt som inte ska röra sig och forma banan
}


// ========================================================================
// SPELMOTORN
// ========================================================================

class Spel {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.keyLista = {};
        this.objektLista = [];

        // skapa spelare
        this.spelare = new Spelare(this.canvas.width / 2, this.canvas.height / 2);
        this.objektLista.push(this.spelare);
        this.initInput();
    }

    initInput() {
        window.addEventListener("keydown", (e) => {
            this.keyLista[e.key] = true;
        });
        window.addEventListener("keyup", (e) => {
            this.keyLista[e.key] = false;
        });
    }

    starta() {
        // starta spelloopen
        requestAnimationFrame(() => this.spelloop());
    }

    rensa() {
        // filter behåller endast objekt som är aktiva
        this.objektLista = this.objektLista.filter(obj => obj.aktiv);
    }

    spelloop() {
        // 1. hantera input
        this.spelare.hanteraStyrning(this.keyLista);

        // 2. uppdatera alla objekt
        for(let obj of this.objektLista) {
            obj.uppdatera();
        }

        // 3. rensa bort inaktiva objekt
        this.rensa();

        // 4. rensa skärmen och rita om
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let obj of this.objektLista) {
            obj.rita(this.ctx);
        }

        // 5. begär nästa frame
        requestAnimationFrame(() => this.spelloop());
    }
}

// starta spelet när sidan har laddats
window.onload = () => {
    const spel = new Spel("gameCanvas");
    spel.starta();
}