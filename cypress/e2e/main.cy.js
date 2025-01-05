describe('Visit the Git Pages URL for the RPS project', () => {
  it('the page exists and loads correctly', () => {
    cy.visit('https://sarav929.github.io/codespace-rps/');
  });
});

// Features to test:
// 1. Players should be able to make a choice (rock, paper, scissors)
// 2. The UI updates to display the player's choice
// 3. The game determines the winner/loser based on the rules
// 4. The UI updates to display the result (win, lose, tie)

// check button content

describe('Visit the page and check the button content', () => {
  it('The buttons display the choices "Rock", "Paper" and "Scissors"', () => {
    cy.visit('https://sarav929.github.io/codespace-rps/');
    cy.get('#rock').should('contain', 'Rock');
    cy.get('#paper').should('contain', 'Paper');
    cy.get('#scissors').should('contain', 'Scissors');
  });

  // check if player's choice display correctly in UI

  it("When buttons are clicked player's choice displays correctly", () => {
    cy.visit('https://sarav929.github.io/codespace-rps/');
    cy.get('#rock').click();
    cy.get('#your-choice').should('contain', 'rock');
    cy.get('#paper').click();
    cy.get('#your-choice').should('contain', 'paper');
    cy.get('#scissors').click();
    cy.get('#your-choice').should('contain', 'scissors');
  });

  // check if computer's choice displays correctly in UI

  it("When button is clicked by player computer's choice is made between possibile options and displayed correctly", () => {
    cy.visit('https://sarav929.github.io/codespace-rps/');
    // click on all the buttons
    cy.get('button').each((button) => {
      cy.wrap(button).click();
      // check if computer's choice matches the possible choices
      cy.get('#computer-choice')
        .invoke('text')
        .should('match', /^(rock|paper|scissors)$/);
    });
  });

  // check win combinations

  it('Correctly recognises win combinations and displays the correct winning message', () => {
    cy.visit('https://sarav929.github.io/codespace-rps/');

    cy.get('button').each((button) => {
      cy.wrap(button)
        .invoke('text') // Get the player's choice text
        .then((playerChoice) => {
          cy.wrap(button).click(); // Click the button

          cy.get('#computer-choice')
            .invoke('text')
            .then((computerChoice) => {
              // Normalize both choices for comparison
              const player = playerChoice.toLowerCase();
              const computer = computerChoice.toLowerCase();

              if (player === computer) {
                // Tie condition
                cy.get('#result').should('have.text', "😶 It's a tie! 😶");
              } else if (
                (player === 'rock' && computer === 'paper') ||
                (player === 'paper' && computer === 'scissors') ||
                (player === 'scissors' && computer === 'rock')
              ) {
                // Lose condition
                cy.get('#result').should('have.text', '💀 You lose 💀');
              } else {
                // Win condition
                cy.get('#result').should('have.text', '✨ You win! ✨');
              }
            });
        });
    });
  });
});
