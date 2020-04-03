import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import { container } from 'tsyringe';
import FolioBrandRepository
  from './app/repositories/folioBrand/FolioBrandRepository';
import FolioBrandUseCase from './app/usecases/FolioBrandUseCase';

container.register('IFolioBrandRepository', { useClass: FolioBrandRepository });

const app = express();
app.disable('etag');
app.use(cors());

app.get('/theme/:themeName', async (req, res) => {
  const folioBrandUseCase = container.resolve(FolioBrandUseCase);
  const folioBrands = await folioBrandUseCase.getByThemeName(req.params.themeName);

  res.type('json');
  res.send(JSON.stringify({
    result: folioBrands,
  }));
});

app.listen(80, () => { console.log('Listening on port 80'); });
