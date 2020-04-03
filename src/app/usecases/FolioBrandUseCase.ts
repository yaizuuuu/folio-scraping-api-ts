import { inject, autoInjectable } from 'tsyringe';
import IFolioBrandRepository
  from '../repositories/folioBrand/IFolioBrandRepository';
import { FolioBrand } from '../entities/FolioBrand';

@autoInjectable()
export default class FolioBrandUseCase {
  constructor(
    @inject('IFolioBrandRepository') private repository: IFolioBrandRepository,
  ) {}

  async getByThemeName(themeName: string): Promise<FolioBrand[]> {
    return this.repository.getByThemeName(themeName);
  }
}