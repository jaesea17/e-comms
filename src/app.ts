import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './config/database.config';
import cors from 'cors';

import viewsRouter from './routes/viewsRoute';
import indexRouter from './routes/indexRoute';
import productRouter from './routes/productRoute';
import todosRouter from './routes/todos';
import userRouter from './routes/userRoute';

//db.sync({force:true})--- to clear the database
db.sync().then(() => {
  console.log('connected successfully, on port:')
})

export const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/', indexRouter);
app.use('/user', viewsRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/todos', todosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: createError.HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
