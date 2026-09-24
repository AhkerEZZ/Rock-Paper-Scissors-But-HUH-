const buttons = document.querySelectorAll(".buttons");
const countdownDisplay = document.getElementById("countdownDisplay");
let canClick = false;
let playerHasChosen = false;
let robotChoice;
let playerChoice;
let resultDisplay = document.getElementById("result");
const startGamebtn = document.getElementById("startGame");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const robotScoreDisplay = document.getElementById("robotScoreDisplay");
let playerScore = 0;
let robotScore = 0;

startGamebtn.addEventListener("click", () => {
    startGamebtn.style.display = "none";
    document.getElementById("robotImg").src = `Assets/defaultRobot.png`;
    startRound();
    resultDisplay.textContent = "";
    buttons.forEach((btn) => {
        btn.style.backgroundColor = "hsl(61, 82%, 95%)"
    })
})


function startRound(){
    let countdown = 3;
    countdownDisplay.textContent = countdown;
    let countdownInterval = setInterval(() => {
        countdown--;


        if(countdown > 0){
            countdownDisplay.textContent = countdown;
        }
        else{
            clearInterval(countdownInterval);
                revealRobotChoice();
                canClick = true;
                playerHasChosen = false;
                countdownDisplay.textContent = `GO!`;

            let oneSecondCountdown = 1.0;
            let reactionInterval = setInterval(() => {
                oneSecondCountdown -= 0.1;
                countdownDisplay.textContent = `GO! ${oneSecondCountdown.toFixed(1)}`;

                if(oneSecondCountdown < 0.1){
                    clearInterval(reactionInterval);
                }
            },100)

            setTimeout(() => {
                 canClick = false;
                 if(!playerHasChosen){
                    resultDisplay.textContent = "TOO LATE! You Lose!"
                    resultDisplay.style.color = "tomato";
                    startGamebtn.style.display = "block";
                     robotScore++;
                    robotScoreDisplay.textContent = robotScore;
                    }
                else if(playerHasChosen){
        
                if(playerChoice === robotChoice){
                    resultDisplay.textContent = `IT'S A TIE`
                    resultDisplay.style.color = "black"
                     startGamebtn.style.display = "block";
                }
                else{
                    switch(playerChoice){
                        case "rock":
                            resultDisplay.textContent = (robotChoice === "paper") ? "YOU WIN!" : "YOU LOSE!";
                        break;
                         case "paper":
                            resultDisplay.textContent = (robotChoice === "scissors") ? "YOU WIN!" : "YOU LOSE!";
                        break;
                         case "scissors":
                            resultDisplay.textContent = (robotChoice === "rock") ? "YOU WIN!" : "YOU LOSE!";
                        break;
                    }
                    switch(resultDisplay.textContent){
                        case "YOU WIN!":
                            resultDisplay.style.color = "lightgreen";
                            playerScore++;
                            playerScoreDisplay.textContent = playerScore;
                        break;
                        case "YOU LOSE!":
                            resultDisplay.style.color = "tomato";
                            robotScore++;
                            robotScoreDisplay.textContent = robotScore;
                        break;
                        default:
                            resultDisplay.style.color = "black";
                    }
                    resultDisplay.style.display = "block";
                    startGamebtn.style.display = "block";
                }
             }
                }, 1000);
            }
}, 1000)

}

function revealRobotChoice(){
   let random = Math.floor(Math.random() * 3)

    switch(random){
        case 0:
             robotChoice = "rock"
        break;
        case 1:
            robotChoice = "paper"
        break;
        case 2: 
            robotChoice = "scissors"
        break;
    }
    document.getElementById("robotImg").src = `Assets/${robotChoice}Robot.png`;
    resultDisplay.style.display = "block";
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(!canClick){
            return;
        }
        playerHasChosen = true;
        playerChoice = button.id;
          buttons.forEach(btn => 
        btn.style.backgroundColor = "hsl(61, 82%, 95%)"
    )
     button.style.backgroundColor = "lightgreen";
})
})


