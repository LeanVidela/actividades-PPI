// script.js

document.addEventListener('DOMContentLoaded', (event) => {
      const holes = document.querySelectorAll('.hole');
      const scoreBoard = document.querySelector('#score');
      const rabbits = document.querySelectorAll('.rabbit');
      const questionElement = document.querySelector('#question');
      let lastHole;
      let timeUp = false;
      let score = 0;

      const questions = [
            {
                  question: "¿Cuál es la capital de Francia?",
                  correctAnswer: "París"
            },
            {
                  question: "¿Cuál es la capital de España?",
                  correctAnswer: "Madrid"
            },
            {
                  question: "¿Cuál es la capital de Alemania?",
                  correctAnswer: "Berlín"
            }
      ];

      let currentQuestion = 0;

      function randomHole(holes) {
            const idx = Math.floor(Math.random() * holes.length);
            const hole = holes[idx];
            if (hole === lastHole) {
                  return randomHole(holes);
            }
            lastHole = hole;
            return hole;
      }

      function peep() {
            const hole = randomHole(holes);
            const rabbit = hole.querySelector('.rabbit');
            rabbit.classList.add('up');
            setTimeout(() => {
                  rabbit.classList.remove('up');
                  if (!timeUp) peep();
            }, 2000); // Conejo permanece visible por 2 segundos, esta representado en milisegundos
      }

      function startGame() {
            scoreBoard.textContent = 0;
            timeUp = false;
            score = 0;
            currentQuestion = 0;
            setQuestion();
            peep();
            setTimeout(() => timeUp = true, 200000); // tiempo para que finalice el juego
      }

      function setQuestion() {
            if (currentQuestion < questions.length) {
                  questionElement.textContent = questions[currentQuestion].question;
            } else {
                  alert("¡Juego terminado! Tu puntuación final es: " + score);
                  timeUp = true;
            }
      }

      function bonk(e) {
            if (!e.isTrusted) return; // Para evitar cheats
            const selectedAnswer = this.getAttribute('data-answer');
            if (selectedAnswer === questions[currentQuestion].correctAnswer) {
                  score++;
                  scoreBoard.textContent = score;
                  currentQuestion++;
                  setQuestion();
            }
            this.classList.remove('up');
      }

      rabbits.forEach(rabbit => rabbit.addEventListener('click', bonk));

      // Iniciar el juego al cargar
      startGame();
});