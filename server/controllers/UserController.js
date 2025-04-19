import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';

export const register = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).json({
        message: 'Такой пользователь уже существует.',
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'student',
      imageUrl: req.body.image_url || '/img/default-user.svg',
    });

    const token = jwt.sign({ _id: newUser.id, _role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('Пользователь зарегистрирован: ', newUser.email);
    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      userId: newUser.id,
      token: token,
      role: newUser.role,
    });
  } catch (err) {
    console.error(`Ошибка при регистрации пользователя: ${err}`);
    res.status(500).json({
      message: 'Ошибка при регистрации пользователя',
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Неверные учетные данные' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Неверные учетные данные' });

    const token = jwt.sign({ _id: user.id, _role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('Пользователь вошел: ', user.email);
    //res.set('Authorization', `Bearer ${token}`);
    res.status(200).json({
      user: { id: user.id, email: user.email, role: user.role },
      token: token,
      message: 'Успешный вход',
    });
  } catch (err) {
    console.error(`Ошибка при авторизации пользователя: ${err}`);
    res.status(500).json({ message: 'Ошибка при авторизации пользователя' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });

    if (!user) {
      return res.status(400).json({
        message: 'Пользователь не найден',
      });
    }

    const { password, ...userData } = user.dataValues;

    console.log('Пользователь получает данные: ', user.email);
    res.json({ userData, token: req.token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.userId;

  try {
    const deletedUser = await User.destroy({ where: { id: userId } });

    if (!deletedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json({ message: 'Пользователь и его данные успешно удалены' });
  } catch (err) {
    console.error(`Ошибка при удалении пользователя: ${err}`);
    res.status(500).json({ message: 'Ошибка при удалении пользователя' });
  }
};

export const updateUsername = async (req, res) => {
  const userId = req.userId;
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.username = username;
    await user.save();

    console.log('Имя пользователя обновлено: ', user.email);
    res
      .status(200)
      .json({ message: 'Имя пользователя успешно обновлено', username: user.username });
  } catch (err) {
    console.error(`Ошибка при обновлении имени пользователя: ${err}`);
    res.status(500).json({ message: 'Ошибка при обновлении имени пользователя' });
  }
};

export const updateProfileImage = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (req.file) {
      user.imageUrl = req.file.path;
    }

    await user.save();

    console.log('Изображение профиля обновлено: ', user.email);
    res
      .status(200)
      .json({ message: 'Изображение профиля успешно обновлено', imageUrl: user.imageUrl });
  } catch (err) {
    console.error(`Ошибка при обновлении изображения профиля: ${err}`);
    res.status(500).json({ message: 'Ошибка при обновлении изображения профиля' });
  }
};

export const deleteProfileImage = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.imageUrl = '/img/default-user.svg';
    await user.save();

    console.log('Изображение профиля обновлено: ', user.email);
    res
      .status(200)
      .json({ message: 'Изображение профиля успешно удалено', imageUrl: user.imageUrl });
  } catch (err) {
    console.error(`Ошибка при обновлении изображения профиля: ${err}`);
    res.status(500).json({ message: 'Ошибка при обновлении изображения профиля' });
  }
};
