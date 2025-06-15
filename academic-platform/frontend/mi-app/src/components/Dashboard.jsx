<div id="chart-container" style={{ marginTop: 40, width: '100%', height: 400 }}>
  <h2>Promedio de notas por curso (Barras)</h2>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={datosGrafico}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="curso" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="nota" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
</div>
