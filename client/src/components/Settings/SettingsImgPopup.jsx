import React from 'react';

const SettingsImgPopup = ({ active, onClose }) => {
  return (
    <div className={`overlay ${active ? 'overlay-active' : ''}`} onClick={onClose}>
      <div className="settings-img-popup">
        <div className="settings-img-header">
          <h3>Фотография профиля</h3>
          <div className="settings-exit-popup" onClick={onClose}>
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
              className="lucide lucide-x h-4 w-4">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </div>
        </div>

        <p>Добавьте фото, это сделает ваш профиль более привлекательным и интересным.</p>
        <div className="popus-btns">
          <button className="settings-addImg">Выбрать файл</button>
          <button className="settings-delImg">Удалить фотографию профиля</button>
        </div>

        <div className="settings-popup-info">
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
            className="lucide lucide-info w-4-h-4 text-muted-foreground">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>

          <p>
            Вы можете загрузить изображение в формате JPG, GIF или PNG.
            <br />
            Максимальный размер файла — 8 МБ
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsImgPopup;
