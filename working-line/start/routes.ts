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
import UsersController from '#controllers/users_controller'
import DogsController from '#controllers/dogs_controller'
import ContactsController from '#controllers/contacts_controller'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import MessagesController from '#controllers/messages_controller'
import DogFamiliesController from '#controllers/dog_families_controller'


const authController = new AuthController()
const usersController = new UsersController()
const dogsController = new DogsController()
const contactsController = new ContactsController()
const messagesController = new MessagesController()
const dogFamiliesController = new DogFamiliesController()


// Affichage du fichier swagger.json
router.get('/swagger.json', async ({ response }) => {
  return response.json(swaggerSpec)
})

// Affichage de l'interface Swagger UI
router.get('/swagger-ui', async ({ response }) => {
  return response.send(swaggerUi.generateHTML(swaggerSpec))
})

router.group(() => {
  // Authentification
  router.post('/auth/register', authController.register)
  router.post('/auth/login', authController.login)
  router.post('/auth/logout', authController.logout)

  // Utilisateurs
  router.get('/users', usersController.index)
  router.get('/users/:id', usersController.show)
  router.delete('/users/:id', usersController.destroy)
  router.put('/users/:id', usersController.update) // Modifier un utilisateur


  // Gestion des chiens
  router.post('/dogs', dogsController.store) 
  router.get('/dogs', dogsController.index) 
  router.get('/dogs/:id', dogsController.show) 
  router.put('/dogs/:id', dogsController.update) 
  router.delete('/dogs/:id', dogsController.destroy) 

  // Contacts
  router.post('/contacts', contactsController.store) 
  router.get('/contacts', contactsController.index) 
  router.delete('/contacts/:id', contactsController.destroy) 

  // Messages
  router.post('/messages', messagesController.store) 
  router.get('/messages', messagesController.index) 
  router.get('/messages/:id', messagesController.show) 
  router.delete('/messages/:id', messagesController.destroy) 

   // Gestion des familles de chiens
   router.post('/dog-families', dogFamiliesController.store) 
   router.get('/dog-families', dogFamiliesController.index) 
   router.get('/dog-families/:id', dogFamiliesController.show) 
   router.put('/dog-families/:id', dogFamiliesController.update)
   router.delete('/dog-families/:id', dogFamiliesController.destroy) 


}).prefix('/api')
