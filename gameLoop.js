//main file for gameloop
function gameloop(){
        requestAnimationFrame(time => {
        lastTime = time;
        loop(time);
    });
}
gameloop()