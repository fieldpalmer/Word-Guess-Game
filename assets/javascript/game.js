function game () {
    
}

var vocab = ["alchemy","chemistry","alcohol","algebra","algorithm","alkaline","almanac","average","azimuth","cipher","nadir","soda","zenith","admiral","adobe","alcove","amber","arsenal","assassin","mafia","caliber","candy","check","cork","coffee","cotton","gauze","guitar","hazard","lazuli","mascara","mattress","monsoon","racquet","ream","safari","sash","satin","sofa","talcum","tariff","magazine","cover",];
var answer = vocab[Math.floor(Math.random() * vocab.length)];
var wordsPlayed = [];
var wordsPlayedBox = document.getElementById("words-played");

var answerBlanks = [];
for ( var i = 0 ; i < answer.length ; i++) {
    answerBlanks.push("_");
}

var answerBlanksText = document.getElementById("letters-box");
answerBlanksText.innerHTML =  "Mystery Word: " + answerBlanks.join(" ");

var answerLetters = answer.split("");
var wrongLetters = [] ;
var wrongLettersText = document.getElementById("key-input");
var guessesLeft = 10;
var guessesLeftText = document.getElementById("guesses-left");
var rightGuessCount = 0;
var winCount = 0;
var winCountText = document.getElementById("win-count");
var lossCount = 0;
var lossCountText = document.getElementById("loss-count");

function reset() {

    userLetter = 0 ;
    rightGuessCount = 0;
    guessesLeft = 10;
    guessesLeftText.innerHTML = guessesLeft;
    wrongLetters = [];
    answerBlanks = [];
    answer = vocab[Math.floor(Math.random() * vocab.length)];
    answerLetters = answer.split("");
    
    answerBlanks = [];
    for (var i = 0 ; i < answer.length ; i++) {
        answerBlanks.push("_")
    }

    answerBlanksText.innerHTML = "Mystery Word: " + answerBlanks.join(" ");
    wrongLettersText.innerHTML = wrongLetters;

}

document.onkeyup = function(event) {

    answerBlanksText.innerHTML =  "Mystery Word: " + answerBlanks.join(" ");

    var userLetter = event.key;

    if (answer.indexOf(userLetter) > -1) {
        for ( var j = 0 ; j < answer.length ; j++ ) {
            if (answerLetters[j] === userLetter) {
                answerBlanks[j] = userLetter;
                rightGuessCount++;
                answerBlanksText.innerHTML = "Mystery Word: " + answerBlanks.join(" ");
            }
        }
    } else {
        wrongLetters.push(userLetter);
        guessesLeft--;
        wrongLettersText.innerHTML = wrongLetters.join(" ");
        guessesLeftText.innerHTML = guessesLeft;
    } 
    
    function winLose () {
        if (rightGuessCount === answer.length) {
            winCount++;
            winCountText.innerHTML = winCount;  
            wordsPlayed.push(answer);
            alert("You won!");
            wordsPlayedBox.innerHTML = wordsPlayed.join(" ");
            reset(); 
        } 
        if (guessesLeft === 0) {
            lossCount++;
            lossCountText.innerHTML = lossCount;
            wordsPlayed.push(answer);
            alert("You lose!");
            wordsPlayedBox.innerHTML = wordsPlayed.join(" ");
            reset();
        }
    }

    winLose();
};
