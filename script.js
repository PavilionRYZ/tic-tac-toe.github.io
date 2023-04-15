const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const time= document.querySelector(".time");
const newGameBtn = document.querySelector(".btn");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds=document.getElementById("seconds");

let currentPlayer;
let gameGrid;
// dispaly date and time

function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var session = document.getElementById('session');

    if(hrs >= 12){
        session.innerHTML='PM';
    }
    else{
        session.innerHTML='AM';
    }

    if(hrs>12){
        hrs = hrs -12;
    }
    hours.innerHTML=hrs;
    minutes.innerHTML=min;
    seconds.innerHTML=sec;

} 

setInterval(displayTime, 10);



const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// lets create a fun to init the game 

function initGame() {
    currentPlayer="X";
    gameGrid = ["","","","","","","","",""];
    // empty the UI 
    boxes.forEach((box,index)=>{
    box.innerHTML="";
    boxes[index].style.pointerEvents = "all";
    box.classList=`box box${index+1}`;
});
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `current Player -${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer ==="X")
    {
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X";
    }

    // update the UI 
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
     
    winningPositions.forEach((position)=>
    {
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]]  !==""|| gameGrid[position[2]] !=="" )
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
                  if(gameGrid[position[0]]==="X")
                  answer="X";
                  else
                  answer = "O";

                  boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                  })

                  boxes[position[0]].classList.add("win");
                  boxes[position[1]].classList.add("win");
                  boxes[position[2]].classList.add("win");
        }
    });


    // get a winner or draw the match
    if(answer!=""){
        gameInfo.innerHTML = `Winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //check weather there is tie 
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
        fillCount++;
    });
    if(fillCount===9){
        gameInfo.innerHTML = "Game-Tied";
        newGameBtn.classList.add("active");
    }
   
}

function handleClick(index){
    if(gameGrid[index] ===""){
        boxes[index].innerHTML= currentPlayer;
        gameGrid[index] = currentPlayer;
        // swap player 
        swapTurn();
        // check if any one win the game 
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>
    {
        handleClick(index);
    })
});
newGameBtn.addEventListener("click", initGame);
