let dice1=document.getElementById('dice1');
let dice2=document.getElementById('dice2');
let result= document.getElementById('result');
let score1= document.getElementById('score1');
let score2= document.getElementById('score2');
let scoreCount1=0;
let scoreCount2=0;
let reset_text= document.getElementById('reset');
let reset=0;
let btn= document.getElementById('btn');
function rollDice(){
    let number1= Math.floor(Math.random()*6 +1);
    let number2= Math.floor(Math.random()*6 +1);
    dice1.classList=`roll bx bxs-dice-${number1}`;
    dice2.classList=`roll bx bxs-dice-${number2}`;
    if(number1>number2){
        scoreCount1++;
        score1.textContent=scoreCount1;
    }
    else if(number1<number2){
        scoreCount2++;
        score2.textContent=scoreCount2;
    }
    let winner;
    if(scoreCount1>scoreCount2){
        winner="Player 1";
    }
   
    else if(scoreCount1<scoreCount2){
        winner="Player 2";
    }
    else{
        winner="Tie"
    }
    result.textContent=winner;
    reset++;
    if(reset===3){
        reset_text.textContent="Game Over!"
        btn.textContent="Reset Game"
    }
    else if(reset>3)
    resetFunction();
}

function resetFunction(){
    btn.textContent="Roll Dices"
    reset_text.textContent="Start Game!"
    scoreCount1=0
    scoreCount2=0
    score1.textContent=scoreCount1;
    score2.textContent=scoreCount2;
    winner=" ";
    result.textContent=winner;
    reset=0;
}
