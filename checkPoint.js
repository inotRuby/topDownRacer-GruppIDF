//file for checkPoint class
class Checkpoint{
    constructor(x,y,width,height,level,checked=false){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.checked=checked;
        this.level=level;
    }
}

const checkpoints = [
    n = new Checkpoint(0,0,100,100,1),
    m = new Checkpoint(canvas.width-100, canvas.height-100, 100,100,1),
    p = new Checkpoint(0,0,canvas.width,canvas.height,2)
];

function check(cp){
    ctx.fillStyle = 'green'
    ctx.fillRect(cp.x, cp.y, cp.width, cp.height)
};

/*
if (playercollision checkpoint){
    checkpoint.checked=true
}
*/


/*code that activates checkpoints, currently active in draw() in movementcollision.js
for (const cp of checkpoints){
        if (cp.level === 1){
            check(cp)
        }
    }
*/

/*
non dynamic measurements *optional
draw checkpoints                       Works
check that player has gone through checkpoint
different checkpoints depending on level
*/