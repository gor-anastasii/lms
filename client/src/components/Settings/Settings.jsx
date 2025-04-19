import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsImgPopup from './SettingsImgPopup';
import SettingsDelPopup from './SettingsDelPopup';
import { formatDateTime } from '../../utils/formatDate';
import { deleteUserAccount, updateUsernameFunc } from '../../redux/slices/authSlice';
import { validateUsername } from '../../utils/validations';

const Settings = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isImgPopupVisible, setIsImgPopupVisible] = React.useState(false);
  const [isDelPopupVisible, setIsDelPopupVisible] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState('');
  const [nameValueInput, setNameValueInput] = React.useState(user.username);
  console.log(user);

  const handleInput = (e) => {
    setNameValueInput(e.target.value);
  };

  const handleDeleteUser = async () => {
    try {
      await dispatch(deleteUserAccount(token));
      setIsDelPopupVisible(false);
    } catch (error) {
      console.error('Ошибка при удалении аккаунта:', error);
    }
  };

  const handleSaveUsername = async () => {
    setUsernameError('');
    const usernameValidation = validateUsername(nameValueInput);

    if (usernameValidation !== true) {
      setUsernameError(usernameValidation);
      return;
    }

    try {
      await dispatch(updateUsernameFunc({ token, username: nameValueInput }));
    } catch (error) {
      console.error('Ошибка при обновлении имени пользователя:', error);
    }
  };

  return (
    <>
      <div className="settings-container">
        <h2>Общие настройки</h2>

        <h3>Информация об аккаунте</h3>
        <p>Последнее обновление от {formatDateTime(user.updatedAt)}</p>

        <div className="settings-user-info">
          <div
            className="settings-img"
            style={{
              backgroundImage: `url(${
                user.imageUrl !== 'undefined' ? user.imageUrl : '/img/default-user.svg'
              })`,
            }}
            onClick={() => setIsImgPopupVisible(true)}></div>

          <div className="settings-user-data">
            <span>Имя пользователя</span>
            <div className="nameChangeInput">
              <input type="text" value={nameValueInput} onChange={handleInput} />
              <button onClick={handleSaveUsername}>Сохранить</button>
            </div>
            <span className="error-span">{usernameError}</span>

            <span>Email</span>
            <input type="text" value={user.email} disabled />
          </div>
        </div>

        <div className="teacher-mode-toggle"></div>

        <button className="delete-profile" onClick={() => setIsDelPopupVisible(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-flame h-4 w-4 mr-2">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
          </svg>
          <span>Удалить аккаунт</span>
        </button>

        {isImgPopupVisible && (
          <SettingsImgPopup
            active={isImgPopupVisible}
            onClose={() => setIsImgPopupVisible(false)}
          />
        )}

        {isDelPopupVisible && (
          <SettingsDelPopup
            onDelete={handleDeleteUser}
            active={isDelPopupVisible}
            onClose={() => setIsDelPopupVisible(false)}
          />
        )}
      </div>
    </>
  );
};

export default Settings;
