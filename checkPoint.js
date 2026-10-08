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
    m = new Checkpoint(canvas.width-100, canvas.height-100, 100,100,1)
];

function check(cp){
    ctx.fillStyle = 'green'
    ctx.fillRect(cp.x, cp.y, cp.width, cp.height)
};
/*oden som ritar ut checkpoints, ligger nu aktivt i draw() i movementcollision.js
for (const cp of checkpoints){
            check(cp)
        }
*/

/*
hårdkodade mått
rita ut checkpoints
checka så player har åkt genom checkpoints
*/