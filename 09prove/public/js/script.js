// Check for errors with prepopulated fields
window.addEventListener("load", function() {
  checkWeight();
});

function checkWeight() {
  // Check for input errors
  var weightString = document.getElementById("mail-weight").value;
  var weight = Number(weightString);
  if (weightString.length < 1) {
    setError("");
    return;
  }
  if (Number.isNaN(weight)) {
    setError("Weight must be a number");
    return;
  }

  // Make sure mail isn't too heavy
  var maxWeight = getMaxWeight();
  if (weight > maxWeight) {
    var errorString = "";
    errorString += "Weight for this package type cannot be heavier than";
    errorString += " " + maxWeight.toFixed(1) + " oz"
    setError(errorString);
    return;
  }

  // Remove error and enable submit button
  removeError();
}

function getMaxWeight() {
  var mailType = document.getElementById("mail-type").value;
  if (mailType == "letters-stamped") {
    return 3.5;
  }
  if (mailType == "letters-metered") {
    return 3.5;
  }
  if (mailType == "large-envelopes") {
    return 13;
  }
  if (mailType == "first-class-package") {
    return 13;
  }
}

function setError(errorString) {
  var message = document.getElementById("message");
  if (errorString.length > 0) {
    message.innerHTML = "Error: " + errorString;
  } else {
    message.innerHTML = "";
  }
  document.getElementById("submit-button").setAttribute("disabled", "");
}

function removeError() {
  var message = document.getElementById("message");
  message.innerHTML = "";
  document.getElementById("submit-button").removeAttribute("disabled");
}
