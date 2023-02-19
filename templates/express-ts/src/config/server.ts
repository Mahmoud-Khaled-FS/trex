import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { PORT } from './constant';
import apiRouters from '../api/routers';
import ServerError from '../api/util/errors';
import { createServer } from 'http';

function runServer() {
  const app: express.Express = express();

  app.use(helmet());
  app.use(express.json());
  app.use(cors());

  app.use('/api', apiRouters);
  app.use(ServerError.middleware());

  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}

export default runServer;
