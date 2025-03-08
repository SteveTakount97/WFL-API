// contracts/application.ts
import { Server } from '@adonisjs/core/http'

// Étendre uniquement l'interface de ApplicationService pour ajouter httpServer
declare module '@adonisjs/core/app' {
  interface ApplicationService {
    httpServer: Server
  }
}
