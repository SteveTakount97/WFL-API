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
import AuthMiddleware from '#middleware/auth_middleware'
import AdminMiddleware from '#middleware/admin_middleware'



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

  // Authentification
  router.post('/auth/register', authController.register)
  router.post('/auth/login', authController.login)
  router.post('/auth/logout', authController.logout)

router.group(() => {
  // Utilisateurs
  router.get('/admin/users', usersController.index)
  router.get('/admin/users/:id', usersController.show)
  router.delete('/admin/users/:id', usersController.destroy)
  router.put('/admin/users/:id', usersController.update) // Modifier un utilisateur


  // Gestion des chiens
  router.post('/admin/dogs', dogsController.store)  
  router.put('/admin/dogs/:id', dogsController.update)  
  router.delete('/admin/dogs/:id', dogsController.destroy)
  router.get('/admin/dogs/:id', dogsController.show)
  router.get('/dogs', dogsController.index)

   // Gestion des familles de chiens
   router.post('/admin/dog-families', dogFamiliesController.store) 
   router.get('/admin/dog-families', dogFamiliesController.index) 
   router.get('/admin/dog-families/:id', dogFamiliesController.show) 
   router.put('/admin/dog-families/:id', dogFamiliesController.update)
   router.delete('/admin/dog-families/:id', dogFamiliesController.destroy) 
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
