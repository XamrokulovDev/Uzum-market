const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Uzum market',
    version: '1.0.0',
    description: 'Node.js bilan yaratilgan Uzum market API',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;