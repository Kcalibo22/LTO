const questions = [
    {
        question: "Who is the most handsome student in BSCpE 2B ?",
        answers: [
            { text: "Francis Nino Pacaldo", correct: true},
            { text: "Angelito Valderama", correct: false},
            { text: "Jude Vincent Lutao", correct: false},
            { text: "Judito Pepito", correct: false},
        ]
    },
    {
        question: "What is the smallest particle of an element?",
        answers: [
            { text: "Mota", correct: false},
            { text: "Atom", correct: true},
            { text: "Gas", correct: false},
            { text: "Molecule", correct: false},
        ]
    },
    {
        question: "Who created modern periodic table?",
        answers: [
            { text: "Charles Zoilo Yana", correct: false},
            { text: "Francis Nino Pacaldo", correct: false},
            { text: "Jude Vincent Lutao", correct: false},
            { text: "Dmitri Mendeleev", correct: true},
        ]
    },
    {
        question: "Who is most handsome student in BSCpE?",
        answers: [
            { text: "Francis Nino Pacaldo", correct: false},
            { text: "Christiam Neil Hermosilla", correct: false},
            { text: "Angelito Valderama", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "Do you love me?",
        answers: [
            { text: "Yes", correct: false},
            { text: "Yes", correct: false},
            { text: "Yes", correct: false},
            { text: "Yes", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const passingScore = Math.ceil(questions.length * 0.6);
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    const passingScore = Math.ceil(questions.length * 0.6);
    const resultMessage = score >= passingScore ? 
        `Congratulations, you passed! You scored ${score} out of ${questions.length}!` : 
        `Sorry, you failed. You scored ${score} out of ${questions.length}.`;
    questionElement.innerHTML = resultMessage;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
