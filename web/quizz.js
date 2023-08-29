const quizContainer = document.getElementById("quizContainer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const choicesElement = document.getElementById("choices")
const submitBtn = document.getElementById("submitBtn");
const resultElement = document.getElementById("result");

let score = 0;
let quizzes = [];
let currentQuizIndex = -1;
let currentQuestionIndex = 0;

init();
async function init() {
  try {
    const response = await fetch("http://localhost:3000/api/QuizzAnime");
    const data = await response.json();
    console.log(data)
    quizzes = data.data;
    startQuizMenu();
  } catch (error) {
    console.log("Error:", error);
  }
}

function startQuiz(quizIndex) {
  currentQuizIndex = quizIndex;
  currentQuestionIndex = 0;
  askQuestion();
}

function startQuizMenu() {
  console.log("Selamat datang di quiz animek!");
  showQuizMenu();
  const buttons = Array.from(optionsElement.children)
  buttons.forEach((btn,i)=>{
    btn.addEventListener("click", () => {
      startQuiz(i)
      optionsElement.innerHTML = "";
    })
});
}


function showQuizMenu() {
  let optionsHTML = "";
  quizzes.forEach((quiz, index) => {
    optionsHTML += `<button id="button-quiz-${index}">${index + 1}. ${quiz.name}</button>`;
  });

  console.log(optionsHTML);
  submitBtn.style.display = "none";
  optionsElement.innerHTML = optionsHTML;
  resultElement.textContent = "";
  questionElement.textContent = "";
}

function askQuestion() {
  if (
    currentQuestionIndex >= quizzes[currentQuizIndex].questions.length
  ) {
    showResult(quizzes[currentQuizIndex].name);
    return;
  }

  const question =
    quizzes[currentQuizIndex].questions[currentQuestionIndex].question;
  const options =
    quizzes[currentQuizIndex].questions[currentQuestionIndex].options;

  questionElement.textContent = question;

  options.forEach((option, index) => {
    const button = document.createElement('button');

    button.textContent = option;
    button.className = options[0].replace(' ', '-'); 

    choicesElement.appendChild(button)

    button.addEventListener('click', () => {
      checkAnswer(index)
      const btns = document.querySelectorAll(`.${options[0].replace(' ', '-')}`);

      btns.forEach((btn) => {
        btn.style.display = 'none'
      })
    });
  });
  submitBtn.style.display = "none";
  resultElement.textContent = "";
}

function checkAnswer(selectedOptionIndex) {
  const correctAnswerLetter = quizzes[currentQuizIndex].questions[currentQuestionIndex].answer.toLowerCase();
  const userSelectedLetter = ['a', 'b', 'c'][selectedOptionIndex];

  if (userSelectedLetter === correctAnswerLetter) {
    alert("Jawaban Benar!");
    score += 10;
  } else {
    alert("Jawaban Salah!");
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizzes[currentQuizIndex].questions.length) {
    console.log(userSelectedLetter); 
    askQuestion();
  } else {
    showResult(quizzes[currentQuizIndex].name);
  }
}


function showResult(quizName) { 
  questionElement.textContent = "";
  optionsElement.innerHTML = "";
  submitBtn.style.display = "lanjut";
  submitBtn.style.display = "block";
  resultElement.textContent = `Quiz ${quizName} selesai! \nTingkat Wibumu: ${score}`;
  submitBtn.onclick = exitApp;

}

function exitApp() {
  alert("Terima kasih telah mencoba!");
  currentQuizIndex = -1;
  currentQuestionIndex = 0;
  score = 0;
  startQuizMenu();
}
