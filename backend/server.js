const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const Student = require('./models/Student');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Error:', err));


const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.post('/students', async (req, res) => {
  const { name, math, science, english } = req.body;

  if (
    !name || name.length > 20 ||
    math < 0 || math > 100 ||
    science < 0 || science > 100 ||
    english < 0 || english > 100
  ) {
    return res.status(400).send('Validation failed');
  }

  const total = math + science + english;
  let grade = 'C';
  if (total >= 240) grade = 'A';
  else if (total >= 180) grade = 'B';

  try {
    const student = new Student({ name, math, science, english, total, grade });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).send(' Server error');
    
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send(' Server error');
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
