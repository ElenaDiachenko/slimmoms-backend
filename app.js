const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const dailyproductsRouter = require('./routes/api/dailyproducts');
const bloodDietProductsRouter = require('./routes/api/bloodDietProducts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/dailyproducts', dailyproductsRouter);
app.use('/api/bloodproducts', bloodDietProductsRouter);

//Swager
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
