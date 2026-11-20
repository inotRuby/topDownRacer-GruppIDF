//main file for gameloop
class GameEngine {
    constructor(canvasID, rows, cols, cell_size) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext("2d");
        this.keyList = {};
        this.objectList = [];

        this.gridLayout = [];

        this.player = new this.player(); 

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
                grid[r][c] = 0;
            }
        }
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                x = c * this.cell_size;
                y = r * this.cell_size;

                
            }
        }
    }

}
