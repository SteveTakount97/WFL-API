import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Application } from '@adonisjs/core/app'
import { ContainerBindings } from '@adonisjs/core/types'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API WFL',
    version: '1.0.0',
    description: 'Documentation de l\'API WFL',
  },
  servers: [
    {
      url: 'http://localhost:3333',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./app/controllers/*.ts', './start/routes.ts'], 
}

const specs = swaggerJsdoc(options)


export async function setupSwagger(app: Application<ContainerBindings>) {
  try {
    // récupérer une instance du serveur HTTP
    const httpServer = await app.container.make('Adonis/Core/Server')

    if (httpServer) {

      httpServer.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
    }
  } catch (error) {
    console.error('Erreur lors de la configuration de Swagger:', error)
  }
}

export default setupSwagger
