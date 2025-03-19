import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5, max: 10 }),
];

export const reqisterValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5, max: 10 }),
  body('username', 'Имя должно содержать минимум 3 символа').isLength({ min: 3, max: 12 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const reviewCreateValidation = [
  body('rating', 'Неверный формат рейтинга').isFloat({ min: 0, max: 5 }),
  body('comment', 'Введите комментарий').notEmpty(),
];

// export const postCreateValidation = [
//     body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
//     body('text', 'Введите тест статьи').isLength({min: 3}).isString(),
//     body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
//     body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
// ]
