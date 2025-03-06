import Dog from '#models/dog';
import { DateTime } from 'luxon'
import { BadRequestException } from '@adonisjs/core/build/standalone';
import { Exception } from '@adonisjs/core/exceptions';

export default class DogService {

  // Vérification de l'âge à partir de la date de naissance
  private static validateAge(birthday: string): boolean {
    const birthDate = DateTime.fromISO(birthday);
    const age = DateTime.local().diff(birthDate, 'years').years;
    return age >= 0 && age <= 20; // Un chien ne peut pas avoir un âge négatif ou supérieur à 20 ans
  }

  // Ajouter un nouveau chien
  public async createDog(data: any): Promise<Dog> {
    const { nameDog, breed, birthday } = data;

    // Vérification des données
    if (!nameDog || nameDog.length < 3) {
      throw new BadRequestException('Le nom du chien doit comporter au moins 3 caractères');
    }

    if (!breed || breed.length < 3) {
      throw new BadRequestException('La race doit comporter au moins 3 caractères');
    }

    if (!birthday || !DogService.validateAge(birthday)) {
      throw new BadRequestException('La date de naissance n\'est pas valide');
    }
    // Vérification de l'unicité du nom
    const existingDog = await Dog.findBy('nameDog', nameDog);
    if (existingDog) {
      throw new BadRequestException('Un chien avec ce nom existe déjà');
    }

    // Création du chien
    const dog = await Dog.create(data);
    return dog;
  }

  // Modifier un chien existant
  public async updateDog(id: number, data: any): Promise<Dog | null> {
    const dog = await Dog.find(id);
    if (!dog) {
      throw new Error('Dog not found');
    }

    // Vérification des données de mise à jour
    const { nameDog, breed, birthday } = data;

    if (nameDog && nameDog.length < 3) {
      throw new BadRequestException('Le nom du chien doit comporter au moins 3 caractères');
    }

    if (breed && breed.length < 3) {
      throw new BadRequestException('La race doit comporter au moins 3 caractères');
    }

    if (birthday && !DogService.validateAge(birthday)) {
      throw new BadRequestException('La date de naissance n\'est pas valide');
    }
    dog.merge(data);
    await dog.save();
    return dog;
  }

   // Supprimer un chien
  public async deleteDog(id: number): Promise<void> {
    const dog = await Dog.find(id);
    if (!dog) {
      throw new BadRequestException('Chien non trouvé');
    }

    // Supprimer le chien
    await dog.delete();
  }
  /**
   * Récupérer un chien par son ID
   * @param dogId - L'identifiant du chien à récupérer
   * @returns Dog | null
   */
  public async getDogById(dogId: number): Promise<Dog | null> {
    const dog = await Dog.find(dogId);

    if (!dog) {
      throw new Exception('Chien non trouvé');
    }

    return dog;
  }
  /**
   * Récupérer tous les chiens disponibles
   * @returns Dog[]
   */
  public async getAllDogs(): Promise<Dog[]> {
    return await Dog.all(); // Récupère tous les chiens de la base de données
  }
}
