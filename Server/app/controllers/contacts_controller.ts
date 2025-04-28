import { HttpContext } from '@adonisjs/core/http';
import Contact from '#models/contact';
import { schema, rules } from '@adonisjs/validator';

export default class ContactsController {
  /**
   * @swagger
   * /api/contacts:
   *   post:
   *     summary: Ajouter une demande de contact
   *     tags:
   *       - Contacts
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               message:
   *                 type: string
   *     responses:
   *       201:
   *         description: Demande de contact créée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 contact:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   *                     message:
   *                       type: string
   *       400:
   *         description: Erreur lors de la création du contact
   */
  public async store({ request, response }: HttpContext) {
    try {
      // Validation des données entrantes
      const contactSchema = schema.create({
        name: schema.string({ trim: true }),
        email: schema.string({}, [rules.email()]),
        message: schema.string(),
      });

      const payload = await request.validate({ schema: contactSchema });

      // Création du contact
      const contact = await Contact.create(payload);

      return response.created({
        message: 'Demande de contact créée avec succès',
        contact,
      });
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la création du contact',
        error: error.messages || error.message,
      });
    }
  }

  /**
   * @swagger
   * /api/contacts:
   *   get:
   *     summary: Voir toutes les demandes de contact (avec pagination)
   *     tags:
   *       - Contacts
   *     parameters:
   *       - in: query
   *         name: page
   *         required: false
   *         description: Numéro de page pour la pagination
   *         schema:
   *           type: integer
   *       - in: query
   *         name: limit
   *         required: false
   *         description: Limite du nombre de contacts par page
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Liste des contacts récupérée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 contacts:
   *                   type: object
   *                   properties:
   *                     total:
   *                       type: integer
   *                     per_page:
   *                       type: integer
   *                     current_page:
   *                       type: integer
   *                     last_page:
   *                       type: integer
   *                     data:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: integer
   *                           name:
   *                             type: string
   *                           email:
   *                             type: string
   *                           message:
   *                             type: string
   *       500:
   *         description: Erreur lors de la récupération des contacts
   */
  public async index({ request, response }: HttpContext) {
    try {
      // Récupération avec pagination (10 contacts par page)
      const page = request.input('page', 1);
      const limit = request.input('limit', 10);
      const contacts = await Contact.query().paginate(page, limit);

      return response.json({
        message: 'Liste des contacts récupérée avec succès',
        contacts,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erreur lors de la récupération des contacts',
        error: error.message,
      });
    }
  }

  /**
   * @swagger
   * /api/contacts/{id}:
   *   put:
   *     summary: Met à jour une demande de contact
   *     tags:
   *       - Contacts
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de la demande de contact à mettre à jour
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
   *               email:
   *                 type: string
   *               message:
   *                 type: string
   *     responses:
   *       200:
   *         description: Demande de contact mise à jour avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 contact:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   *                     message:
   *                       type: string
   *       400:
   *         description: Erreur lors de la mise à jour du contact
   *       404:
   *         description: Contact non trouvé
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      // Recherche du contact
      const contact = await Contact.findOrFail(params.id);

      // Définition du schéma de validation
      const contactSchema = schema.create({
        name: schema.string.optional({ trim: true }),
        email: schema.string.optional({}, [rules.email()]),
        message: schema.string.optional(),
      });

      // Validation des données
      const payload = await request.validate({ schema: contactSchema });

      // Mise à jour du contact
      contact.merge(payload);
      await contact.save();

      return response.json({
        message: 'Demande de contact mise à jour avec succès',
        contact,
      });
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la mise à jour du contact',
        error: error.messages || error.message,
      });
    }
  }

  /**
   * @swagger
   * /api/contacts/{id}:
   *   delete:
   *     summary: Supprimer une demande de contact
   *     tags:
   *       - Contacts
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de la demande de contact à supprimer
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Contact supprimé avec succès
   *       404:
   *         description: Contact non trouvé
   *       500:
   *         description: Erreur interne du serveur
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      // Récupération et suppression du contact
      const contact = await Contact.findOrFail(params.id);
      await contact.delete();

      return response.noContent();
    } catch (error) {
      return response.status(404).json({
        message: 'Le contact demandé est introuvable',
        error: error.message,
      });
    }
  }
}
