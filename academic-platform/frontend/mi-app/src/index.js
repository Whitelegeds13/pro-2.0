import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { saveAs } from 'file-saver';
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow,
  TableCell, WidthType, HeadingLevel,
} from "docx";

const NOMBRES = [
  'Ana', 'Luis', 'Carlos', 'María', 'Juan', 'Sofía', 'Pedro', 'Lucía', 'Diego', 'Elena',
  'Jorge', 'Valeria', 'Andrés', 'Camila', 'Ricardo', 'Isabela', 'Fernando', 'Marta', 'Raúl', 'Paula'
];

const CURSOS = ['Matemáticas', 'Historia', 'Física', 'Química', 'Biología', 'Inglés', 'Arte', 'Música', 'Geografía', 'Literatura'];

function generarDatos() {
  return CURSOS.map(curso => ({
    curso,
    alumnos: NOMBRES.map(nombre => ({
      nombre,
      nota: Math.floor(Math.random() * 21),
    })),
  }));
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#DC7633', '#117A65', '#7D3C98', '#48C9B0', '#F1C40F'];

const App = () => {
  const [data, setData] = useState(generarDatos());
  const [mostrarGrafico, setMostrarGrafico] = useState(false);

  const cambiarNota = (cursoIndex, alumnoIndex, value) => {
    const newData = [...data];
    const nota = Number(value);
    if (!isNaN(nota) && nota >= 0 && nota <= 20) {
      newData[cursoIndex].alumnos[alumnoIndex].nota = nota;
      setData(newData);
    }
  };

  const datosGrafico = data.map(({ curso, alumnos }) => {
    const promedio = alumnos.reduce((acc, a) => acc + a.nota, 0) / alumnos.length;
    return { curso, promedio: Number(promedio.toFixed(2)) };
  });

  const generarDocumento = async () => {
    const rows = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ text: "Curso", bold: true })], width: { size: 50, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ text: "Alumno" })] }),
          new TableCell({ children: [new Paragraph({ text: "Nota" })] }),
        ],
      }),
    ];

    data.forEach(({ curso, alumnos }) => {
      alumnos.forEach(({ nombre, nota }) => {
        rows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(curso)] }),
              new TableCell({ children: [new Paragraph(nombre)] }),
              new TableCell({ children: [new Paragraph(nota.toString())] }),
            ],
          })
        );
      });
    });

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            text: "Reporte de Rendimiento Académico",
            heading: HeadingLevel.TITLE,
            spacing: { after: 300 },
          }),
          new Paragraph({
            text: `Fecha: ${new Date().toLocaleString()}`,
            spacing: { after: 300 },
          }),
          new Table({
            rows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({
            text: "Promedios por curso",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 300 },
          }),
          new Paragraph({ text: "Gráficos generados en frontend." }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "reporte_rendimiento_academico.docx");
  };

  const onClickColgarNota = () => {
    setMostrarGrafico(true);
    generarDocumento();
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Rendimiento Académico - 10 Cursos y 20 Alumnos</h1>
      {data.map(({ curso, alumnos }, cursoIndex) => (
        <div key={curso} style={{ marginBottom: 20 }}>
          <h2>{curso}</h2>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 600 }}>
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

      <button
        onClick={onClickColgarNota}
        style={{ padding: '10px 20px', fontSize: 16, marginTop: 20 }}
      >
        Colgar Nota y Ver Gráficos y Descargar Word
      </button>

      {mostrarGrafico && (
        <>
          <div style={{ marginTop: 40, width: '100%', height: 400 }}>
            <h2>Promedio de notas por curso (Barras)</h2>
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

          <div style={{ marginTop: 40, width: '100%', height: 400 }}>
            <h2>Distribución Promedio por Curso (Circular)</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datosGrafico}
                  dataKey="promedio"
                  nameKey="curso"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {datosGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
