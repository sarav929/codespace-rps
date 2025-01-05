const buttons = document.querySelectorAll('button');
const yourChoice = document.getElementById('your-choice');
const computerChoice = document.getElementById('computer-choice');
const result = document.getElementById('result');
const options = ['rock', 'paper', 'scissors'];

let yourOption;
let computerOption;

function getComputerChoice(array) {
  let random = Math.floor(Math.random() * array.length);
  return array[random];
}

function checkWin(player1, player2) {
  if (player1 == player2) {
    return "It's a tie!";
  }

  if (player1 == 'rock') {
    if (player2 == 'paper') {
      return '💀 You lose 💀';
    }
  } else if (player1 == 'scissors') {
    if (player2 == 'rock') {
      return '💀 You lose 💀';
    }
  } else if (player1 == 'paper') {
    if (player2 == 'scissors') {
      return '💀 You lose 💀';
    }
  }
  return '✨ You win! ✨';
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    yourOption = buttons[i].id;
    yourChoice.textContent = yourOption;
    computerOption = getComputerChoice(options);
    computerChoice.textContent = computerOption;
    result.textContent = checkWin(yourOption, computerOption);
  });
}
