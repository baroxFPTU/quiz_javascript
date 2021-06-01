const start = document.querySelector('#start');
const quiz = document.querySelector('#quiz');
const question = document.querySelector('#question');
const questionImg = document.querySelector('#qImg');
const choiceA = document.querySelector('#A');
const choiceB = document.querySelector('#B');
const choiceC = document.querySelector('#C');
const counter= document.querySelector('#counter');
const timeGauge = document.querySelector('#timeGauge');
const bTimeGauge = document.querySelector('#btimeGauge');
const scoreDiv = document.querySelector('#scoreContainer');
const progress = document.querySelector('#progress');

let count = 0;
let questionTime = 10;
let gaugeWidth = 150;
let gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score;
// Create question
let questions = [
    {
        question: "What is my name?",
        image: "./img/html.png",
        A: "Bao",
        B: "Barox",
        C: "Nguyen",
        correct: "A"
    },
    {
        question: "What is my nickname?",
        image: "./img/html.png",
        A: "Bao",
        B: "Barox",
        C: "Nguyen",
        correct: "B"
    },
    {
        question: "What is my girlfriend?",
        image: "./img/html.png",
        A: "Bao",
        B: "Barox",
        C: "Nguyen",
        correct: "C"
    }
];

// Variables
const lastQuestion = questions.length - 1;
let currentQuestion = 0;

start.addEventListener('click', startQuiz)

function startQuiz() {
    start.style.opacity = 0;
    setTimeout(() => start.style.display = 'none', 200);
    score = 0;
    renderQuestion();
    quiz.style.display = 'block';
    setTimeout(() => quiz.style.opacity = 1, 200);

    renderProgress();
}
function renderQuestion() {
    clearInterval(TIMER);

    let q = questions[currentQuestion];
    
    question.innerHTML = q.question;
    questionImg.innerHTML = `<img src="${q.image}">`;

    choiceA.innerHTML = q.A;
    choiceB.innerHTML = q.B;
    choiceC.innerHTML = q.C;
    counter.innerHTML = count++;
    TIMER = setInterval(renderCounter, 1000);
}



function renderProgress() {
    questions.forEach((question, index) => {
        progress.insertAdjacentHTML(
            'beforeend',
            `<div class="prog" id="${index}"></div>`
        )
    })
}

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = gaugeUnit * count + "px";
        count++;
    } else {
        count = 0;

        isWrong();
        if (currentQuestion < lastQuestion) {
            currentQuestion++;
            renderQuestion();
        } else {
            clearInterval(TIMER);
            showScore();
        }
    }
}

function checkAnswer(answer) {
    if (answer == questions[currentQuestion].correct) {
        score++;
        isCorrect();
    } else {
        isWrong();
    }
    count = 0;
    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        renderQuestion();
    } else {
        clearInterval(TIMER)
        renderScore();
    }
 
}

function isCorrect() {
    document.getElementById(currentQuestion).style.backgroundColor = 'green';
}

function isWrong() {
    document.getElementById(currentQuestion).style.backgroundColor = 'red';
}

function renderScore() {
    scoreDiv.style.display = "block";

    const scorePercent = Math.round(100*score/questions.length);
    scoreDiv.innerHTML = scorePercent;
}