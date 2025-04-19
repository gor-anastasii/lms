import express from 'express';
import sequelize from './config/database.js';
import cloudinary from './config/cloudinary.js';
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
import courseRouter from './routes/courseRoutes.js';
import progressRouter from './routes/progressRoutes.js';
import coursePartRouter from './routes/coursePartRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import tagRouter from './routes/tagRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

Course.belongsToMany(Tag, { through: CourseTag, foreignKey: 'courseId' });
Tag.belongsToMany(Course, { through: CourseTag, foreignKey: 'tagId' });
Review.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Progress.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Progress.belongsTo(User, { foreignKey: 'userId' });
Progress.belongsTo(Course, { foreignKey: 'courseId' });

Course.belongsTo(User, { foreignKey: 'teacherId' });
Course.hasMany(Progress, { foreignKey: 'courseId' });
Course.hasMany(CoursePart, { foreignKey: 'courseId' });
Course.hasMany(Review, { foreignKey: 'courseId' });

dotenv.config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);

app.use(express.json());
app.use('/auth', authRouter);
app.use('/courses', courseRouter);
app.use('/progress', progressRouter);
app.use('/course-parts', coursePartRouter);
app.use('/review', reviewRouter);
app.use('/tags', tagRouter);

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
