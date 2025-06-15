import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const datosGrafico = [
  { Curso: "Matemáticas", Promedio: 85 },
  { Curso: "Historia", Promedio: 90 },
  { Curso: "Ciencias", Promedio: 78 },
  { Curso: "Literatura", Promedio: 92 },
];

export default function GraficaConBoton() {
  const [mostrarGrafico, setMostrarGrafico] = useState(false);

  const handleClick = () => {
    // Aquí iría la lógica de "colgar nota" si la tienes,
    // y luego se muestra el gráfico:
    setMostrarGrafico(true);
  };

  return (
    <div style={{ marginTop: 40, width: "100%", height: 400 }}>
      <button onClick={handleClick}>Colgar nota y ver gráfico</button>

      {mostrarGrafico && (
        <>
          <h2>Promedio de notas por curso (Barras)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={datosGrafico}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Curso" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Promedio" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
