// Define an array of objects that contains information about each Greek letter
const greekLetters = [
  {letter: 'Α', name: 'Άλφα'},
  {letter: 'α', name: 'άλφα'},
  {letter: 'Β', name: 'Βήτα'},
  {letter: 'β', name: 'βήτα'},
  {letter: 'Γ', name: 'Γάμμα'},
  {letter: 'γ', name: 'λάμμα'},
  {letter: 'Δ', name: 'Δέλτα'},
  {letter: 'δ', name: 'δέλτα'},
  {letter: 'Ε', name: 'Έψιλον'},
  {letter: 'ε', name: 'εψιλον'},
  {letter: 'Ζ', name: 'Ζήτα'},
  {letter: 'ζ', name: 'ζήτα'},
  {letter: 'Η', name: 'Ήτα'},
  {letter: 'η', name: 'ητα'},
  {letter: 'Θ', name: 'Θήτα'},
  {letter: 'θ', name: 'θήτα'},
  {letter: 'Ι', name: 'Ιώτα'},
  {letter: 'ι', name: 'ιώτα'},
  {letter: 'Κ', name: 'Κάππα'},
  {letter: 'κ', name: 'κάππα'},
  {letter: 'Λ', name: 'Λάμδα'},
  {letter: 'λ', name: 'λάμδα'},
  {letter: 'Μ', name: 'Μι'},
  {letter: 'μ', name: 'μι'},
  {letter: 'Ν', name: 'Νι'},
  {letter: 'ν', name: 'νι'},
  {letter: 'Ξ', name: 'Ξι'},
  {letter: 'ξ', name: 'ξι'},
  {letter: 'Ο', name: 'Όμικρον'},
  {letter: 'ο', name: 'ομικρον'},
  {letter: 'Π', name: 'Πι'},
  {letter: 'π', name: 'πι'},
  {letter: 'Ρ', name: 'Ρώ'},
  {letter: 'ρ', name: 'ρώ'},
  {letter: 'Σ', name: 'Σίγμα'},
  {letter: 'σ', name: 'σίγμα'},
  {letter: 'ς', name: 'σίγμα'},
  {letter: 'Τ', name: 'Ταυ'},
  {letter: 'τ', name: 'ταυ'},
  {letter: 'Υ', name: 'Ύψιλον'},
  {letter: 'υ', name: 'ύψιλον'},
  {letter: 'Φ', name: 'Φι'},
  {letter: 'φ', name: 'φι'},
  {letter: 'Χ', name: 'Χι'},
  {letter: 'χ', name: 'χι'},
  {letter: 'Ψ', name: 'Ψι'},
  {letter: 'ψ', name: 'ψι'},
  {letter: 'Ω', name: 'Ώμέγα'},
  {letter: 'ω', name: 'ωμέγα'}
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
}
