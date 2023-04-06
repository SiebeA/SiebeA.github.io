// Define an array of objects that contains information about each Greek letter
const greekLetters = [
  {letter: 'Α', name: 'Άλφα'},
  {letter: 'α', name: 'Άλφα'},
  {letter: 'Β', name: 'Βήτα'},
  {letter: 'β', name: 'Βήτα'},
  {letter: 'Γ', name: 'Γάμμα'},
  {letter: 'γ', name: 'Γάμμα'},
  {letter: 'Δ', name: 'Δέλτα'},
  {letter: 'δ', name: 'Δέλτα'},
  {letter: 'Ε', name: 'Έψιλον'},
  {letter: 'ε', name: 'Έψιλον'},
  {letter: 'Ζ', name: 'Ζήτα'},
  {letter: 'ζ', name: 'Ζήτα'},
  {letter: 'Η', name: 'Ήτα'},
  {letter: 'η', name: 'Ήτα'},
  {letter: 'Θ', name: 'Θήτα'},
  {letter: 'θ', name: 'Θήτα'},
  {letter: 'Ι', name: 'Ιώτα'},
  {letter: 'ι', name: 'Ιώτα'},
  {letter: 'Κ', name: 'Κάππα'},
  {letter: 'κ', name: 'Κάππα'},
  {letter: 'Λ', name: 'Λάμδα'},
  {letter: 'λ', name: 'Λάμδα'},
  {letter: 'Μ', name: 'Μυ'},
  {letter: 'μ', name: 'Μυ'},
  {letter: 'Ν', name: 'Νυ'},
  {letter: 'ν', name: 'Νυ'},
  {letter: 'Ξ', name: 'Ξι'},
  {letter: 'ξ', name: 'Ξι'},
  {letter: 'Ο', name: 'Όμικρον'},
  {letter: 'ο', name: 'Όμικρον'},
  {letter: 'Π', name: 'Πι'},
  {letter: 'π', name: 'Πι'},
  {letter: 'Ρ', name: 'Ρώ'},
  {letter: 'ρ', name: 'Ρώ'},
  // Add more letters as needed
];

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

// Display the first random Greek letter
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
}
