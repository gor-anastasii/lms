import express from 'express';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';

import User from './models/UserModel.js';
import Course from './models/CourseModel.js';
import CoursePart from './models/CoursePartModel.js';
import Progress from './models/ProgressModel.js';
import Tag from './models/TagModel.js';
import CourseTag from './models/CourseTagsModel.js';
import Review from './models/ReviewModel.js';

import authRouter from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (req, res) => res.send({ msg: 'hello from server' }));

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('База данных синхронизирована!');
  } catch (error) {
    console.error('Ошибка при синхронизации базы данных:', error);
  }
};

syncDatabase();
app.listen(PORT, (err) => {
  console.log(err ? `Error: ${err}` : 'Server has been started!');
});
