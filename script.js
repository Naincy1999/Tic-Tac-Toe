let boxes = document.querySelectorAll(".box");                 //accessing all boxes//
let resetBtn = document.querySelector("#reset-btn");           //accessing reset button//
let newBtn = document.querySelector("#new-btn");               //accessing new button(button to be displayed after the winning round)//
let msgContainer = document.querySelector(".msg-container");   //accessing msg container(container containing contents to be displayed after winning round)//
let msg = document.querySelector("#msg");                      //accessing msg to be displayed after winning round//

let turnO = true ;       //playerX, playerO
let count = 0;           //To track draw

//patterns for winning the game//
const winPatterns = 
[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>
{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");        //addding msg container after the game is reset//
};

//making the boxes active by adding eventListener//
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            //playerO
            box.style.color = "green";
            box.innerText = "O";
            turnO = false;                 //setting it false for the next turn bcz the next turn goes to X.//
        } else {
            //playerX
            box.style.color = "dark pink";
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        // checkWinner();

        let isWinner = checkWinner();
        if (count === 9 && !isWinner)
        {
            gameDraw();
        }
    });
});


const gameDraw = () => 
{
    // console.log("Game was draw");
    msg.innerText = `Game was a draw`;
   msgContainer.classList.remove("hide");
   disableBoxes();
};


//making boxes disable after the winning round and the now the only left option for the player is to start a new game//
const disableBoxes = () =>
{
    for(let box of boxes)
    {
        box.disabled = true;
    }
};

//enabling box//
const enableBoxes = () =>
{
    for(let box of boxes)
    {
        box.disabled = false;
        box.style.color =  "#bc4749";
        box.innerText = "";
    }

};


//function to show winner//
const showWinner = (winner) =>  
{
    msg.innerText = `Congratulations, Winner is ${winner}.`;
    msgContainer.classList.remove("hide");
    disableBoxes();           //calling disable boxes//
}; 

//checking winners on the basis of patterns obtained//
const checkWinner = () =>
{
   for (let pattern of winPatterns)
   {
    //checking the value at a particular box//
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    //checking whether any box is empty//
    if(pos1Val != "" && pos2Val != "" && pos3Val != "")
    {
        //Winning condition//
        if(pos1Val===pos2Val && pos2Val===pos3Val)
        {
            // console.log("Winner", pos1Val);
            showWinner(pos1Val); 
            return true;              //callback to const checkWinner//
        }
    }
   }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);