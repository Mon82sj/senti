const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const vader = require('vader-sentiment');

app.get('https://senti-o9oh-client.vercel.app/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.js'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());
app.use(bodyParser.json());

// Function to validate if the input text contains only numbers
const isNumeric = (text) => /^\d+$/.test(text);

// Function to validate if the input text contains only symbols
const isSymbolOnly = (text) => /^[\W_]+$/.test(text);


// Function to check for combinations of numerals and alphabets in a single word
const hasMixedAlphanumeric = (text) => /\b(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+\b/.test(text);

// // Function to check for combinations of symbols and letters/numbers in a single word
// const hasMixedSymbolic = (text) => /\b(?=.*[\p{L}\d])(?=.*[\W_])[^\s]+\b/u.test(text);

app.post('/analyze', (req, res) => {
  const { text } = req.body;

  // Validate input
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid input text' });
  }

  // Check for numerical input
  if (isNumeric(text)) {
    return res.status(400).json({ error: 'Invalid text format: Contains only numbers' });
  }

  // Check for symbol-only input
  if (isSymbolOnly(text)) {
    return res.status(400).json({ error: 'Invalid text format: Contains only symbols' });
  }

  // Check for meaningless alphanumeric combinations
   if (hasMixedAlphanumeric(text)) {
     return res.status(400).json({ error: 'Invalid input text: Combination of letters and numbers in a single word' });
   }

   // Check for meaningful words
  // if (!hasMeaningfulWords(text)) {
  //   return res.status(400).json({ error: 'Can\'t understand: No meaningful words found' });
  // }

  // Perform sentiment analysis using VADER
  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);

  // Determine sentiment based on compound score
  let sentiment = 'Neutral';
  if ((intensity.compound >= 0.05)&&(intensity.compound <= 0.5)) {
    sentiment = 'Positive';
  }
  else if ((intensity.compound >= 0.5)) {
    sentiment = 'Very Positive';
  }
   else if ((intensity.compound <= -0.05)&&(intensity.compound <= -0.15)) {
    sentiment = 'Negative';
  }
  else if (intensity.neutral == 0) {
    sentiment = 'Neutral';
  }

  res.json({ sentiment, intensity });
});



