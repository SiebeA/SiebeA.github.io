

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
});

