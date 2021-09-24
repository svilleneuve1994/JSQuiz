let startBtn = document.getElementById("start-btn");
let restartBtn = document.getElementById("restart-btn");
let submitBtn = document.getElementById("submit-btn");
let quizbox = document.querySelector("#quizbox");
let qbox = document.querySelector("#questionbox");
let option = document.querySelectorAll(".option");
let feedback = document.querySelector("#feedback");
let splat = document.querySelector("#splat");
let footer = document.querySelector("#crowd-footer");
let scorecard = document.querySelector("#scorecard");
let scoretext = document.querySelector("#scoretext");
let highscores = document.querySelector("#highscores");
let playerInitials = document.querySelector("#player-initials");
let playerScore = document.querySelector("#player-score");
let timecontainer = document.querySelector(".timer");
let secondsLeft = 60;

let questions = [
	{
		question: "Inside which HTML element do we put the JavaScript?",
		answer: "script",
		options: ["scripting", "javascript", "script", "js",],
	},
	{
		question: "How do you create a function in JavaScript?",
		answer: "function myFunction()",
		options: ["function:myFunction()", "function myFunction()", "function = myFunction", "(function)",],
	},
	{
		question: "How do you call a function named 'myFunction'?",
		answer: "myFunction()",
		options: ["myFunction()", "call myFunction()", "run myFunction()", "1-800-MYFUNCTION",],
	},
	{
		question: "How can you add a comment in a JavaScript?",
		answer: "//comment",
		options: ["'comment'", "??comment", "||comment", "//comment",],
	},
	{
		question: "What is the correct way to write a JavaScript array?",
		answer: "var colors = ['red', 'blue', 'green']",
		options: ["var colors=1:red, 2:blue, 3:green", "var colors(red, blue, green)", "var colors = ['red', 'blue', 'green']", "var colors = //red //blue //green",],
	},
	{
		question: "Which event occurs when the user clicks on an HTML element?",
		answer: "onclick",
		options: ["onmouse", "onclick", "onchange", "onblink",],
	},
];

let ql = questions.length;
let qindex = 0;

let currentQ;
let currentA;
let currentO;

startBtn.hidden = false;
restartBtn.hidden = true;
quizbox.hidden = true;
scorecard.hidden = true;
highscores.hidden = true;
splat.hidden = true;
timecontainer.textContent = "Time: " + 60;

let startQuiz = function() {
	startTimer();
	showQuizbox();
	populateQ();
	crowdIdle();
}

function startTimer() {
	let timer = setInterval(function() {
		secondsLeft--;
		timecontainer.textContent = "Time: " + secondsLeft;
	
		if(secondsLeft <= 0 || qindex == ql - 1) {
			clearInterval(timer);
			gameOver();
		}
	}, 1000);
}

function showQuizbox() {
	startBtn.hidden = true;
	scorecard.hidden = true;
	highscores.hidden = true;
	quizbox.hidden = false;
}

function showScorecard() {
	startBtn.hidden = true;
	quizbox.hidden = true;
	highscores.hidden = true;
	scorecard.hidden = false;
}

function showHighscores() {
	startBtn.hidden = true;
	quizbox.hidden = true;
	scorecard.hidden = true;
	highscores.hidden = false;
}

function populateQ() {
		currentQ = questions[qindex].question;
		currentO = questions[qindex].options;
		qbox.innerText = currentQ;
		for(let i = 0; i < option.length; i++) {
			option[i].innerText = currentO[i];
		};
	makeAnswersClickable();
}

function makeAnswersClickable(){
	for (var i = 0 ; i < option.length; i++) {
		option[i].addEventListener("click", checkAnswer); 
	};
}

function checkAnswer(e) {
	var target = e.target;
			text = target.textContent || target.innerText;   
			currentQ = questions[qindex].question;
			currentA = questions[qindex].answer;
			if (text === currentA) {
				crowdCheer();
				setTimeout(crowdIdle, 750);
			} else {
				secondsLeft = secondsLeft - 10;
				splat.hidden = false;
				setTimeout(hide, 500);
				crowdIdle();
			};
	checkIndex();
}

function hide() {
	splat.hidden = true;
}

function checkIndex() {
	if (qindex == ql - 1) {
		gameOver();
	} else {
		qindex++;
	};
	populateQ();
}

function crowdCheer() {
	footer.style.backgroundImage = "url('crowd-cheer.png')";
	footer.style.height = "513px";
}

function crowdIdle() {
	footer.style.backgroundImage = "url('crowd-idle.png')";
	footer.style.height = "213px";
}

function gameOver() {
	restartBtn.hidden = false;
	showScorecard();
	showScore();
}

function showScore() {
	scoretext.textContent = "Time's up! Your score: " + secondsLeft;
	if (secondsLeft <= 0) {
		crowdIdle();
	} else {
		crowdCheer();
	}
}

function playAgain() {
	secondsLeft = 60;
	ql = questions.length;
	qindex = 0;
	restartBtn.hidden = true;
	startQuiz();
}

function renderScore() {
  let initials = localStorage.getItem("initials");
  let score = localStorage.getItem("score");

  if (!initials || !score) {
    return;
  }

  playerInitials.textContent = initials;
  playerScore.textContent = score;
}

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  let initials = document.querySelector("#initials").value;
  let score = secondsLeft;

    localStorage.setItem("initials", initials);
    localStorage.setItem("score", score);
		showHighscores();
    renderScore();
});