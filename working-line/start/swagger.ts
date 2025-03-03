import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Working-line',
    version: '1.0.0',
    description: 'Documentation de l\'API avec Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3333', 
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['app/Controllers/**/*.ts'], 
}

export default swaggerJSDoc(options)
