const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let score = 0;

const quizzes = [
  {
    name: 'Quiz kimetsu no yaiba',
    questions: [
      {
        question: 'Siapa adik dari tanjiro?\n a. nezuko\n b.kanae\n c. shinobu\n',
        answer: 'a'
      },
      {
        question: 'siapakah sosok pilar api?\n a.rengoku \n b.gyomei \n c. obanai\n',
        answer: 'a'
      }
    ]
  },
  {
    name: 'Quiz jujutsu kaisen',
    questions: [
      {
        question: 'Siapakah guru dari itadori?\n a.yaga masamichi \n b. todo aoi \n c.gojo satoru\n',
        answer: 'c'
      },
      {
        question: 'Siapakah yang mengendalikan geto suguru?\n a.mahito \n b.nanami \n c. kenjaku\n',
        answer: 'c'
      }
    ]
  }
];

function startQuiz() {
  console.log('Selamat datang di animek!\n');
  showQuizMenu();
}

function showQuizMenu() {
  console.log('Pilih salah satu quiz:');
  quizzes.forEach((quiz, index) => {
    console.log(`${index + 1}. ${quiz.name}`);
  });
  console.log(`${quizzes.length + 1}. Keluar\n`);

  rl.question('Pilih nomor quiz: ', (option) => {
    const selectedQuiz = parseInt(option);

    if (selectedQuiz >= 1 && selectedQuiz <= quizzes.length) {
      askQuestion(selectedQuiz - 1, 0);
    } else if (selectedQuiz === quizzes.length + 1) {
      exitApp();
    } else {
      console.log('Opsi tidak valid. Silakan pilih lagi.\n');
      showQuizMenu();
    }
  });
}

function askQuestion(quizIndex, questionIndex) {
  if (questionIndex >= quizzes[quizIndex].questions.length) {
    endQuiz(quizIndex);
    return;
  }

  const question = quizzes[quizIndex].questions[questionIndex].question;

  rl.question(question, (userAnswer) => {
    const correctAnswer = quizzes[quizIndex].questions[questionIndex].answer.toLowerCase();
    userAnswer = userAnswer.toLowerCase();

    if (userAnswer === correctAnswer) {
      console.log('Jawaban Betul Cuy!!!\n');
      score += 10;
    } else {
      console.log('Jawaban Salah!\n');
    }

    askQuestion(quizIndex, questionIndex + 1);
  });
}

function endQuiz(quizIndex) {
  console.log(`Quiz ${quizzes[quizIndex].name} selesai!\nTingkat Wibumu: ${score}\n`);
  score = 0;
  showQuizMenu();
}

function exitApp() {
  console.log('Terima kasih telah Mencoba!\n');
  rl.close();
}

rl.on('close', () => {
  process.exit(0);
});

startQuiz();



