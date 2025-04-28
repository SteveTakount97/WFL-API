import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import type { InferAuthenticators, InferAuthEvents, Authenticators } from '@adonisjs/auth/types'

const authConfig = defineConfig({
  default: 'api',  // Définir le type d'authentification par défaut
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/user'), // Modèle utilisateur lié au token
      }),
    }),
    session: sessionGuard({
      provider: sessionUserProvider({
        model: () => import('#models/user'), // Modèle utilisateur lié à la session
      }),
      useRememberMeTokens: false
    }),
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}

declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
