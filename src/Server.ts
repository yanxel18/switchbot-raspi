import morgan from 'morgan'; 
import helmet from 'helmet';
import pressRoutes from './route/route';
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import logger from 'jet-logger';
import cors from 'cors';
const app = express();
const { BAD_REQUEST } = StatusCodes;
const router = express.Router();
app.set('etag', false);
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors());
app.disable('x-powered-by');
app.use(function (Request, Response, NextFunction) {
    Response.header("Access-Control-Allow-Origin", "*");
    Response.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    Response.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    NextFunction();
});

 
if (process.env.NODE_ENV === 'development') {
    app.use(helmet());
}
 
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', pressRoutes);
app.use('/', router);
 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});
router.get('*', (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json(JSON.parse(`{"result":"Page not found! 404"}`));
}); 
export default app;
