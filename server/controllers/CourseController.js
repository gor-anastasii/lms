import * as courseService from '../services/courseService.js';

export const getAllCourses = async (req, res) => {
  const userId = req.userId;
  try {
    const courses = await courseService.getAllCourses(userId);
    const coursesWithProgress = courses.map((course) => {
      const progressEntry = course.Progress ? course.Progress.progress : null;
      return { ...course.toJSON(), progress: progressEntry };
    });
    res.status(200).json(coursesWithProgress);
  } catch (err) {
    console.error('Ошибка при получении данных о курсах: ', err);
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

export const getCoursesWithSearchFilter = async (req, res) => {
  const userId = req.userId;
  const { query, topic } = req.query;

  try {
    const courses = await courseService.getCoursesWithSearchFilter(query, topic, userId);
    const coursesWithProgress = courses.map((course) => {
      const progressEntry = course.Progress ? course.Progress.progress : null;
      return { ...course.toJSON(), progress: progressEntry };
    });
    res.status(200).json(coursesWithProgress);
  } catch (err) {
    console.error('Ошибка при получении данных о курсах: ', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const getCoursesByTeacher = async (req, res) => {
  const teacherId = req.userId;

  try {
    const courses = await courseService.getCoursesByTeacher(teacherId);
    res.status(200).json(courses);
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
