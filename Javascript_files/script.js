/*---------------------------------------------------------------  */
/*/ part 1 - Handle Enter Key Submission
/*---------------------------------------------------------------  */

var submitClicked = false;
var input = document.getElementById("answer-input");
var submitButton = document.getElementById("submit-button");
var nextButton = document.getElementById("next-button");
var feedback = document.getElementById("feedback");

// Allow Enter key to submit answers
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) { // 13 = Enter key
        if (!submitClicked) {
            submitButton.click();
        } else {
            nextButton.click();
        }
    }
});

submitButton.addEventListener("click", function() {
    submitClicked = true;
    feedback.innerHTML = ""; // Clear feedback
});

nextButton.addEventListener("click", function() {
    submitClicked = false;
    feedback.innerHTML = "";
    clearCanvas(); // Clear canvas on next letter
});

/*---------------------------------------------------------------  */
/*/ part 2 - Greek Alphabet Quiz System
/*---------------------------------------------------------------  */

fetch("/../Data_sourcing_files/greek_letters.txt")
  .then(response => response.text())
  .then(data => {
    const greekLetters = data.split('\n').map(line => {
      const [index, letter, name, example1, example2] = line.split(',');
      return { index: parseInt(index), letter, name, example1, example2 };
    });

    // Shuffle letters using Fisher-Yates algorithm
    for (let i = greekLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [greekLetters[i], greekLetters[j]] = [greekLetters[j], greekLetters[i]];
    }

    // Get references to HTML elements
    const tipsElement = document.getElementById("tips");
    const instruction = document.getElementById("instruction");
    const letterContainer = document.getElementById('letter-container');
    const answerInput = document.getElementById('answer-input');
    const audioButton = document.getElementById('audio-button');
    const progress = document.getElementById('progress');

    tipsElement.innerHTML = "<br> Requirement: <br> - Greek language pack required (Press 'Win+Space' to switch).<br><br>";
    instruction.innerHTML = "Enter the name of the Greek letter shown below (Press ENTER to submit)";

    let currentIndex = 0;
    let currentLetter = greekLetters[currentIndex];
    let completedCount = 0;

    function displayNextLetter() {
      currentLetter = greekLetters[currentIndex];
      letterContainer.innerHTML = currentLetter.letter;
      answerInput.value = '';
      feedback.innerHTML = '';
      completedCount++;
      progress.innerHTML = `Progress: ${completedCount}/${greekLetters.length}`;
    }

    submitButton.addEventListener('click', function() {
      const userInput = answerInput.value.trim().toLowerCase();
      const correctAnswer = currentLetter.name.trim().toLowerCase();

      if (userInput === '') {
        feedback.style.color = "red";
        feedback.innerHTML = `INCORRECT! The correct answer is ${currentLetter.name}`;
      } else if (userInput === correctAnswer) {
        feedback.style.color = "green";
        feedback.innerHTML = `CORRECT!`;

        // Play Alphabet Letter Audio
        playAudio("Alphabet", currentLetter.index);
      } else if (removeAccents(userInput) === removeAccents(correctAnswer)) {
        feedback.style.color = "orange";
        feedback.innerHTML = `CLOSE! Correct answer: ${currentLetter.name}`;
        playAudio("Alphabet", currentLetter.index);
      } else {
        feedback.style.color = "red";
        feedback.innerHTML = `INCORRECT! The correct answer is ${currentLetter.name}`;
      }
    });

    // Play letter audio on button click
    audioButton.addEventListener('click', function() {
        playAudio("Alphabet", currentLetter.index);
    });

    nextButton.addEventListener('click', function() {
        currentIndex++;
        if (currentIndex < greekLetters.length) {
            displayNextLetter();
            clearCanvas();
        } else {
            feedback.innerHTML = 'You have completed the set!';
        }
    });

    function removeAccents(str) {
        const accents = [
            ['Ά', 'Α'], ['Έ', 'Ε'], ['Ή', 'Η'], ['Ί', 'Ι'], ['Ό', 'Ο'], ['Ύ', 'Υ'], ['Ώ', 'Ω'],
            ['ά', 'α'], ['έ', 'ε'], ['ή', 'η'], ['ί', 'ι'], ['ό', 'ο'], ['ύ', 'υ'], ['ώ', 'ω']
        ];
        for (let i = 0; i < accents.length; i++) {
            str = str.replace(accents[i][0], accents[i][1]);
        }
        return str;
    }
});

/*---------------------------------------------------------------  */
/*/ part 3 - Greek Diphthongs Audio System
/*---------------------------------------------------------------  */

// Universal audio function for Alphabet & Diphthongs
function playAudio(type, identifier) {
    let folder = type === "Alphabet" ? "Alphabet" : "Double_letters";
    let audioPath = `/../Data_sourcing_files/Sounds/${folder}/${identifier}.mp3`;
    let audio = new Audio(audioPath);
    audio.play().catch(error => console.error("Error playing audio:", error));
}

// Add click listeners for diphthongs
function addDiphthongListeners() {
    const diphthongs = document.querySelectorAll(".greek-diphthong");
    diphthongs.forEach((cell) => {
        cell.addEventListener("click", () => {
            const diphthongText = cell.textContent.trim();
            console.log(`Clicked diphthong: ${diphthongText}`);
            playAudio("Double_letters", diphthongText);
        });
    });
}

document.addEventListener("DOMContentLoaded", addDiphthongListeners);

/*---------------------------------------------------------------  */
/*/ part 4 - Drawing Canvas for Practice
/*---------------------------------------------------------------  */

var canvas = document.getElementById('draw-area');
var ctx = canvas.getContext('2d');

var painting = false;

function startDraw(e) {
    painting = true;
    draw(e);
}

function endDraw() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mousemove', draw);
