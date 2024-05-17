
const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-Info");
const newgameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;


const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//initialising a function

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

 //UI ko v empty karna padega boxes ko

    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
 //initialises  box with css properties again
 


    });
    
    
    //UI update
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}

initGame();
 


function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer ="X";
    }
    //UI Update
    gameInfo.innerText=`Current Player-${currentPlayer}`;

}

function checkGameOver() {
    let answer="";

    winningPositions.forEach((position)=>{

//all 3 positions should be non empty and exactly same in value

if( (gameGrid[position[0]]!=="" || gameGrid[position[1]]!==""|| gameGrid[position[2]]!=="")
&& (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]]))

{
//check if winner is x
if(gameGrid[position[0]]==='X')
answer="X";
else
answer="0";


boxes.forEach((box)=>{
    box.style.pointerEvents="none"
})


//now we know x/0 is a winner


boxes[position[0]].classList.add("win");
boxes[position[1]].classList.add("win");
boxes[position[2]].classList.add("win");


}

}
    );

//It means we have a winner

if (answer!==""){
    gameInfo.innerText=`Winner Player-${answer}`;
    newgameBtn.classList.add("active");
    console.log(newgameBtn.classList);
}
 
//It means we have tie

let fillCount=0;
gameGrid.forEach((box)=>{
    if(box!=="")
    fillCount++;
});

//board is filled but game is tied

if(fillCount===9){
    gameInfo.innerText="Game Tied !";
    newgameBtn.classList.add("active");
}





//It means we have a winner

if (answer!==""){
    gameInfo.innerText=`Winner Player-${answer}`;
    newgameBtn.style.display="block";
}
    }


    newgameBtn.addEventListener("click",()=>{
        initGame();
    });



    function handleClick(index){
        if(gameGrid[index]===""){
            boxes[index].innerText=currentPlayer;
            gameGrid[index]=currentPlayer;
            boxes[index].style.pointerEvents="none";
            //swap the turn
            swapTurn();
            //check koi jit to nahi gaya
            checkGameOver();
        }
    }


    boxes.forEach((box,index)=>{
        box.addEventListener("click",()=>{
            handleClick(index);
        })
    });

