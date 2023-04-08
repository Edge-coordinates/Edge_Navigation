// import express, { Request, Response } from 'express';
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './modules/core/routes/index'

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000/');
});
