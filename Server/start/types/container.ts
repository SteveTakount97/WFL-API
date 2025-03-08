import { Application } from 'express'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    'Adonis/Core/Server': Application
  }
}
