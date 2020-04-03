import { FolioBrand } from '../../entities/FolioBrand';

export default interface IFolioBrandRepository {
  getByThemeName(themeName: string): Promise<FolioBrand[]>
}