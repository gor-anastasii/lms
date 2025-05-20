import * as courseService from '../services/courseService.js';
import * as coursePartService from '../services/coursePartService.js';

import Course from '../models/CourseModel.js';
import Progress from '../models/ProgressModel.js';
import CoursePart from '../models/CoursePartModel.js';
import { convertToEmbedUrl, isValidImageUrl, isValidYouTubeUrl } from '../utils/validUrl.js';

export const getCourseParts = async (req, res) => {
  const { courseId } = req.query;

  try {
    const courseParts = await CoursePart.findAll({
      where: { courseId },
      order: [['order', 'ASC']],
    });

    if (!courseParts.length) {
      return res.status(404).json({ message: 'Части курса не найдены.' });
    }

    return res.status(200).json(courseParts);
  } catch (error) {
    console.error('Ошибка при получении частей курса:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const createTeacherCoursePart = async (req, res) => {
  const teacherId = req.userId;
  const { title } = req.body;
  const { id } = req.query;

  if (!teacherId || !title || !id) {
    return res.status(400).json({ message: 'teacherId, courseId и title обязательны' });
  }

  try {
    await coursePartService.createTeacherCoursePart(id, title, teacherId);

    const course = await courseService.getCoursesByTeacherAfterUpdate(teacherId, id);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error('Ошибка при создании раздела курса:', error);
    res.status(500).json({ message: 'Ошибка при создании раздела курса' });
  }
};

export const deleteCoursePart = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const coursePart = await CoursePart.findOne({ where: { id } });

    if (!coursePart) {
      return res.status(404).json({ message: 'Раздел курса не найден' });
    }

    const course = await Course.findOne({ where: { id: coursePart.courseId } });

    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    if (course.teacherId !== userId) {
      return res.status(403).json({ message: 'У вас нет прав для удаления этого раздела курса' });
    }

    await coursePartService.deleteCoursePart(id);

    return res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении раздела курса:', error);
    return res.status(500).json({ message: 'Ошибка при удалении раздела курса' });
  }
};

export const updateCoursePartsOrder = async (req, res) => {
  const { courseId } = req.params;
  const { parts } = req.body;

  try {
    if (!Array.isArray(parts) || parts.length === 0) {
      return res.status(400).json({ message: 'Некорректные данные' });
    }

    // Получаем текущие главы курса
    const existingParts = await CoursePart.findAll({
      where: { courseId },
      attributes: ['id', 'order'],
    });

    // Создаем мапу: order -> id и id -> order
    const idToOldOrder = {};
    existingParts.forEach((part) => {
      idToOldOrder[part.id] = part.order;
    });

    // Получаем все прогрессы по этому курсу
    const progresses = await Progress.findAll({ where: { courseId } });

    // Обновляем порядок глав
    const updatePromises = parts.map((part) => {
      return CoursePart.update({ order: part.order }, { where: { id: part.id, courseId } });
    });

    await Promise.all(updatePromises);

    // Обновляем completedParts для всех пользователей
    const oldOrderToId = Object.fromEntries(
      Object.entries(idToOldOrder).map(([id, order]) => [order, id]),
    );

    // Мапа нового порядка: id -> newOrder
    const idToNewOrder = {};
    parts.forEach((part) => {
      idToNewOrder[part.id] = part.order;
    });

    const progressUpdatePromises = progresses.map(async (progress) => {
      const oldCompletedOrders = progress.completedParts || [];

      // Определяем, какие id глав были пройдены
      const completedPartIds = oldCompletedOrders.map((oldOrder) => oldOrderToId[oldOrder]);

      // Определяем новые order этих глав
      const newCompletedOrders = completedPartIds
        .map((id) => idToNewOrder[id])
        .filter((newOrder) => newOrder !== undefined);

      return progress.update({ completedParts: newCompletedOrders });
    });

    await Promise.all(progressUpdatePromises);

    return res.status(200).json({ message: 'Порядок глав и прогресс обновлены' });
  } catch (error) {
    console.error('Ошибка при обновлении порядка глав:', error);
    return res.status(500).json({ message: 'Ошибка при обновлении порядка глав' });
  }
};

export const updateTextFields = async (req, res) => {
  const teacherId = req.userId;
  const { courseId, id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedCoursePart = await coursePartService.updateTextFields(id, teacherId, {
      title,
      description,
    });
    if (!updatedCoursePart) {
      return res.status(404).json({ message: 'Раздел не найден' });
    }

    const course = await courseService.getCoursesByTeacherAfterUpdate(teacherId, courseId);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error('Ошибка при обновлении раздела курса:', error);
    return res.status(500).json({ message: 'Ошибка при обновлении раздела курса' });
  }
};

