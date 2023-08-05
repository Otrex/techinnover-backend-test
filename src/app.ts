import express from 'express';
import GeneralMiddleware from './middleware';
import config from './config';
import Routes from './routes';


const app = express();

app.use(GeneralMiddleware.CORS);
app.use(GeneralMiddleware.DevLogs);
app.use(GeneralMiddleware.RateLimiting);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api", Routes)

app.use('/static', express.static(config.app.staticFilePath));

app.use(GeneralMiddleware.NotFoundHandler);
app.use(GeneralMiddleware.ErrorHandler);

export default app;
