import Course from '../models/CourseModel.js';
import CoursePart from '../models/CoursePartModel.js';
import Progress from '../models/ProgressModel.js';
import Tag from '../models/TagModel.js';
import User from '../models/UserModel.js';
import * as courseService from '../services/courseService.js';
import { Op, Sequelize } from 'sequelize';

export const getAllCourses = async (req, res) => {
  const userId = req.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = 8;
  const offset = (page - 1) * limit;

  try {
    const filteredCourses = await Course.findAll({
      where: { status: 'public' },
      include: [
        {
          model: CoursePart,
          where: { status: 'active' },
          required: false,
        },
      ],
    });

    const courses = await courseService.getAllCourses(userId, limit, offset);

    const totalCourses = filteredCourses.length;
    const totalPages = Math.ceil(totalCourses / limit);

    res.status(200).json({
      currentPage: page,
      totalPages,
      courses: courses,
    });
  } catch (err) {
    console.error('Ошибка при получении данных о курсах: ', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const getCourseById = async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.id;

  try {
    const course = await courseService.getCourseById(courseId, userId);

    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error('Ошибка при получении данных курса: ', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const getCourseDetails = async (req, res) => {
  const { courseId } = req.query;
  const userId = req.userId;

  try {
    const { course, progressEntry } = await courseService.getCourseDetails(courseId, userId);
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

export const getInProgressCourses = async (req, res) => {
  const userId = req.userId;
  const limit = 4;
  const { page = 1 } = req.query;

  try {
    const offset = (page - 1) * limit;
    const progresses = await Progress.findAll({
      where: {
        userId,
        progress: {
          [Op.lt]: 100,
        },
      },
      attributes: ['courseId'],
    });

    if (progresses.length === 0) {
      return res.status(200).json({
        courses: [],
        totalPages: 1,
      });
    }

    const courseIds = progresses.map((progress) => progress.courseId);

    const { count, rows: courses } = await Course.findAndCountAll({
      where: {
        status: 'public',
        id: courseIds,
      },
      include: [
        { model: Tag, through: { attributes: [] } },
        { model: User, attributes: ['username'] },
        {
          model: Progress,
          where: {
            userId,
            progress: {
              [Op.lt]: 100,
            },
          },
          required: false,
          attributes: ['progress'],
        },
        { model: CoursePart, where: { status: 'active' }, order: [['order', 'ASC']] },
      ],
      offset,
      limit: parseInt(limit),
      distinct: true,
    });

    return res.status(200).json({
      courses,
      totalPages: Math.ceil(count / limit),
      totalCount: count,
    });
  } catch (error) {
    console.error('Ошибка при получении незавершённых курсов:', error);
    return res.status(500).json({ message: 'Ошибка при получении незавершённых курсов' });
  }
};

export const getCompletedCourses = async (req, res) => {
  const userId = req.userId;
  const limit = 4;
  const { page = 1 } = req.query;

  try {
    const offset = (page - 1) * limit;

    const progresses = await Progress.findAll({
      where: {
        userId,
        progress: 100,
      },
      attributes: ['courseId'],
    });

    if (progresses.length === 0) {
      return res.status(200).json({
        courses: [],
        totalPages: 1,
      });
    }

    const courseIds = progresses.map((progress) => progress.courseId);

    const { count, rows: courses } = await Course.findAndCountAll({
      where: {
        status: 'public',
        id: courseIds,
      },
      include: [
        { model: Tag, through: { attributes: [] } },
        { model: User, attributes: ['username'] },
        {
          model: Progress,
          where: {
            userId,
            progress: 100,
          },
          required: false,
          attributes: ['progress'],
        },
        { model: CoursePart, where: { status: 'active' }, order: [['order', 'ASC']] },
      ],
      offset,
      limit: parseInt(limit),
      distinct: true,
    });

    return res.status(200).json({
      courses,
      totalPages: Math.ceil(count / limit),
      totalCount: count,
    });
  } catch (error) {
    console.error('Ошибка при получении завершённых курсов:', error);
    return res.status(500).json({ message: 'Ошибка при получении завершённых курсов' });
  }
};

export const getCoursesWithSearchFilter = async (req, res) => {
  const userId = req.userId;
  const { query, topic } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 8;
  const offset = (page - 1) * limit;

  try {
    // Упрощаем условия фильтрации
    const whereConditions = {
      ...(topic && topic !== 'Все' && { topic }), // Фильтрация по теме, если указана
      ...(query &&
        query.trim() !== '' && {
          // Если query не пустое, фильтруем по названию или тегам
          [Op.or]: [
            {
              [Op.and]: [
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Course.title')), {
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
      status: 'public', // Только публичные курсы
    };

    // Логируем условия для отладки
    console.log('Search conditions:', whereConditions);

    const { count, rows } = await Course.findAndCountAll({
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
        { model: CoursePart, where: { status: 'active' }, order: [['order', 'ASC']] },
      ],
      limit,
      offset,
      distinct: true,
      order: [
        ['averageRating', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });

    // Если курсов меньше, чем лимит, проверяем пагинацию
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      courses: rows,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error('Ошибка при получении данных о курсах: ', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const getCoursesByTeacher = async (req, res) => {
  const teacherId = req.userId;
  const limit = 5;
  const { page = 1, search = '' } = req.query;

  try {
    const offset = (page - 1) * limit;

    const totalCount = await Course.count({
      where: {
        teacherId,
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });

    const courses = await courseService.getCoursesByTeacher(teacherId, offset, limit, search);
    const courseWithSubscriberCount = await courseService.countSubscribersForCourses(courses);

    res.status(200).json({
      courses: courseWithSubscriberCount,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error('Ошибка при получении курсов пользователя: ', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const createTeacherCourse = async (req, res) => {
  const teacherId = req.userId;
  const { title } = req.body;

  if (!teacherId || !title) {
    return res.status(400).json({ message: 'teacherId и title обязательны' });
  }

  try {
    const newCourse = await courseService.createTeacherCourse(teacherId, title);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Ошибка при создании курса:', error);
    res.status(500).json({ message: 'Ошибка при создании курса' });
  }
};

export const updateTextFields = async (req, res) => {
  const teacherId = req.userId;
  const { id } = req.params;
  const { title, description, topic } = req.body;

  try {
    const updatedCourse = await courseService.updateTextFields(id, teacherId, {
      title,
      description,
      topic,
    });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    const course = await courseService.getCoursesByTeacherAfterUpdate(teacherId, id);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error('Ошибка при обновлении курса:', error);
    return res.status(500).json({ message: 'Ошибка при обновлении курса' });
  }
};

export const linkTagsToCourse = async (req, res) => {
  const { id } = req.params;
  const teacherId = req.userId;
  const { tagIds } = req.body;

  if (!id || !Array.isArray(tagIds)) {
    return res.status(400).json({ message: 'Необходимы courseId и массив tagIds' });
  }

  try {
    const updatedCourse = await courseService.linkTagsToCourse(id, teacherId, tagIds);

    const course = await courseService.getCoursesByTeacherAfterUpdate(teacherId, id);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error('Ошибка при связывании тегов с курсом:', error);
    res.status(500).json({ message: 'Ошибка при связывании тегов с курсом' });
  }
};

export const updateCourseImageUpload = async (req, res) => {
  const userId = req.userId;
  const { id } = req.query;

  try {
    const course = await courseService.findCourseByIdAndUser(id, userId);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    if (req.file && req.file.path) {
      const imageUrl = await courseService.updateCourseImageUrl(course, req.file.path);

      return res.status(200).json({
        message: 'Изображение курса успешно обновлено',
        imageUrl,
      });
    }

    res.status(400).json({ message: 'Файл изображения не предоставлен' });
  } catch (err) {
    console.error(`Ошибка при загрузке изображения курса: ${err}`);
    res.status(500).json({ message: 'Ошибка при загрузке изображения курса' });
  }
};

export const updateCourseImage = async (req, res) => {
  const userId = req.userId;
  const { id } = req.query;
  const { imageUrl } = req.body;

  try {
    const course = await courseService.findCourseByIdAndUser(id, userId);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    if (imageUrl && typeof imageUrl === 'string') {
      const updatedUrl = await courseService.updateCourseImageUrl(course, imageUrl);

      return res.status(200).json({
        message: 'Ссылка на изображение курса успешно сохранена',
        imageUrl: updatedUrl,
      });
    }

    res.status(400).json({ message: 'Неверный формат ссылки на изображение' });
  } catch (err) {
    console.error(`Ошибка при обновлении ссылки на изображение: ${err}`);
    res.status(500).json({ message: 'Ошибка при обновлении изображения курса' });
  }
};

export const deleteCourseImageUrl = async (req, res) => {
  const userId = req.userId;
  const { id } = req.query;

  try {
    const course = await courseService.findCourseByIdAndUser(id, userId);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    if (!course.imageUrl) {
      return res.status(400).json({ message: 'Изображение отсутствует для удаления' });
    }

    await courseService.deleteCourseImageUrl(course);

    res.status(200).json({
      message: 'Ссылка на изображение курса успешно удалена',
      imageUrl: course.imageUrl,
    });
  } catch (err) {
    console.error(`Ошибка при удалении изображения: ${err}`);
    res.status(500).json({ message: 'Ошибка при удалении изображени' });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const course = await courseService.findCourseById(id);

    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    if (course.teacherId !== userId) {
      return res.status(403).json({ message: 'У вас нет прав для удаления этого курса' });
    }

    await courseService.deleteCourseAndRelatedData(id);

    return res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении курса:', error);
    return res.status(500).json({ message: 'Ошибка при удалении курса' });
  }
};

export const updateCoursePublishedStatus = async (req, res) => {
  const teacherId = req.userId;
  const { id } = req.params;
  const { published } = req.body;

  const allowedStatuses = ['draft', 'published', 'unpublished'];

  if (!allowedStatuses.includes(published)) {
    return res.status(400).json({
      message: `Недопустимое значение. Допустимые значения: ${allowedStatuses.join(', ')}`,
    });
  }

  try {
    const course = await courseService.findCourseById(id);

    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    if (course.teacherId !== teacherId) {
      return res.status(403).json({ message: 'У вас нет прав изменять этот курс' });
    }

    await courseService.updatePublishedStatus(course, published);

    const courseUpdated = await courseService.getCoursesByTeacherAfterUpdate(teacherId, id);
    if (!courseUpdated) {
      return res.status(404).json({ message: 'Курс не найден' });
    }
    return res.status(200).json(courseUpdated);
  } catch (err) {
    console.error('Ошибка при обновлении статуса опубликованности курса:', err);
    res.status(500).json({ message: 'Ошибка при обновлении статуса опубликованности курса' });
  }
};

export const updateCourseStatus = async (req, res) => {
  const teacherId = req.userId;
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['public', 'private'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: `Недопустимое значение. Допустимые значения: ${allowedStatuses.join(', ')}`,
    });
  }

  try {
    const course = await courseService.findCourseById(id);

    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    if (course.teacherId !== teacherId) {
      return res.status(403).json({ message: 'У вас нет прав изменять этот курс' });
    }

    await courseService.updateStatus(course, status);

    const courseUpdated = await courseService.getCoursesByTeacherAfterUpdate(teacherId, id);
    if (!courseUpdated) {
      return res.status(404).json({ message: 'Курс не найден' });
    }
    return res.status(200).json(courseUpdated);
  } catch (err) {
    console.error('Ошибка при обновлении статуса курса:', err);
    res.status(500).json({ message: 'Ошибка при обновлении статуса курса' });
  }
};

export const getTeacherCourseStatistics = async (req, res) => {
  const teacherId = req.userId;

  try {
    // Получаем все курсы учителя
    const courses = await courseService.getCoursesByTeacherForAnalytic(teacherId);

    // Считаем статистику
    const totalCourses = courses.length;
    const publicCourses = courses.filter((course) => course.status === 'public').length;
    const privateCourses = courses.filter((course) => course.status === 'private').length;

    // Получаем самый популярный курс
    const popularCourse = await Promise.all(
      courses.map(async (course) => {
        const progressCount = await courseService.countProgressByCourseId(course.id);
        return { title: course.title, progressCount };
      }),
    );

    const mostPopularCourse = popularCourse.reduce((prev, current) =>
      prev.progressCount > current.progressCount ? prev : current,
    );

    // Получаем курс с самым высоким рейтингом
    const highestRatedCourse = courses.reduce((prev, current) =>
      prev.averageRating > current.averageRating ? prev : current,
    );

    // Считаем общее количество подписчиков и завершивших курсы
    const totalSubscribers = await Promise.all(
      courses.map((course) => courseService.countProgressByCourseId(course.id)),
    );

    const totalSubscribersCount = totalSubscribers.reduce((a, b) => a + b, 0);
    const completedStudentsCount = await Promise.all(
      courses.map((course) => courseService.countCompletedStudentsByCourseId(course.id)),
    );
    const totalCompletedStudents = completedStudentsCount.reduce((a, b) => a + b, 0);

    // Считаем количество отзывов на курсы
    const totalReviewsCount = await Promise.all(
      courses.map((course) => courseService.countReviewsByCourseId(course.id)),
    );
    const totalReviews = totalReviewsCount.reduce((a, b) => a + b, 0);

    // Средний рейтинг по всем курсам
    const avgRating = courses.length
      ? courses.reduce((sum, c) => sum + c.averageRating, 0) / courses.length
      : 0;

    // Получение всех частей курсов
    const allCourseParts = await Promise.all(
      courses.map((course) => courseService.countPartsByCourseId(course.id)),
    );
    const totalCourseParts = allCourseParts.reduce((a, b) => a + b, 0);
    const averagePartsPerCourse = courses.length ? totalCourseParts / courses.length : 0;

    // Средний процент завершения
    const allProgresses = await Promise.all(
      courses.map((course) => courseService.getProgressByCourseId(course.id)),
    );
    const flatProgresses = allProgresses.flat();
    const averageCompletion = flatProgresses.length
      ? flatProgresses.reduce((sum, p) => sum + p.progress, 0) / flatProgresses.length
      : 0;

    // Уникальные студенты
    const uniqueStudentIds = new Set(flatProgresses.map((p) => p.userId));
    const totalUniqueStudents = uniqueStudentIds.size;

    const categoryCounts = {};

    courses.forEach((course) => {
      if (course.status === 'public') {
        const category = course.topic; // предполагается, что категория — это строка
        if (categoryCounts[category]) {
          categoryCounts[category]++;
        } else {
          categoryCounts[category] = 1;
        }
      }
    });

    const categoryData = Object.keys(categoryCounts).map((category) => ({
      name: category,
      value: categoryCounts[category],
      percentage: courses.length ? (categoryCounts[category] / courses.length) * 100 : 0,
    }));

    // Формируем ответ
    res.status(200).json({
      totalCourses,
      categoryData,
      publicCourses,
      privateCourses,
      mostPopularCourse: mostPopularCourse.title,
      highestRatedCourse: highestRatedCourse.title,
      totalSubscribers: totalSubscribersCount,
      totalCompletedStudents,
      totalReviews,
      averageRating: avgRating.toFixed(2),
      totalCourseParts,
      averagePartsPerCourse: averagePartsPerCourse.toFixed(1),
      averageCompletion: averageCompletion.toFixed(1),
      totalUniqueStudents,
    });
  } catch (error) {
    console.error('Ошибка при получении статистики курсов:', error);
    res.status(500).json({ message: 'Ошибка при получении статистики курсов' });
  }
};

export const getAllCoursesForAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 3;
  const offset = (page - 1) * limit;
  const search = req.query.search || '';

  try {
    const whereClause = {
      [Op.and]: [
        {
          published: {
            [Op.in]: ['published', 'blocked'],
          },
        },
      ],
    };

    if (search.trim()) {
      whereClause[Op.and].push({
        title: {
          [Op.iLike]: `%${search.trim()}%`,
        },
      });
    }

    const { count, rows } = await Course.findAndCountAll({
      attributes: ['id', 'title', 'imageUrl', 'averageRating', 'published'],
      where: whereClause,
      order: [['averageRating', 'DESC']],
      limit,
      offset,
      raw: true,
    });

    const subscriberCounts = await Progress.findAll({
      attributes: ['courseId', [Sequelize.fn('COUNT', Sequelize.col('id')), 'subscriberCount']],
      group: ['courseId'],
      raw: true,
    });

    const subscriberCountMap = subscriberCounts.reduce((acc, curr) => {
      acc[curr.courseId] = parseInt(curr.subscriberCount);
      return acc;
    }, {});

    const formattedCourses = rows.map((course) => ({
      id: course.id,
      title: course.title,
      imageUrl: course.imageUrl,
      averageRating: course.averageRating,
      published: course.published,
      subscriberCount: subscriberCountMap[course.id] || 0,
    }));

    res.status(200).json({
      courses: formattedCourses,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('Ошибка при получении курсов для администратора:', error);
    res.status(500).json({ message: 'Ошибка при получении курсов для администратора' });
  }
};

export const blockedCourse = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const user = await User.findOne({ where: { id: userId } });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен.' });
    }

    const course = await Course.findOne({ where: { id: id } });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.published = course.published === 'blocked' ? 'published' : 'blocked';
    course.status = course.published === 'blocked' ? 'private' : 'public';
    await course.save();

    res.json({ message: 'Course status updated', course });
  } catch (error) {
    console.error('Error toggling course status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
