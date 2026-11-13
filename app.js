import express from "express";
import path from 'path';
import { indexRouter } from "./routes/indexRouter.js";
import { itemsRouter } from "./routes/itemsRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/items', itemsRouter);

app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  
  res.status(statusCode).render('error', { 
    title: `Error ${statusCode}`, 
    message: err.message
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
