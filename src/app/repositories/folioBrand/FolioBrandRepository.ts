import axios from 'axios';
import * as cheerio from 'cheerio';
import { injectable } from 'tsyringe';
import IFolioBrandRepository from './IFolioBrandRepository';
import { FolioBrand, FolioBrandProps } from '../../entities/FolioBrand';

@injectable()
export default class FolioBrandRepository implements IFolioBrandRepository {
  // folioのベースURL
  private baseUrl = 'https://folio-sec.com/theme';

  // 銘柄が格納されるtr
  private trSelector = 'tr[class^="Instruments__tr"]';

  // 銘柄の詳細情報が格納されるtd
  private tdSelector = 'td[class^="Instruments__td"]';

  // trのカラム, UIの順番とマッチしている
  private columns = [
    'brand',    // 銘柄名
    'ratio',    // 割合
    'quantity', // 株数
    'price',    // 価格
  ];

  async getByThemeName(themeName: string): Promise<FolioBrand[]> {
    const folioBrands: FolioBrand[] = [];

    // themeNameからFolioページのHTMLを取得
    const html = await this.fetchHTML(themeName);
    const $ = cheerio.load(html);

    // HTMLから銘柄が格納されるtrを取得する
    const brandTr = $(this.trSelector);

    // 銘柄を一行ずつ処理する
    brandTr.each((key, tr) => {
      // 銘柄の詳細情報が格納されるtdを取得する
      const td = $(tr).children(this.tdSelector);

      // カラム順にtdから情報を取得する
      const folioBrandProps = {
        themeName,
      } as FolioBrandProps;

      this.columns.forEach((column, index) => {
        Object.assign(
          folioBrandProps,
          { [column]: td.eq(index).text() },
        );
      });

      folioBrands.push(new FolioBrand(folioBrandProps));
    });

    return folioBrands;
  }

  private async fetchHTML(themeName): Promise<string> {
    const response = await axios.get(`${this.baseUrl}/${themeName}`);
    return response.data as string;
  }
}