import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Usar la URL del servicio backend en Docker
        const response = await axios.get('http://backend:8000/api/courses');
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Academic Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <small>Code: {course.code}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
