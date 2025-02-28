class HangmanGame {
   constructor(vocab) {
      this.vocab = vocab;
      this.answer = '';
      this.answerLetters = [];
      this.answerBlanks = [];
      this.wrongLetters = [];
      this.guessesLeft = 10; // Matches hangman parts count
      this.rightGuessCount = 0;
      this.winCount = 0;
      this.lossCount = 0;
      this.wordsPlayed = [];
      this.hangmanParts = document.querySelectorAll('.hangman-part');

      this.lettersBox = document.getElementById('letters-box');
      this.keyInputBox = document.getElementById('key-input');
      this.guessesLeftText = document.getElementById('guesses-left');
      this.winCountText = document.getElementById('win-count');
      this.lossCountText = document.getElementById('loss-count');
      this.wordsPlayedBox = document.getElementById('words-played');

      this.initializeGame();
   }

   initializeGame() {
      this.reset();
      document.addEventListener('keyup', (event) => this.handleKeyPress(event));
   }

   reset() {
      this.guessesLeft = 10;
      this.rightGuessCount = 0;
      this.wrongLetters = [];
      this.answer = this.vocab[Math.floor(Math.random() * this.vocab.length)];
      this.answerLetters = this.answer.split('');
      this.answerBlanks = Array(this.answer.length).fill('_');

      // Hide all hangman parts
      this.hangmanParts.forEach((part) => part.classList.remove('show'));

      this.updateUI();
   }

   updateUI() {
      this.lettersBox.innerHTML = 'Mystery Word: ' + this.answerBlanks.join(' ');
      this.keyInputBox.innerHTML = this.wrongLetters.join(' ');
      this.guessesLeftText.innerHTML = this.guessesLeft;
      this.winCountText.innerHTML = this.winCount;
      this.lossCountText.innerHTML = this.lossCount;
      this.wordsPlayedBox.innerHTML = this.wordsPlayed.join(' ');
   }

   handleKeyPress(event) {
      let userLetter = event.key.toLowerCase();

      if (
         !/[a-z]/.test(userLetter) ||
         this.wrongLetters.includes(userLetter) ||
         this.answerBlanks.includes(userLetter)
      ) {
         return;
      }

      if (this.answer.includes(userLetter)) {
         this.answerLetters.forEach((letter, index) => {
            if (letter === userLetter) {
               this.answerBlanks[index] = userLetter;
               this.rightGuessCount++;
            }
         });
      } else {
         this.wrongLetters.push(userLetter);
         this.guessesLeft--;

         // Show next hangman part
         let wrongIndex = 10 - this.guessesLeft - 1;
         if (this.hangmanParts[wrongIndex]) {
            this.hangmanParts[wrongIndex].classList.add('show');
         }
      }

      this.checkWinLoss();
      this.updateUI();
   }

   checkWinLoss() {
      if (this.rightGuessCount === this.answer.length) {
         this.winCount++;
         this.wordsPlayed.push(this.answer);
         alert('You won!');
         this.reset();
      } else if (this.guessesLeft === 0) {
         this.lossCount++;
         this.wordsPlayed.push(this.answer);
         alert('You lost! The word was: ' + this.answer);
         this.reset();
      }
   }
}

const vocab = [
   'alchemy',
   'chemistry',
   'alcohol',
   'algebra',
   'algorithm',
   'alkaline',
   'almanac',
   'average',
   'azimuth',
   'cipher',
   'nadir',
   'soda',
   'zenith',
   'admiral',
   'adobe',
   'alcove',
   'amber',
   'arsenal',
   'assassin',
   'mafia',
   'caliber',
   'candy',
   'check',
   'cork',
   'coffee',
   'cotton',
   'gauze',
   'guitar',
   'hazard',
   'lazuli',
   'mascara',
   'mattress',
   'monsoon',
   'racquet',
   'ream',
   'safari',
   'sash',
   'satin',
   'sofa',
   'talcum',
   'tariff',
   'magazine',
   'cover'
];

const hangman = new HangmanGame(vocab);
