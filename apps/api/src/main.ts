import { app, expressAppSetup } from './app';
import { AppDataSource } from './data-source';

(async () => {
  await expressAppSetup(AppDataSource);
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
})();
