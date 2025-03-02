import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API AdonisJS',
    version: '1.0.0',
    description: 'Documentation de l\'API avec Swagger pour AdonisJS 6',
  },
  servers: [
    {
      url: 'http://localhost:3333', 
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['app/Controllers/**/*.ts'], // Chemin vers les contrôleurs à documenter
}

export default swaggerJSDoc(options)
