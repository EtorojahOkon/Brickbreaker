//variables
var c = document.getElementById("canvas")
c.height = window.innerHeight - 20
c.width = window.innerWidth -30
var ctx = c.getContext("2d")
var collisionaud = document.getElementById("collideaud")
var failedaud = document.getElementById("failedaud")
var backgroundMusic = new Audio("./assets/sounds/background.mp3")
backgroundMusic.loop = true
var highscore = (localStorage.getItem("highscore") == null) ? 0 : parseInt(localStorage.getItem("highscore"))
var curscore = 0
var x = c.width/2;
var y = c.height/2;
var player_speed = 14
var i_x = 0
const i_y1 = 0
const i_y2 = 60
const i_y3 = 120
var bricks = []
var player_position = [c.width/2,c.height-30]
const ballRadius = 10;
var speed_y = -2
var speed_x = 2

//event handlers
window.addEventListener("resize", handleResize);
window.addEventListener("keydown", movePlayer);
//setInterval(moveBall, 10);
addNewBricks()

//display block
document.getElementById("score").innerHTML = curscore
document.getElementById("highscore").innerHTML = highscore

//functions
function startGame(){
    document.getElementById("startmenu").style.display = "none"
    document.getElementById("endmenu").style.display = "none"
    document.getElementById("scorearea").style.display = "block"
    backgroundMusic.play()
    setInterval(moveBall, 10);
}

function handleResize(){
    c.height = window.innerHeight - 20
    c.width = window.innerWidth -30
}

function addNewBricks() {
    for (let i = 0; i < c.width/70; i++) {
        bricks.push([i_x, i_y1, 40, 40]) 
        i_x = i_x +60
    }
    i_x = 0
    for (let i = 0; i < c.width/70; i++) {
        bricks.push([i_x, i_y2, 40, 40]) 
        i_x = i_x +60
    }
    i_x = 0
    for (let i = 0; i < c.width/70; i++) {
        bricks.push([i_x, i_y3, 40, 40]) 
        i_x = i_x +60
    }
    i_x = 0
}

function moveBall() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "cadetblue"
    ctx.fillRect(player_position[0], player_position[1], 70,15)
    for (let k = 0; k < bricks.length; k++) {
        ctx.fillRect(bricks[k][0], bricks[k][1], bricks[k][2],bricks[k][3])
    }
    ctx.fill();
    ctx.closePath();
    x += speed_x;
    y += speed_y;
    document.getElementById("score").innerHTML = curscore
    checkCollision()

}
  
function checkCollision() {
    //canvas edge collission
    if(y + speed_y < ballRadius) {
        speed_y = -speed_y;
    }
    if(x + speed_x > c.width-ballRadius || x + speed_x < ballRadius) {
        speed_x = -speed_x;
    }
    //player collission
    if(x > player_position[0] && x < player_position[0]+70 && y > player_position[1] && y < player_position[1]+15) {
        collisionaud.play()
        speed_y = -speed_y;
    }
    //brick collision
    for (let v = 0; v < bricks.length; v++) {
        if(x > bricks[v][0] && x < bricks[v][0]+bricks[v][2] && y > bricks[v][1] && y < bricks[v][1]+bricks[v][3]) {
            collisionaud.play()
            speed_y = -speed_y;
            bricks.splice(v,1)
            curscore = curscore + 10
        }      
    }
    if (bricks.length == 0) {
        addNewBricks() 
    }
    if(y + speed_y > c.height ) {
       gameOver()
       speed_y = -speed_y;
    }
        
}


function movePlayer(key){
    var codeKey = key.which||key.keyCode;
    switch (codeKey) {
        case 37:
            if(player_position[0] + player_speed < 70) {}
            else{
                player_position[0] = parseInt(player_position[0]) - player_speed
            }
            break;
        case 39:
            if ( player_position[0] + player_speed > c.width-70) {}
            else{
                player_position[0] = parseInt(player_position[0]) + player_speed
            }
            break;
        default:
            console.log(codeKey)
            break;
    }
}

function gameOver(){
    failedaud.play()
    for (let z = 0; z < 100; z++) {
        clearInterval(z)        
    }
    calculateScore()
    document.getElementById("endmenu").style.display = "block"
    document.getElementById("finalscore").innerHTML = curscore
    document.getElementById("finalhighscore").innerHTML = highscore
}

function calculateScore(){
    if (curscore > highscore) {
        highscore = curscore
        localStorage.setItem("highscore", highscore)
    }
}



