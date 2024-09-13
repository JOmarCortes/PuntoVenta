const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());

// Documentación con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/punto_venta', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));

// Rutas
app.use('/api/ventas', require('./routes/ventas'));
app.use('/api/compras', require('./routes/compras'));
app.use('/api/stock', require('./routes/stock'));

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
