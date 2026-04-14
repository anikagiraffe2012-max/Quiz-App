const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Text Marking Language", "Hello Tabitha Makeup Lol"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property changes the text color?",
        options: ["text-color", "color", "font-color", "text_color"],
        answer: "color"
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colin Saved Susie"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which Javascript keyword declares a variable?",
        options: ["var", "let", "const", "All of the above"],
        answer: "All of the above"
    }
]

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(option, button));
        optionsContainer.appendChild(button);
    });

    selectedOption = null;
}

function selectOption(choice, button) {
    if (selectedOption !== null) return;

    selectedOption = choice;
    const currentQuestion = questions[currentQuestionIndex];

    if (choice === currentQuestion.answer) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');

        const allButtons = document.querySelectorAll('.option-btn');
        allButtons.forEach(btn => {
            if (btn.textContent === currentQuestion.answer) {
                btn.classList.add('correct');
            }
        });
    }

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
    });
}

function nextQuestion() {
    if (selectedOption === null) return;
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionElement.textContent = "Quiz Completed!";
        optionsContainer.innerHTML = '';
        nextBtn.disabled = true;
        scoreElement.textContent = `Your score: ${score} out of ${questions.length}`;
    }
}

nextBtn.addEventListener('click', nextQuestion);

loadQuestion();
