import swaggerJsdoc from 'swagger-jsdoc'
import { HttpContext } from '@adonisjs/http-server'

// Spécification de Swagger
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Example',
      version: '1.0.0',
      description: 'Documentation API WFL avec Swagger',
    },
  },
  apis: ['./app/controllers/**/*.ts'], // Chemin vers les contrôleurs
})

export default class SwaggerController {
  /**
   * Route pour afficher Swagger UI
   */
  public async showSwaggerUI({ response }: HttpContext) {
    response.header('Content-Type', 'text/html')
    return response.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Swagger UI</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.1/swagger-ui.min.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.1/swagger-ui-bundle.min.js"></script>
          <script>
            const ui = SwaggerUIBundle({
              url: '/swagger-json',
              dom_id: '#swagger-ui',
            });
          </script>
        </body>
      </html>
    `)
  }

  /**
   * Router pour récupérer le fichier JSON Swagger
   */
  public async showSwaggerJSON({ response }: HttpContext) {
    return response.json(swaggerSpec)
  }
}