export const updateCoursePartImageUpload = async (req, res) => {
  const userId = req.userId;
  const { id } = req.query;

  try {
    const coursePart = await coursePartService.findCoursePartById(id);
    if (!coursePart) {
      return res.status(404).json({ message: 'Раздел курса не найден' });
    }

    if (req.file && req.file.path) {
      const imageUrl = await coursePartService.updateCoursePartImageUrl(coursePart, req.file.path);

      return res.status(200).json({
        message: 'Изображение курса успешно обновлено',
        imageUrl,
      });
    }

    res.status(400).json({ message: 'Файл изображения не предоставлен' });
  } catch (err) {
    console.error(`Ошибка при загрузке изображения раздела курса: ${err}`);
    res.status(500).json({ message: 'Ошибка при загрузке изображения раздела курса' });
  }
};

export const updateCoursePartImage = async (req, res) => {
  const userId = req.userId;
  const { id } = req.query;
  const { imageUrl, type } = req.body;

  try {
    const coursePart = await coursePartService.findCoursePartById(id);
    if (!coursePart) {
      return res.status(404).json({ message: 'Раздел курса не найден' });
    }

    if (imageUrl && typeof imageUrl === 'string') {
      let updatedUrl;

      if (type === 'video') {
        if (!isValidYouTubeUrl(imageUrl)) {
          return res.status(400).json({ message: 'Неверная ссылка на видео' });
        }
        updatedUrl = convertToEmbedUrl(imageUrl);
      } else if (type === 'image') {
        updatedUrl = imageUrl;
      } else {
        return res.status(400).json({ message: 'Неверный тип медиа' });
      }

      const newMediaUrl = await coursePartService.updateCoursePartImageUrl(coursePart, updatedUrl);
      return res.status(200).json({
        message: 'Ссылка на изображение или видео раздела курса успешно сохранена',
        mediaUrl: newMediaUrl,
      });
    }

    res.status(400).json({ message: 'Неверный формат ссылки на изображение или видео' });
  } catch (err) {
    console.error(`Ошибка при обновлении ссылки на изображение: ${err}`);
    res.status(500).json({ message: 'Ошибка при обновлении изображения раздела курса' });
  }
};

export const deleteCoursePartMediaUrl = async (req, res) => {
  const userId = req.userId;
  const { id } = req.query;

  try {
    const coursePart = await coursePartService.findCoursePartById(id);
    if (!coursePart) {
      return res.status(404).json({ message: 'Раздел курс не найден' });
    }

    if (!coursePart.mediaUrl) {
      return res.status(400).json({ message: 'Изображение отсутствует для удаления' });
    }

    await coursePartService.deleteCoursePartMediaUrl(coursePart);

    res.status(200).json({
      message: 'Ссылка на изображение раздела курса успешно удалена',
      imageUrl: coursePart.mediaUrl,
    });
  } catch (err) {
    console.error(`Ошибка при удалении изображения: ${err}`);
    res.status(500).json({ message: 'Ошибка при удалении изображени' });
  }
};

export const updateCoursePartStatus = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { status } = req.body;

  if (!['active', 'inactive'].includes(status)) {
    return res
      .status(400)
      .json({ message: 'Недопустимый статус. Используйте "active" или "inactive"' });
  }

  try {
    const coursePart = await coursePartService.findCoursePartById(id);
    if (!coursePart) {
      return res.status(404).json({ message: 'Раздел курса не найден' });
    }

    const course = await Course.findOne({ where: { id: coursePart.courseId } });
    if (!course || course.teacherId !== userId) {
      return res.status(403).json({ message: 'Нет доступа к изменению этого раздела' });
    }

    // Сохраняем старый статус для проверки
    const oldStatus = coursePart.status;

    // Обновляем статус раздела
    await coursePart.update({ status });

    // Если статус изменился на 'inactive', обновляем прогресс
    if (oldStatus === 'active' && status === 'inactive') {
      const progressRecords = await Progress.findAll({ where: { courseId: course.id } });

      for (const progress of progressRecords) {
        // Убираем текущий раздел из completedParts, если он был завершен
        progress.completedParts = progress.completedParts.filter(
          (part) => part !== coursePart.order,
        );

        const totalParts = await CoursePart.count({
          where: { courseId: course.id, status: 'active' },
        });
        const completedPartsCount = progress.completedParts.length;

        // Пересчитываем прогресс
        progress.progress = Math.round((completedPartsCount / totalParts) * 100);
        await progress.save();
      }
    }

    // Если статус изменился на 'active', пересчитываем прогресс
    if (oldStatus === 'inactive' && status === 'active') {
      const progressRecords = await Progress.findAll({ where: { courseId: course.id } });

      for (const progress of progressRecords) {
        // Проверяем, если раздел добавляется в completedParts
        if (!progress.completedParts.includes(coursePart.order)) {
          progress.completedParts.push(coursePart.order);
        }

        const totalParts = await CoursePart.count({
          where: { courseId: course.id, status: 'active' },
        });
        const completedPartsCount = progress.completedParts.length;

        // Пересчитываем прогресс
        progress.progress = Math.round((completedPartsCount / totalParts) * 100);
        await progress.save();
      }
    }

    return res.status(200).json({ message: 'Статус раздела успешно обновлён', status, partId: id });
  } catch (error) {
    console.error('Ошибка при обновлении статуса раздела:', error);
    return res.status(500).json({ message: 'Ошибка при обновлении статуса раздела' });
  }
};
