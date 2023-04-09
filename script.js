fetch('greek_letters.txt')
  .then(response => response.text())
  .then(data => {
    const greekLetters = data.split('\n').map(line => {
      const [letter, name] = line.split(',');
      return { letter, name };
    });

// Get references to HTML elements
const letterContainer = document.getElementById('letter-container');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const feedback = document.getElementById('feedback');

let randomIndex = Math.floor(Math.random() * greekLetters.length);
let randomLetter = greekLetters[randomIndex];

// Function to display a new random Greek letter
function displayNewLetter() {
  randomIndex = Math.floor(Math.random() * greekLetters.length);
  randomLetter = greekLetters[randomIndex];
  letterContainer.innerHTML = randomLetter.letter;
  answerInput.value = '';
  feedback.innerHTML = '';
}

// Display the first random Greek letter`
displayNewLetter();

// Compare the user's input to the correct name of the letter and provide feedback to the user
submitButton.addEventListener('click', function() {
  const userInput = answerInput.value.trim().toLowerCase();
  const correctAnswer = randomLetter.name.toLowerCase();

  if (userInput === correctAnswer) {
    feedback.innerHTML = 'Correct!';
  } else if (userInput === '') {
    feedback.innerHTML = 'Please enter an answer.';
  } else if (removeAccents(userInput) === removeAccents(correctAnswer)) {
    feedback.innerHTML = 'Close! You had a small typo.';
  } else {
    feedback.innerHTML = 'Incorrect. The correct answer is ' + randomLetter.name + '.';
  }
});

// Display a new random Greek letter when the "Next" button is clicked
nextButton.addEventListener('click', function() {
  displayNewLetter();
});

// Function to remove accents from Greek letters
function removeAccents(str) {
  const accents = [
    ['Ά', 'Α'], ['Έ', 'Ε'], ['Ή', 'Η'], ['Ί', 'Ι'], ['Ό', 'Ο'], ['Ύ', 'Υ'], ['Ώ', 'Ω'],
    ['ά', 'α'], ['έ', 'ε'], ['ή', 'η'], ['ί', 'ι'], ['ό', 'ο'], ['ύ', 'υ'], ['ώ', 'ω']
  ];

  for (let i = 0; i < accents.length; i++) {
    str = str.replace(accents[i][0], accents[i][1]);
  }

  return str;
}});

