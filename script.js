let score = 0;
let currentQuestion = 1;
const totalQuestions = 16; // Adjust based on the total number of questions
let timer;
let countdown;

const questionPoints = {
    q1: 10,
    q2: 10,
    q3: 10,
    q4: 10,
    q5: 15,
    q6: 20,
    q7: 1,
    q8: 10,
    q9: 15,
    q10: 15,
    q11: 2,
    q12: 10,
    q13: 5,
    q14: 20,
    q15: 5,
    q16: 5
};

function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('status').style.display = 'block';
    document.getElementById('q1').style.display = 'block';
    startTimer(5 * 60); // 5 minutes timer
    updatePointsDisplay();
}

function nextQuestion(questionId, correctAnswer, points) {
    const selectedOptions = document.querySelectorAll(`input[name="${questionId}"]:checked`);
    if (selectedOptions.length > 0) {
        const selectedValues = Array.from(selectedOptions).map(input => input.value);
        let isCorrect = false;
        if (Array.isArray(correctAnswer)) {
            const correctSet = new Set(correctAnswer);
            const selectedSet = new Set(selectedValues);
            const intersection = new Set([...correctSet].filter(x => selectedSet.has(x)));
            const partialScore = (intersection.size / correctSet.size) * points;
            score += partialScore;
            isCorrect = intersection.size === correctSet.size;
        } else {
            isCorrect = selectedValues[0] === correctAnswer;
            if (isCorrect) {
                score += points;
            } else {
                score -= points;
            }
        }

        if (isCorrect) {
            document.getElementById('feedback').innerText = 'Good job mate!';
        } else {
            if (questionId !== 'q16') {
                document.getElementById('feedback').innerText = 'Shame on you!';
            }
        }
        document.getElementById(questionId).style.display = 'none';
        currentQuestion++;
        if (currentQuestion <= totalQuestions) {
            document.getElementById(`q${currentQuestion}`).style.display = 'block';
            updatePointsDisplay();
        } else {
            showResults();
        }
        updateScore();
    } else {
        alert('Please select an option.');
    }
}

function bufferQuestion(questionId) {
    document.getElementById(questionId).style.display = 'none';
    if (questionId === 'q16') {
        alert('No, it\'s you! Hahaha.');
    }
    currentQuestion++;
    if (currentQuestion <= totalQuestions) {
        document.getElementById(`q${currentQuestion}`).style.display = 'block';
        updatePointsDisplay();
    } else {
        showResults();
    }
}

function showResults() {
    clearTimeout(timer);
    clearInterval(countdown);
    document.getElementById(`q${currentQuestion}`).style.display = 'none';
    document.getElementById('results').style.display = 'block';
    const resultMessage = score >= 100 ? `Congratulations! Your total score is: ${score}` : `You didn't get 100 points. Your total score is: ${score}`;
    document.getElementById('score').innerText = resultMessage;
}

function updateScore() {
    document.getElementById('scoreDisplay').innerText = `Current Score: ${score}`;
}

function startTimer(duration) {
    let timeRemaining = duration;
    const timerDisplay = document.getElementById('timer');
    countdown = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.innerText = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(countdown);
            showResults();
        }
    }, 1000);
}

function updatePointsDisplay() {
    document.getElementById('pointsDisplay').innerText = `This question is worth ${questionPoints[`q${currentQuestion}`]} points.`;
}

// Call updateScore initially to set the initial score display
updateScore();
