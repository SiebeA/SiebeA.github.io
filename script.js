fetch('greek_letters.txt')
  .then(response => response.text())
  .then(data => {
    const greekLetters = data.split('\n').map(line => {
      const [letter, name, example1, example2] = line.split(',');
      return { letter, name, example1, example2 };
    });
    // Fisher-Yates shuffle algorithm to shuffle the array of Greek letters
    for (let i = greekLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [greekLetters[i], greekLetters[j]] = [greekLetters[j], greekLetters[i]];
    }

    // Get references to HTML elements
    const tipsElement = document.getElementById("tips");
    const instruction = document.getElementById("instruction");
    const letterContainer = document.getElementById('letter-container');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const nextButton = document.getElementById('next-button');
    const feedback = document.getElementById('feedback');
    const progress = document.getElementById('progress');

    let currentIndex = 0;
    let currentLetter = greekLetters[currentIndex];
    let completedCount = 0;

    // Function to display the next Greek letter in the shuffled array
    function displayNextLetter() {
      currentLetter = greekLetters[currentIndex];
      letterContainer.innerHTML = currentLetter.letter;
      answerInput.value = '';
      feedback.innerHTML = '';
      completedCount++;
      progress.innerHTML = `Progress: ${completedCount}/${greekLetters.length}`;
    }

    tipsElement.innerHTML = " Requirement: <br> - The Greek language pack which will allow you to type Greek letters <br><br> Handy tools to use in conjunction with this test:<br> - a desktop translator (QTranslate) with which you can select and pronounce the selected Greek letters with a shortcut key <br> - a on screen keyboard, which shows you where the greek letters are located on the keyboard";

    instruction.innerHTML = "Enter the name of the Greek letter shown below";

    // Display the first Greek letter in the shuffled array
    displayNextLetter();
    // log the current answer
    console.log(currentLetter.name);

    // Compare the user's input to the correct name of the letter and provide feedback to the user
    feedback.style.fontSize = "30px";

    submitButton.addEventListener('click', function() {
      const userInput = answerInput.value.trim().toLowerCase();
      const correctAnswer = currentLetter.name.trim().toLowerCase();
      console.log(userInput, correctAnswer);
      if (userInput === '') {  // If the user does not enter an answer, display a message
        feedback.innerHTML = 'Please enter an answer.';
      }
      else if (userInput === correctAnswer) {
        feedback.style.color = "green";
        // feedback.innerHTML = 'Correct!';
        feedback.innerHTML = `
          <span class="label">CORRECT!</span>
          <br />
          <span class="label1">Examples in UPPER and lower:</span>
          <br />
          <span class="example1">${currentLetter.example1}</span> <br />
          <span class="example2">${currentLetter.example2}</span>
        `;

        currentIndex++;
        if (currentIndex < greekLetters.length) {
          // displayNextLetter(); // this caused the next letter to display before the feedback was displayed THEREFORE THE USER DID NOT SEE THE 'CORRECT' FEEDBACK
        } else {
          feedback.innerHTML += ' You have completed the set!';
        }
      }      
      else if (removeAccents(userInput) === removeAccents(correctAnswer)) {
        feedback.style.color = "orange";
        feedback.innerHTML = `
          <span class="label">CLOSE! dont forget the accents</span>
          <br />
          <span class="label1">Examples in UPPER and lower:</span>
          <br />
          <span class="example1">${currentLetter.example1}</span> <br />
          <span class="example2">${currentLetter.example2}</span>
        `;
      } else {
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
    });
    

    // Display the next Greek letter in the shuffled array when the "Next" button is clicked
    nextButton.addEventListener('click', function() {
      currentIndex++;
      // log the current index
      console.log(currentIndex);
      if (currentIndex < greekLetters.length) {
        displayNextLetter();
      } else {
        feedback.innerHTML = 'You have completed the set!';
      }
    });


    // Function to remove accents from Greek letters
    function removeAccents(str) {
      const accents = [        ['Ά', 'Α'], ['Έ', 'Ε'], ['Ή', 'Η'], ['Ί', 'Ι'], ['Ό', 'Ο'], ['Ύ', 'Υ'], ['Ώ', 'Ω'],
        ['ά', 'α'], ['έ', 'ε'], ['ή', 'η'], ['ί', 'ι'], ['ό', 'ο'], ['ύ', 'υ'], ['ώ', 'ω']
      ];

      for (let i = 0; i < accents.length; i++) {
        str = str.replace(accents[i][0], accents[i][1]);
      }

      return str;
    }
  });
