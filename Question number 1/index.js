Index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let numbers = [];

app.get('/api/numbers', (req, res) => {
  res.json(numbers);
});

app.post('/api/numbers', (req, res) => {
  const { number } = req.body;
  if (typeof number === 'number') {
    numbers.push(number);
    res.status(201).json({ message: 'Number added successfully' });
  } else {
    res.status(400).json({ error: 'Invalid number format' });
  }
});

app.delete('/api/numbers/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < numbers.length) {
    numbers.splice(index, 1);
    res.json({ message: 'Number removed successfully' });
  } else {
    res.status(404).json({ error: 'Number not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});