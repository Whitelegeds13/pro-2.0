const express = require('express');
const router = express.Router();
const { Course } = require('../models');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new course
router.post('/', async (req, res) => {
  try {
    const { name, description, code } = req.body;
    const newCourse = await Course.create({ name, description, code });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
