/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/AuthController'

const authController = new AuthController() 

router.group(() => {
  router.post("/auth/register", authController.register)
  router.post("/auth/login", authController.login)
}).prefix("/api/v1")
