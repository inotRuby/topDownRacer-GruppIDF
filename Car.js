//this file is for the car class
class Cars extends Player {

    constructor(x, y, width, height, speed, color, playerNumber) {
        super(x, y, width, height, speed, color);
        // playerNomber är inte relevant just nu
        // playerNumber ska defineras som vilken spelare
        // t.ex player 1 har playerNumber 1 och player 2 har playerNumber 2
        this.playerNumber = playerNumber;
    }

    
}
/*also this is the first js file that the html loads 
meaning that things that need to be defined 
in all folders have to be defined here */
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
