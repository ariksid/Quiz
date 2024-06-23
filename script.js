const questions = [
    // Summertime Rendering
    { question: "Who is the protagonist of Summertime Rendering?", choices: ["A) Shinpei Ajiro", "B) Ushio Kofune", "C) Mio Kofune"], correct: "A" },
    { question: "What is the main theme of Summertime Rendering?", choices: ["A) Time Travel", "B) Space Exploration", "C) Martial Arts"], correct: "A" },
    { question: "Which island is the setting for Summertime Rendering?", choices: ["A) Shikoku", "B) Hitogashima", "C) Okinawa"], correct: "B" },

    // Berserk
    { question: "Who wields the Dragon Slayer sword in Berserk?", choices: ["A) Guts", "B) Griffith", "C) Casca"], correct: "A" },
    { question: "What is the name of the group led by Griffith in Berserk?", choices: ["A) Band of the Hawk", "B) Band of the Wolf", "C) Band of the Lion"], correct: "A" },
    { question: "Which demonic artifact brands Guts in Berserk?", choices: ["A) Behelit", "B) Berserker Armor", "C) Brand of Sacrifice"], correct: "C" },

    // Jujutsu Kaisen
    { question: "Who is the main protagonist of Jujutsu Kaisen?", choices: ["A) Satoru Gojo", "B) Megumi Fushiguro", "C) Yuji Itadori"], correct: "C" },
    { question: "What is Satoru Gojo known for in Jujutsu Kaisen?", choices: ["A) His immense speed", "B) His cursed energy manipulation", "C) His strength"], correct: "B" },
    { question: "What is the goal of Sukuna in Jujutsu Kaisen?", choices: ["A) To rule the world", "B) To collect all his fingers", "C) To defeat Gojo"], correct: "B" },

    // Initial D
    { question: "Who is the protagonist of Initial D?", choices: ["A) Takumi Fujiwara", "B) Ryosuke Takahashi", "C) Keisuke Takahashi"], correct: "A" },
    { question: "What car does Takumi Fujiwara drive in Initial D?", choices: ["A) Nissan Skyline", "B) Mazda RX-7", "C) Toyota AE86"], correct: "C" },
    { question: "What is the primary setting for the races in Initial D?", choices: ["A) Highways", "B) Mountain passes", "C) City streets"], correct: "B" }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let totalQuestions = 5;
let selectedQuestions = [];

function startQuiz() {
    const numberOfQuestions = prompt("Enter the number of questions you want in the quiz (default is 5):", 5);
    totalQuestions = parseInt(numberOfQuestions) || 5;
    selectedQuestions = [];

    while (selectedQuestions.length < totalQuestions && selectedQuestions.length < questions.length) {
        const index = Math.floor(Math.random() * questions.length);
        if (!selectedQuestions.includes(index)) {
            selectedQuestions.push(index);
        }
    }

    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('results').innerHTML = '';
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex < selectedQuestions.length) {
        const questionIndex = selectedQuestions[currentQuestionIndex];
        const question = questions[questionIndex];

        document.getElementById('quiz-container').innerHTML = `
            <div class="question">${question.question}</div>
            <div class="choices">
                ${question.choices.map((choice, i) => `
                    <label>
                        <input type="radio" name="choice" value="${['A', 'B', 'C'][i]}">
                        ${choice}
                    </label>
                `).join('')}
            </div>
            <button onclick="submitAnswer()">Submit Answer</button>
        `;
    } else {
        displayResult();
    }
}

function submitAnswer() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (!selectedChoice) {
        alert("Please select an answer.");
        return;
    }

    const answer = selectedChoice.value;
    const questionIndex = selectedQuestions[currentQuestionIndex];
    const question = questions[questionIndex];

    let resultText = `<div class="result">Question: ${question.question}<br>`;
    resultText += `You guessed ${answer}) ${question.choices[['A', 'B', 'C'].indexOf(answer)]}<br>`;

    if (answer === question.correct) {
        resultText += "<span class='correct'>CORRECT</span></div>";
        correctAnswers++;
    } else {
        resultText += `<span class='incorrect'>INCORRECT</span>: the correct answer is ${question.correct}) ${question.choices[['A', 'B', 'C'].indexOf(question.correct)]}</div>`;
    }

    document.getElementById('results').innerHTML = resultText;
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
    document.getElementById('quiz-container').innerHTML = `
        <div class="final-result">You answered ${correctAnswers} out of ${totalQuestions} questions correctly (${percentage}%).</div>
        <button onclick="startQuiz()">Restart Quiz</button>
    `;
}

window.onload = startQuiz;