const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/get-rate", getRateHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

function getRateHandler(req, res) {
  // Make it easier to reference the passed query value
  let mailWeightString = req.query.mail_weight;
  let mailWeight = Number(req.query.mail_weight);

  // Error checking
  if (mailWeightString.length < 1) {
    errorHandler(req, res, "Must enter a weight.");
    return;
  }
  if (Number.isNaN(mailWeight)) {
    errorHandler(req, res, "Weight must be a number.");
    return;
  }
  if (!isValidMailType(req.query.mail_type)) {
    errorHandler(req, res, "Invalid mail type supplied.");
    return;
  }

  // Convert string to number so we can perform calculations
  let mailType = req.query.mail_type;
  let mailTypeLabel = getMailTypeLabel(mailType);
  let price = calculateRate(mailType, mailWeight);

  // Check for errors
  if (typeof price == "string") {
    errorHandler(req, res, price);
    return;
  }

  // Render the page
  let params = {
    mailTypeLabel: mailTypeLabel,
    mailWeight: mailWeight,
    price: price.toFixed(2),
  };
  res.render("get-rate", params);
}

function calculateRate(mailType, mailWeight) {
  let rate;
  if (mailType == "letters-stamped") {
    rate = calculateLettersStampedRate(mailWeight);
  }
  if (mailType == "letters-metered") {
    rate = calculateLettersMeteredRate(mailWeight);
  }
  if (mailType == "large-envelopes") {
    rate = calculateLargeEnvelopesRate(mailWeight);
  }
  if (mailType == "first-class-package") {
    rate = calculateFirstClassPackageRate(mailWeight);
  }
  return rate;

  // If we made it this far, an invalid mail type was provided, so we'll just
  // return a null value
  return null;
}

function calculateLettersStampedRate(mailWeight) {
  if (mailWeight <= 0) {
    return 0.00;
  }
  if (mailWeight <= 1) {
    return 0.55;
  }
  if (mailWeight <= 2) {
    return 0.70;
  }
  if (mailWeight <= 3) {
    return 0.85;
  }
  if (mailWeight <= 3.5) {
    return 1.00;
  }
  return "Weight is too large. Please use a large envelope.";
}

function calculateLettersMeteredRate(mailWeight) {
  if (mailWeight <= 0) {
    return 0.00;
  }
  if (mailWeight <= 1) {
    return 0.50;
  }
  if (mailWeight <= 2) {
    return 0.65;
  }
  if (mailWeight <= 3) {
    return 0.80;
  }
  if (mailWeight <= 3.5) {
    return 0.95;
  }
  return "Weight is too large. Please use a large envelope.";
}

function calculateLargeEnvelopesRate(mailWeight) {
  if (mailWeight <= 0) {
    return 0.00;
  }
  if (mailWeight > 13) {
    return "Weight is too large.";
  }
  let multiplier = mailWeight - 1;
  let rate = 1.00 + (0.15 * multiplier);
  return rate;
}

function calculateFirstClassPackageRate(mailWeight) {
  if (mailWeight <= 0) {
    return 0.00;
  }
  if (mailWeight <= 4) {
    return 3.66;
  }
  if (mailWeight <= 8) {
    return 4.39;
  }
  if (mailWeight <= 12) {
    return 5.19;
  }
  if (mailWeight <= 13) {
    return 5.71;
  }
  return "Weight is too large.";
}

function getMailTypeLabel(mailType) {
  if (mailType == "letters-stamped") {
    return "Letters (Stamped)";
  }
  if (mailType == "letters-metered") {
    return "Letters (Metered)";
  }
  if (mailType == "large-envelopes") {
    return "Large Envelopes (Flats)";
  }
  if (mailType == "first-class-package") {
    return "First-Class Package Service";
  }

  // If we made it this far, it was not a valid mail type
  return "Unknown";
}

function isValidMailType(mailType) {
  if (mailType == "letters-stamped") {
    return true;
  }
  if (mailType == "letters-metered") {
    return true;
  }
  if (mailType == "large-envelopes") {
    return true;
  }
  if (mailType == "first-class-package") {
    return true;
  }

  // If we made it this far, it was not a valid mail type
  return false;
}

function errorHandler(req, res, errorMessage) {
  let params = {};
  if (typeof errorMessage == "string") {
    params.errorMessage = errorMessage;
  } else {
    params.errorMessage = "An error occurred.";
  }
  res.render("error", params);
}
