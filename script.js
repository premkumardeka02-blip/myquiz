 const quizData = {
    general: [
        {
            question: "Pink city of India?",
            answers: ["Mumbai", "Jaipur", "Chennai", "Raipur"],
            correct: 1
        },
        {
            question: "Largest planet?",
            answers: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: 2
        },
        
        {
            question: "Who is known as the missile man of India?",
            answers: ["Rohit Sharma", "A.P.J. Abdul Kalam", "Ripon Sir", "Modi"],
            correct: 1
        },
        
        {
            question: "Who is known as the Iron Man of India?",
            answers: ["Arybhatta", "Elon Mask", "Dr. B.R. Ambedkar", "Sardar Vallabhbhai Patel"],
            correct: 3
        }
    ],

    tech: [
        {
            question: "Which language runs in browser?",
            answers: ["C", "Java", "Python", "JavaScript"],
            correct: 3
        },
        {
            question: "What does HTML stand for?",
            answers: [
                "Hyper Trainer Marking Language",
                "Hyper Text Markup Language",
                "Hyper Text Marketing Language",
                "None"
            ],
            correct: 1
        },
        {
            question: "Which is the mother of all programming Language?",
            answers: ["C", "Java", "Python", "JavaScript"],
            correct: 1
        },
         {
            question: "which is the easiest?",
            answers: ["C", "Java", "Python", "JavaScript"],
            correct: 2
        },
        
    ],

    math: [
        {
            question: "What is 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "What is 10 × 5?",
            answers: ["50", "40", "60", "55"],
            correct: 0
        },
        {
            question: "What is 10 × 8?",
            answers: ["50", "80", "60", "55"],
            correct: 1
        },
        {
            question: "What is 1 × 5?",
            answers: ["5", "40", "60", "55"],
            correct: 0
        }
    ]
};
let questions = [];
let username = "";
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
console.log("JS Loaded");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");

function startQuiz() {
    const nameInput = document.getElementById("username").value;
    const selectedCategory = document.getElementById("category").value;

    console.log("Name:", nameInput);
    console.log("Category:", selectedCategory);

    if (nameInput.trim() === "") {
        alert("Please enter your name!");
        return;
    }

    if (selectedCategory === "") {
        alert("Please select a category!");
        return;
    }

    if (!quizData[selectedCategory]) {
        alert("Invalid category selected!");
        return;
    }

    username = nameInput;
    questions = [...quizData[selectedCategory]];

    // shuffle questions
    questions.sort(() => Math.random() - 0.5);

    document.getElementById("start-screen").style.display = "none";
    document.querySelector(".quiz-container").classList.remove("hidden");

    loadQuestion();
}
function startTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timerEl.innerText = "Time: " + timeLeft + "s";

    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = "Time: " + timeLeft + "s";

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    startTimer();

    const q = questions[currentQuestion];
    questionEl.innerText = q.question;
    answersEl.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.innerText = answer;

        btn.onclick = () => selectAnswer(btn, index);

        answersEl.appendChild(btn);
    });
}

function selectAnswer(button, index) {
    clearInterval(timer);

    const correctIndex = questions[currentQuestion].correct;
    const buttons = answersEl.children;

    for (let i = 0; i < buttons.length; i++) {
        if (i === correctIndex) {
            buttons[i].classList.add("correct");
        } else {
            buttons[i].classList.add("wrong");
        }
        buttons[i].disabled = true;
    }

    if (index === correctIndex) {
        score++;
    }
}

nextBtn.onclick = () => {
    nextQuestion();
};

function nextQuestion() {
    const container = document.querySelector(".quiz-container");
    container.style.opacity = "0";

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
        container.style.opacity = "1";
    }, 300);
}

function showResult() {
    clearInterval(timer);

    document.querySelector(".quiz-container").classList.add("hidden");
    resultBox.classList.remove("hidden");

    scoreEl.innerText = score + "/" + questions.length;

    // Save score
    leaderboard.push({ name: username, score: score });

    // Sort leaderboard
    leaderboard.sort((a, b) => b.score - a.score);

    // Keep top 5 only
    leaderboard = leaderboard.slice(0, 5);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    showLeaderboard();
}
function showLeaderboard() {
    const list = document.getElementById("leaderboard-list");
    const board = document.getElementById("leaderboard");

    list.innerHTML = "";

    leaderboard.forEach((player, index) => {
        const li = document.createElement("li");
        li.innerText = `${index + 1}. ${player.name} - ${player.score}`;
        list.appendChild(li);
    });

    board.classList.remove("hidden");
}
function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    resultBox.classList.add("hidden");
    document.getElementById("leaderboard").classList.add("hidden");

    // Show start screen again
    document.getElementById("start-screen").style.display = "block";

    // Hide quiz
    document.querySelector(".quiz-container").classList.add("hidden");
}    

const canvas = document.getElementById("bg-canvas");

if (!canvas) {
    console.error("Canvas not found!");
} else {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    const numParticles = 170;

    let mouse = { x: null, y: null };
window.addEventListener("mousemove", (e) =>
{ mouse.x = e.clientX; mouse.y = e.clientY; });
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
        }

        move() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#38bdf8";
            ctx.fill();
        }
    }

    // create particles
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }

    function connect() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = "rgba(56,189,248,0.2)";
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // mouse connection
            if (mouse.x !== null && mouse.y !== null) {
                let dx = particles[i].x - mouse.x;
                let dy = particles[i].y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = "rgba(255,255,255,0.4)";
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let p of particles) {
            p.move();
            p.draw();
        }

        connect();

        requestAnimationFrame(animate);
    }

    animate();
}

const quizBox = document.querySelector(".quiz-container");

document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;

    quizBox.style.transform = `translate(${x}px, ${y}px)`;
});