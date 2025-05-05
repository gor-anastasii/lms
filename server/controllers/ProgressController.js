import Progress from '../models/ProgressModel.js';
import CoursePart from '../models/CoursePartModel.js';

export const subscribeToCourse = async (req, res) => {
  const userId = req.userId;
  const courseId = req.query.courseId;

  try {
    const existingProgress = await Progress.findOne({
      where: { userId, courseId },
    });

    if (existingProgress) {
      return res.status(400).json({ message: 'Вы уже подписаны на этот курс.' });
    }

    const progress = await Progress.create({
      userId,
      courseId,
      progress: 0,
      completedParts: [],
    });

    return res.status(201).json(progress);
  } catch (error) {
    console.error('Ошибка при подписке на курс:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const updateProgress = async (req, res) => {
  const userId = req.userId;
  const { courseId, currentPartOrder } = req.body;

  try {
    const existingProgress = await Progress.findOne({
      where: { userId, courseId },
    });

    if (!existingProgress) {
      return res.status(404).json({ message: 'Запись о прогрессе не найдена.' });
    }

    if (!existingProgress.completedParts) {
      existingProgress.completedParts = [];
    }

    if (!existingProgress.completedParts.includes(currentPartOrder)) {
      existingProgress.completedParts = [...existingProgress.completedParts, currentPartOrder];
    }

    const totalParts = await CoursePart.count({ where: { courseId, status: 'active' } });
    const completedPartsCount = existingProgress.completedParts.length;

    existingProgress.progress = Math.round((completedPartsCount / totalParts) * 100);

    await existingProgress.save();

    return res.status(200).json(existingProgress);
  } catch (error) {
    console.error('Ошибка при обновлении прогресса:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getTotalProgress = async (req, res) => {
  const userId = req.userId;

  try {
    const progressRecords = await Progress.findAll({
      where: { userId },
    });

    if (!progressRecords.length) {
      return res.status(404).json({ message: 'Нет записей о прогрессе для данного пользователя.' });
    }

    const totalCourses = progressRecords.length;
    const totalProgress = progressRecords.reduce((sum, record) => sum + record.progress, 0);
    const averageProgress = totalProgress / totalCourses;

    const percentageProgress = Math.round((averageProgress / 100) * 100);

    return res.status(200).json({
      totalCourses,
      averageProgress,
      percentageProgress,
    });
  } catch (error) {
    console.error('Ошибка при получении общего прогресса:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getProgressForCourses = async (req, res) => {
  const userId = req.body;
  try {
    const progressPerCourse = await Progress.findOne({
      where: { userId },
    });

    if (!progressPerCourse) {
      return res.status(404).json({ message: 'Запись о прогрессе пользователя не найдена' });
    }

    return res.status(200).json({
      progress: progressPerCourse,
    });
  } catch (err) {
    console.error('Ошибка при получении прогресса:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getCourseStatus = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const progressRecord = await Progress.findOne({
      where: { userId, courseId },
    });

    const courseParts = await CoursePart.findAll({
      where: { courseId },
      order: [['order', 'ASC']],
    });

    if (!progressRecord) {
      return res.status(404).json({ message: 'Запись о прогрессе не найдена.' });
    }

    const completedParts = progressRecord.completedParts || [];
    const currentPartOrder = completedParts[completedParts.length - 1] || null;

    const remainingParts = courseParts.filter((part) => !completedParts.includes(part.order));

    return res.status(200).json({
      completedParts,
      currentPartOrder,
      remainingParts,
    });
  } catch (error) {
    console.error('Ошибка при получении статуса курса:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
