import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfileImgFunc, updateProfileImgFunc } from '../../redux/slices/authSlice';

const SettingsImgPopup = ({ active, onClose }) => {
  const fileInputRef = React.useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSizeInMB = 8;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'];

    if (
      selectedFile &&
      selectedFile.size <= maxSizeInBytes &&
      validTypes.includes(selectedFile.type)
    ) {
      dispatch(updateProfileImgFunc({ userData: token, image: selectedFile }));
      onClose();
    }
  };

  const handleDeletUserImg = () => {
    dispatch(deleteProfileImgFunc(token));
    onClose();
  };

  return (
    <div className={`overlay ${active ? 'overlay-active' : ''}`} onClick={onClose}>
      <div className="settings-img-popup" onClick={(e) => e.stopPropagation()}>
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
          <button className="settings-addImg" onClick={handleFileSelect}>
            Выбрать файл
          </button>
          <button className="settings-delImg" onClick={handleDeletUserImg}>
            Удалить фотографию профиля
          </button>
        </div>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

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
