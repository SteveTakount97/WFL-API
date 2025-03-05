// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/http-server';
import DogService from '#services/DogService';
import { schema, rules } from '@adonisjs/validator';

export default class DogController {
  private dogService: DogService;

  constructor() {
    this.dogService = new DogService();
  }

  // Ajouter un chien
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

  // Modifier un chien
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

   // Supprimer un chien
  public async destroy({ params, response }: HttpContext) {
    try {
      await this.dogService.deleteDog(params.id);
      return response.noContent();  // Retourne une réponse vide 204 (No Content) si la suppression est réussie
    } catch (error) {
      return response.badRequest({ error: error.message });
    }
  }
}
