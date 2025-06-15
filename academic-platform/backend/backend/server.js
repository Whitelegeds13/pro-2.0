const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor backend en funcionamiento');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
