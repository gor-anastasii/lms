import React from 'react';
import SettingsImgPopup from './SettingsImgPopup';
import SettingsDelPopup from './SettingsDelPopup';

const Settings = () => {
  const [isImgPopupVisible, setIsImgPopupVisible] = React.useState(false);
  const [isDelPopupVisible, setIsDelPopupVisible] = React.useState(false);

  return (
    <>
      <div className="settings-container">
        <h2>Общие настройки</h2>

        <h3>Информация об аккаунте</h3>
        <p>Последнее обновление от 20 февраля 2025, 16:04</p>

        <div className="settings-user-info">
          <div
            className="settings-img"
            style={{ backgroundImage: 'url(/img/user.jpg)' }}
            onClick={() => setIsImgPopupVisible(true)}></div>

          <div className="settings-user-data">
            <span>Имя пользователя</span>
            <input type="text" value="Nastya Gorodilina" />

            <span>Email</span>
            <input type="text" value="nastenas714@gmail.com" disabled />
          </div>
        </div>

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
            active={isDelPopupVisible}
            onClose={() => setIsDelPopupVisible(false)}
          />
        )}
      </div>
    </>
  );
};

export default Settings;
