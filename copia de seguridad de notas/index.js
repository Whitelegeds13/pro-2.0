const express = require('express');
const cors = require('cors');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/guardar-nota', async (req, res) => {
  try {
    const { titulo, contenido } = req.body;

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: titulo, bold: true, size: 32 })],
            }),
            new Paragraph({ text: contenido }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const nombreArchivo = `nota_${Date.now()}.docx`;
    const rutaArchivo = path.join(__dirname, nombreArchivo);

    fs.writeFileSync(rutaArchivo, buffer);

    res.json({ mensaje: 'Nota guardada correctamente', archivo: nombreArchivo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error guardando la nota' });
  }
});

const PORT = 4001; // Puedes usar otro puerto para no interferir con backend
app.listen(PORT, () => {
  console.log(`Servidor de copia de seguridad escuchando en puerto ${PORT}`);
});
