import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5, max: 18 }),
];

export const reqisterValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5, max: 18 }),
  body('username', 'Имя должно содержать минимум 3 символа').isLength({ min: 3, max: 12 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const reviewCreateValidation = [
  body('rating', 'Неверный формат рейтинга').isFloat({ min: 0, max: 5 }),
  body('comment', 'Введите комментарий').notEmpty(),
];

export const updateCourseValidation = [
  body('title')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Название должно содержать минимум 3 символа'),
  body('description')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Описание должно содержать минимум 10 символов'),
  body('topic')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Тематика должна содержать минимум 3 символа'),
];
