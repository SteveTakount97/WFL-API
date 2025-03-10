import { HttpContext } from '@adonisjs/http-server';
import DogService from '#services/DogService';
import { schema, rules } from '@adonisjs/validator';

export default class DogController {
  private dogService: DogService;

  constructor() {
    this.dogService = new DogService();
  }

  /**
   * @swagger
   * /api/admin/dogs:
   *   post:
   *     summary: Ajouter un chien
   *     tags:
   *       - Dogs
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nameDog:
   *                 type: string
   *                 description: Nom du chien
   *               breed:
   *                 type: string
   *                 description: Race du chien
   *               age:
   *                 type: integer
   *                 description: Âge du chien
   *               birthday:
   *                 type: string
   *                 format: date
   *                 description: Date de naissance du chien
   *               gender:
   *                 type: string
   *                 description: Sexe du chien
   *     responses:
   *       201:
   *         description: Chien ajouté avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nameDog:
   *                   type: string
   *                 breed:
   *                   type: string
   *                 age:
   *                   type: integer
   *                 birthday:
   *                   type: string
   *                   format: date
   *                 gender:
   *                   type: string
   *       400:
   *         description: Erreur lors de l'ajout du chien
   */
  public async store({ request, response }: HttpContext) {
    const dogSchema = schema.create({
      nameDog: schema.string({ trim: true }, [rules.minLength(3)]),
      breed: schema.string({ trim: true }),
      age: schema.number(),
      birthday: schema.date(),
      gender: schema.string({ trim: true }),
    });

    const data = await request.validate({ schema: dogSchema });

    try {
      const dog = await this.dogService.createDog(data);
      return response.created(dog);
    } catch (error) {
      return response.badRequest({ error: error.message });
    }
  }

  /**
   * @swagger
   * /api/admin/dogs/{id}:
   *   put:
   *     summary: Modifier un chien
   *     tags:
   *       - Dogs
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID du chien à modifier
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nameDog:
   *                 type: string
   *               breed:
   *                 type: string
   *               age:
   *                 type: integer
   *               birthday:
   *                 type: string
   *                 format: date
   *               gender:
   *                 type: string
   *     responses:
   *       200:
   *         description: Chien modifié avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nameDog:
   *                   type: string
   *                 breed:
   *                   type: string
   *                 age:
   *                   type: integer
   *                 birthday:
   *                   type: string
   *                   format: date
   *                 gender:
   *                   type: string
   *       404:
   *         description: Chien non trouvé
   *       400:
   *         description: Erreur lors de la modification du chien
   */
  public async update({ params, request, response }: HttpContext) {
    const dogSchema = schema.create({
      nameDog: schema.string.optional({ trim: true }, [rules.minLength(3)]),
      breed: schema.string.optional({ trim: true }),
      age: schema.number.optional(),
      birthday: schema.date.optional(),
      gender: schema.string.optional({ trim: true }),
    });

    const data = await request.validate({ schema: dogSchema });

    try {
      const dog = await this.dogService.updateDog(params.id, data);
      if (!dog) {
        return response.notFound({ error: 'Dog not found' });
      }
      return response.ok(dog);
    } catch (error) {
      return response.badRequest({ error: error.message });
    }
  }

  /**
   * @swagger
   * /api/admin/dogs/{id}:
   *   delete:
   *     summary: Supprimer un chien
   *     tags:
   *       - Dogs
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID du chien à supprimer
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Chien supprimé avec succès
   *       400:
   *         description: Erreur lors de la suppression du chien
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      await this.dogService.deleteDog(params.id);
      return response.noContent();  // Retourne une réponse vide 204 (No Content) si la suppression est réussie
    } catch (error) {
      return response.badRequest({ error: error.message });
    }
  }

  /**
   * @swagger
   * /api/admin/dogs:
   *   get:
   *     summary: Récupérer toutes les informations sur les chiens
   *     tags:
   *       - Dogs
   *     responses:
   *       200:
   *         description: Liste de tous les chiens
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   nameDog:
   *                     type: string
   *                   breed:
   *                     type: string
   *                   age:
   *                     type: integer
   *                   birthday:
   *                     type: string
   *                     format: date
   *                   gender:
   *                     type: string
   *       500:
   *         description: Erreur interne du serveur
   */
  public async index({ response }: HttpContext) {
    try {
      const dogs = await this.dogService.getAllDogs();
      return response.ok(dogs); // Retourne la liste des chiens
    } catch (error) {
      return response.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }

  /**
   * @swagger
   * /api/admin/dogs/{id}:
   *   get:
   *     summary: Récupérer les informations d'un chien par son ID
   *     tags:
   *       - Dogs
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID du chien
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Informations sur le chien
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nameDog:
   *                   type: string
   *                 breed:
   *                   type: string
   *                 age:
   *                   type: integer
   *                 birthday:
   *                   type: string
   *                   format: date
   *                 gender:
   *                   type: string
   *       404:
   *         description: Chien introuvable
   */
  public async show({ params, response }: HttpContext) {
    try {
      const dogId = Number(params.id);
      const dog = await this.dogService.getDogById(dogId);

      return response.ok(dog);
    } catch (error) {
      return response.status(error.status || 500).json({ message: error.message });
    }
  }
}
