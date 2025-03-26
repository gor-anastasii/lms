import { Op, Sequelize } from 'sequelize';

import Course from '../models/CourseModel.js';
import Tag from '../models/TagModel.js';
import User from '../models/UserModel.js';
import Progress from '../models/ProgressModel.js';
import CoursePart from '../models/CoursePartModel.js';

export const getAllCourses = async (req, res) => {
  const userId = req.userId;
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: Tag,
          through: { attributes: [] },
        },
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Progress,
          where: { userId: userId },
          required: false,
          attributes: ['progress'],
        },
      ],
    });

    const coursesWithProgress = courses.map((course) => {
      const progressEntry = course.Progress ? course.Progress.progress : null;
      return {
        ...course.toJSON(),
        progress: progressEntry,
      };
    });
    res.status(200).json(coursesWithProgress);
  } catch (err) {
    console.error('Ошибка при получении данных о курсах: ', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const addCourse = async (req, res) => {
  const { title, description, teacherId, price, topic, status, imageUrl, averageRating } = req.body;

  try {
    const newCourse = await Course.create({
      title,
      description,
      teacherId,
      price,
      topic,
      status,
      imageUrl: imageUrl || null,
      averageRating,
    });

    return res.status(201).json(newCourse);
  } catch (error) {
    console.error('Ошибка при добавлении курса:', error);
    return res.status(500).json({ message: 'Ошибка при добавлении курса' });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await Course.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении курса:', error);
    return res.status(500).json({ message: 'Ошибка при удалении курса' });
  }
};

export const updateCourseStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status !== 'active' && status !== 'inactive') {
    return res
      .status(400)
      .json({ message: 'Недопустимое значение статуса. Допустимые значения: active, inactive.' });
  }

  try {
    const [updatedCount] = await Course.update({ status }, { where: { id } });

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    return res.status(200).json({ message: `Статус курса изменен на ${status}` });
  } catch (error) {
    console.error('Ошибка при изменении статуса курса:', error);
    return res.status(500).json({ message: 'Ошибка при изменении статуса курса' });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl, averageRating } = req.body;

  try {
    const [updatedCount] = await Course.update(
      {
        title,
        description,
        price,
        imageUrl: imageUrl || null,
        averageRating,
      },
      {
        where: { id },
      },
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    return res.status(200).json({ message: 'Курс обновлен' });
  } catch (error) {
    console.error('Ошибка при обновлении курса:', error);
    return res.status(500).json({ message: 'Ошибка при обновлении курса' });
  }
};

export const filterCourses = async (req, res) => {
  const { topic } = req.query;

  if (!topic) {
    return res.status(400).json({ message: 'Topic обязателен для фильтрации.' });
  }

  try {
    const courses = await Course.findAll({
      where: { topic },
      include: {
        model: Tag,
        through: { attributes: [] },
      },
    });
    res.status(200).json(courses);
  } catch (err) {
    console.error('Ошибка при фильтрации курсов: ', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const searchCourses = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Поисковый запрос обязателен.' });
  }

  try {
    const lowerQuery = query.toLowerCase();

    const courses = await Course.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
                [Op.like]: `%${lowerQuery}%`,
              }),
            ],
          },
          {
            id: {
              [Op.in]: Sequelize.literal(`(
                SELECT "courseId" FROM "CourseTags" WHERE "tagId" IN (
                  SELECT "id" FROM "Tags" WHERE LOWER(name) LIKE '%${lowerQuery}%'
                )
              )`),
            },
          },
        ],
      },
      include: {
        model: Tag,
        through: { attributes: [] },
      },
    });

    res.status(200).json(courses);
  } catch (err) {
    console.error('Ошибка при поиске курсов: ', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const getCourseDetails = async (req, res) => {
  const { courseId } = req.query;
  const userId = req.userId;

  try {
    const progressEntry = await Progress.findOne({
      where: { userId, courseId },
      attributes: ['progress', 'completedParts'],
    });

    const course = await Course.findOne({
      where: { id: courseId },
      include: [
        {
          model: CoursePart,
          where: { status: 'active' },
          order: [['order', 'ASC']],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    return res.status(200).json({
      course: course.toJSON(),
      progress: progressEntry
        ? {
            progress: progressEntry.progress,
            completedParts: progressEntry.completedParts,
          }
        : null,
    });
  } catch (error) {
    console.error('Ошибка при получении деталей курса:', error);
    return res.status(500).json({ message: 'Ошибка при получении деталей курса' });
  }
};

export const getCoursesWithSearchFilter = async (req, res) => {
  const userId = req.userId;
  const { query, topic } = req.query;

  try {
    const whereConditions = {
      ...(topic && { topic }),
      ...(query && {
        [Op.or]: [
          {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
                [Op.like]: `%${query.toLowerCase()}%`,
              }),
            ],
          },
          {
            id: {
              [Op.in]: Sequelize.literal(`(
                SELECT "courseId" FROM "CourseTags" WHERE "tagId" IN (
                  SELECT "id" FROM "Tags" WHERE LOWER(name) LIKE '%${query.toLowerCase()}%'
                )
              )`),
            },
          },
        ],
      }),
    };

    const courses = await Course.findAll({
      where: whereConditions,
      include: [
        {
          model: Tag,
          through: { attributes: [] },
        },
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Progress,
          where: { userId: userId },
          required: false,
          attributes: ['progress'],
        },
      ],
    });

    const coursesWithProgress = courses.map((course) => {
      const progressEntry = course.Progress ? course.Progress.progress : null;
      return {
        ...course.toJSON(),
        progress: progressEntry,
      };
    });

    res.status(200).json(coursesWithProgress);
  } catch (err) {
    console.error('Ошибка при получении данных о курсах: ', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};
