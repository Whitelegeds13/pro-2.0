import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

// Generar datos iniciales aleatorios para 10 cursos y 5 alumnos cada uno
const NOMBRES = ['Ana', 'Luis', 'Carlos', 'María', 'Juan'];
const CURSOS = ['Matemáticas', 'Historia', 'Física', 'Química', 'Biología', 'Inglés', 'Arte', 'Música', 'Geografía', 'Literatura'];

function generarDatos() {
  return CURSOS.map(curso => ({
    curso,
    alumnos: NOMBRES.map(nombre => ({
      nombre,
      nota: Math.floor(Math.random() * 21), // 0 a 20
    })),
  }));
}

const App = () => {
  const [data, setData] = useState(generarDatos());
  const [mostrarGrafico, setMostrarGrafico] = useState(false);

  // Cambiar nota en input
  const cambiarNota = (cursoIndex, alumnoIndex, value) => {
    const newData = [...data];
    const nota = Number(value);
    if (!isNaN(nota) && nota >= 0 && nota <= 20) {
      newData[cursoIndex].alumnos[alumnoIndex].nota = nota;
      setData(newData);
    }
  };

  // Preparar datos para gráfico: promedio por curso
  const datosGrafico = data.map(({ curso, alumnos }) => {
    const promedio = alumnos.reduce((acc, a) => acc + a.nota, 0) / alumnos.length;
    return { curso, promedio: Number(promedio.toFixed(2)) };
  });

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Rendimiento Académico - 10 Cursos</h1>
      {data.map(({ curso, alumnos }, cursoIndex) => (
        <div key={curso} style={{ marginBottom: 20 }}>
          <h2>{curso}</h2>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '300px' }}>
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Nota (0-20)</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map(({ nombre, nota }, alumnoIndex) => (
                <tr key={nombre}>
                  <td>{nombre}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={nota}
                      onChange={(e) => cambiarNota(cursoIndex, alumnoIndex, e.target.value)}
                      style={{ width: '60px' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <button onClick={() => setMostrarGrafico(true)} style={{ padding: '10px 20px', fontSize: 16 }}>
        Colgar Nota y Ver Gráficos
      </button>

      {mostrarGrafico && (
        <div style={{ marginTop: 40, width: '100%', height: 400 }}>
          <h2>Promedio de notas por curso</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datosGrafico} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="curso" />
              <YAxis domain={[0, 20]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="promedio" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
