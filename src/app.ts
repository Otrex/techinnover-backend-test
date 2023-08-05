import express from 'express';
import GeneralMiddleware from './middlewares';
import config from './config';


const app = express();

app.set('trust proxy', true);

app.use(GeneralMiddleware.CORS);
app.use(GeneralMiddleware.DevLogs);
app.use(GeneralMiddleware.RateLimiting);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use('/static', express.static(config.app.staticFilePath));

app.use(GeneralMiddleware.NotFoundHandler);
app.use(GeneralMiddleware.ErrorHandler);

export default app;
