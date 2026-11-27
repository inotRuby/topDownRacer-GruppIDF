//main file for gameloop
class GameEngine {
    constructor(canvasID, rows, cols, cell_size) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext("2d");
        this.keyList = {};
        this.objectList = [];

        this.gridLayout = [];

        //this.player = new this.player(); 

        this.rows = rows;
        this.cols = cols;
        this.cell_size = cell_size;
        this.initInput();

    }
    initInput() {
        window.addEventListener("keydown", (e) => {
            this.keyList[e.key] = true; 
        })
        window.addEventListener("keyup", (e) => {
            this.keyList[e.key] = false;
        })
    }
    drawGrid() {
        for (let r = 0; r < this.rows; r++) {
            this.gridLayout[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this.gridLayout[r][c] = 0;
            }
        }
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let x = c * this.cell_size;
                let y = r * this.cell_size;
                this.ctx.strokeStyle = "#cccccc";
                this.ctx.strokeRect(x,y,this.cell_size,this.cell_size);
                
            }
        }
    }
    drawObject(obj){
        this.ctx.fillStyle = obj.color;
        this.ctx.fillRect(obj.x,obj.y,obj.width,obj.height);
    }
    gameLoop(){
        //1. handle input
        //2. update all objects
        //3. clear screen
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        //4. redraw everything
        for(let obj of this.objectList){
            this.drawObject(obj);
        }
        //5. request next frame
        requestAnimationFrame(() => this.gameLoop());
    }
}
const test = new GameEngine("canvas",20,30,20)
//height="400" width="600"
test.drawGrid();
console.log(test.gridLayout);

