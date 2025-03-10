import { HttpContext } from '@adonisjs/core/http';
import DogFamilyService from '#services/DogFamilyServices';

export default class DogFamilyController {
    /**
   * @swagger
   * /api/dog-families:
   *   post:
   *     summary: Crée une nouvelle famille de chiens
   *     tags:
   *       - Dog Families
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       201:
   *         description: Famille de chiens créée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *       400:
   *         description: Erreur lors de la création de la famille
   */
    public async store({ request, response }: HttpContext) {
      try {
        const newFamily = await DogFamilyService.createFamily(request);
        return response.created(newFamily);
      } catch (error) {
        return response.badRequest({ message: error.messages || 'Erreur lors de la création' });
      }
    }
  /**
   * @swagger
   * /api/dog-families:
   *   get:
   *     summary: Liste toutes les familles de chiens
   *     tags:
   *       - Dog Families
   *     responses:
   *       200:
   *         description: Liste des familles de chiens
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   description:
   *                     type: string
   *       500:
   *         description: Erreur interne du serveur
   */
  public async index({ response }: HttpContext) {
    const families = await DogFamilyService.getAllFamilies();
    return response.ok(families);
  }

  /**
   * @swagger
   * /api/dog-families/{id}:
   *   get:
   *     summary: Affiche une famille de chiens spécifique
   *     tags:
   *       - Dog Families
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de la famille de chiens
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Famille de chiens trouvée
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *       404:
   *         description: Famille non trouvée
   *       500:
   *         description: Erreur interne du serveur
   */
  public async show({ params, response }: HttpContext) {
    try {
      const family = await DogFamilyService.getFamilyById(params.id);
      return response.ok(family);
    } catch (error) {
      return response.notFound({ message: 'Famille non trouvée' });
    }
  }

  /**
   * @swagger
   * /api/dog-families/{id}:
   *   put:
   *     summary: Met à jour une famille de chiens
   *     tags:
   *       - Dog Families
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de la famille à mettre à jour
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       200:
   *         description: Famille de chiens mise à jour avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *       400:
   *         description: Erreur lors de la mise à jour de la famille
   *       404:
   *         description: Famille non trouvée
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const updatedFamily = await DogFamilyService.updateFamily(params.id, request);
      return response.ok(updatedFamily);
    } catch (error) {
      return response.badRequest({ message: error.messages || `Impossible de mettre à jour la famille ${params.id}` });
    }
  }

  /**
   * @swagger
   * /api/dog-families/{id}:
   *   delete:
   *     summary: Supprime une famille de chiens
   *     tags:
   *       - Dog Families
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de la famille à supprimer
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Famille supprimée avec succès
   *       404:
   *         description: Famille non trouvée
   *       500:
   *         description: Erreur interne du serveur
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      await DogFamilyService.deleteFamily(params.id);
      return response.ok({ message: 'Famille supprimée avec succès' });
    } catch (error) {
      return response.notFound({ message: `Impossible de supprimer la famille ${params.id}` });
    }
  }
}
