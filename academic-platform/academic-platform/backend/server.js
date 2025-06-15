require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const courseRoutes = require('./routes/courses');

const app = express();

// Configuración de CORS para desarrollo
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Test DB connection
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Routes
app.use('/api/courses', courseRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
