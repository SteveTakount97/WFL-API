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
import MessagesController from '#controllers/messages_controller'
import DogFamiliesController from '#controllers/dog_families_controller'
import AuthMiddleware from '#middleware/auth_middleware'
import AdminMiddleware from '#middleware/admin_middleware'
import SwaggerController from './swagger.js'



const authController = new AuthController()
const usersController = new UsersController()
const dogsController = new DogsController()
const contactsController = new ContactsController()
const messagesController = new MessagesController()
const dogFamiliesController = new DogFamiliesController()
const swaggerController = new SwaggerController()




// Route de test pour la racine
router.get('/', async () => {
  return 'Bienvenue sur l\'API WFL'
})

// Route pour afficher Swagger UI
router.get('/swagger-ui', swaggerController.showSwaggerUI.bind(swaggerController))

// Route pour récupérer le fichier JSON Swagger
router.get('/swagger-json', swaggerController.showSwaggerJSON.bind(swaggerController))
router.get('/swagger-yaml', swaggerController.generateSwaggerYaml.bind(swaggerController))

// Authentification
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/logout', authController.logout)

router.group(() => {
  // Utilisateurs
  router.get('/admin/users', usersController.index)
  router.get('/admin/users/:id', usersController.show)
  router.delete('/admin/users/:id', usersController.destroy)
  router.put('/admin/users/:id', usersController.update) 


  // Gestion des chiens
  router.post('/admin/dogs', dogsController.store)  
  router.put('/admin/dogs/:id', dogsController.update)  
  router.delete('/admin/dogs/:id', dogsController.destroy)
  router.get('/admin/dogs/:id', dogsController.show)
  router.get('/dogs', dogsController.index)

  // Gestion des familles de chiens
  router.post('/dog-families', dogFamiliesController.store) 
  router.get('/dog-families', dogFamiliesController.index) 
  router.get('/dog-families/:id', dogFamiliesController.show) 
  router.put('/dog-families/:id', dogFamiliesController.update)
  router.delete('/dog-families/:id', dogFamiliesController.destroy) 
 
  // Contacts
 router.post('/contacts', contactsController.store) 
 router.get('/contacts', contactsController.index) 
 router.delete('/contacts/:id', contactsController.destroy) 
 router.put('/contacts/:id', contactsController.update)


 // Messages
 router.post('/messages', messagesController.store) 
 router.get('/messages/:userId', messagesController.index)  
 router.get('/messages/:id', messagesController.show) 
 router.delete('/messages/:id', messagesController.destroy) 

}).prefix('/api').middleware([new AuthMiddleware().handle, new AdminMiddleware().handle])
