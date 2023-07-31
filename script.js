/*---------------------------------------------------------------  */
/*/ part 1 - without this part pressing enter to submit the answer does NOT work.
/*---------------------------------------------------------------  */

var submitClicked = false;
var input = document.getElementById("answer-input");
var submitButton = document.getElementById("submit-button");
var nextButton = document.getElementById("next-button");
var feedback = document.getElementById("feedback");

// this function is called when the submit button is clicked
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) { // 13 is the enter key
    if (!submitClicked) {
      submitButton.click();
    } else {
      nextButton.click();
    }
  }
});

submitButton.addEventListener("click", function() { // when the submit button is clicked
  submitClicked = true;
  feedback.innerHTML = ""; // clear the feedback
});

nextButton.addEventListener("click", function() { // when the next button is clicked
  submitClicked = false;
  feedback.innerHTML = "";
  clearCanvas(); // Clear the canvas when moving to the next letter
});

/*---------------------------------------------------------------  */
/* part 2 - this part is the main part of the script
/*---------------------------------------------------------------  */
// outline:
// 1. fetch the data from the text file
// 2. shuffle the array of Greek letters
// 3. get references to HTML elements
// 4. display the first Greek letter in the shuffled array
// 5. compare the user's input to the correct name of the letter and provide feedback to the user
// 6. display the next Greek letter in the shuffled array when the "Next" button is clicked
// 7. function to remove accents from Greek letters

// 1. Fetch the data (asyncronously) from the text file
fetch('greek_letters.txt') // fetch is a function
  .then(response => response.text()) // .then is a method which belongs to the fetch function; response is the parameter of the function; response.text() is a method which belongs to the response object
  .then(data => { // data is the parameter of the function which is the result of the previous function
    const greekLetters = data.split('\n').map(line => {
      const [index, letter, name, example1, example2] = line.split(',');
      return { index: parseInt(index), letter, name, example1, example2 }; // the map function returns the index as a string therefore we need to convert it to an integer
    });
    // 2. shuffle the array: Fisher-Yates shuffle algorithm to shuffle the array of Greek letters
    for (let i = greekLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [greekLetters[i], greekLetters[j]] = [greekLetters[j], greekLetters[i]];
    }

    // 3. Get references to HTML elements
    const tipsElement = document.getElementById("tips"); // const is a variable that cannot be reassigned
    const instruction = document.getElementById("instruction");
    const letterContainer = document.getElementById('letter-container');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const nextButton = document.getElementById('next-button');
    const audioButton = document.getElementById('audio-button');
    const feedback = document.getElementById('feedback');
    const progress = document.getElementById('progress');

    tipsElement.innerHTML = "<br> Requirement: <br> - The Greek language pack which will allow you to type Greek letters <br><br> Handy tools to use in conjunction with this test:<br> - a desktop translator (QTranslate) with which you can select and pronounce the selected Greek letters with a shortcut key <br> - a on screen keyboard, which shows you where the greek letters are located on the keyboard";
    instruction.innerHTML = "Enter the name of the Greek letter shown below <br> (you can press ENTER to submit)";

    let currentIndex = 0; // let is a variable that can be reassigned   // var is a variable that can be reassigned
    let currentLetter = greekLetters[currentIndex];
    let completedCount = 0;

    // 4. Display the first Greek letter in the shuffled array
    function displayNextLetter() {
      currentLetter = greekLetters[currentIndex];
      letterContainer.innerHTML = currentLetter.letter;
      answerInput.value = ''; // clear the input field
      feedback.innerHTML = '';
      completedCount++;
      progress.innerHTML = `Progress: ${completedCount}/${greekLetters.length}`;
    }

    // 5. Compare the user's input to the correct name of the letter and provide feedback to the user
    feedback.style.fontSize = "30px";

    submitButton.addEventListener('click', function() {
      const userInput = answerInput.value.trim().toLowerCase();
      const correctAnswer = currentLetter.name.trim().toLowerCase();
      console.log(userInput, correctAnswer);
      if (userInput === '') {  // If the user does not enter an answer, display a message
        feedback.style.color = "red";
        feedback.innerHTML = `
          <span class="label">INCORRECT!, the correct answer is ${currentLetter.name}</span>
          <br />
          <span class="label1">Examples in UPPER and lower:</span>
          <br />
          <span class="example1">${currentLetter.example1}</span> <br />
          <span class="example2">${currentLetter.example2}</span>
        `;
      }
      else if (userInput === correctAnswer) {
        feedback.style.color = "green";
        feedback.innerHTML = `
          <span class="label">CORRECT!</span>
          <br />
          <span class="label1">Examples in UPPER and lower:</span>
          <br />
          <span class="example1">${currentLetter.example1}</span> <br />
          <span class="example2">${currentLetter.example2}</span>
        `;

        // Play audio
        const index = currentLetter.index;
        var audio = new Audio("sounds/alphabet/" + index + ".mp3");
        audio.play();
      }
      else if (removeAccents(userInput) === removeAccents(correctAnswer)) {
        feedback.style.color = "orange";
        feedback.innerHTML = `
          <span class="label">CLOSE! </span> <span style="font-size: 30px;">(mind the accents):    ${currentLetter.name} </span>
          <br />
          <span class="label1">Examples in UPPER and lower:</span>
          <br />
          <span class="example1">${currentLetter.example1}</span> <br />
          <span class="example2">${currentLetter.example2}</span>`;

        // play the audio
        const index = currentLetter.index;
        var audio = new Audio("sounds/alphabet/" + index + ".mp3");
        audio.play();
      }
      else {
        feedback.style.color = "red";
        feedback.innerHTML = `
          <span class="label">INCORRECT!, the correct answer is ${currentLetter.name}</span>
          <br />
          <span class="label1">Examples in UPPER and lower:</span>
          <br />
          <
          <span class="example1">${currentLetter.example1}</span> <br />
          <span class="example2">${currentLetter.example2}</span>
        `;
        }
      });
  
      // play sound
      audioButton.addEventListener('click', function() {
        const index = currentLetter.index;
        console.log("audio session");
        console.log(index);
        var audio = new Audio("sounds/alphabet/" + index + ".mp3");
        console.log(audio);
        audio.play();
      });
  
      // 6. Display the next Greek letter in the shuffled array when the "Next" button is clicked
      nextButton.addEventListener('click', function() {
        currentIndex++;
        if (currentIndex < greekLetters.length) {
          displayNextLetter();
          clearCanvas(); // Clear the canvas before displaying the next letter
        } else {
          feedback.innerHTML = 'You have completed the set!';
        }
      });
  
      // 7. Function to remove accents from Greek letters
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
  
      // Creating a drawing canvas where the user can practice writing the letter
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
  
        // Get the canvas's bounding box
        var rect = canvas.getBoundingClientRect();
  
        // Subtract the canvas's offset from the mouse's x and y coordinates
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
    });
  