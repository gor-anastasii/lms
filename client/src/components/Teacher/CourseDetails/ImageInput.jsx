import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadCourseImageThunk,
  updateCourseImageByUrlThunk,
  deleteCourseImageThunk,
} from '../../../redux/slices/teacherCourseSlice';
import { ClipLoader } from 'react-spinners';
import { svgIconGarbage, svgIconImg, svgIconPlus } from '../../../utils/svgIcons';

const ImageInput = ({ courseId, courseImage }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [addBtnClick, setAddBtnClick] = useState(false);
  const [imageData, setImageData] = useState({ url: '', file: null, preview: null });
  const [imageExists, setImageExists] = useState(true);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const checkImageExists = useCallback(() => {
    if (imageData.url) {
      setLoading(true);
      const img = new Image();
      img.src = imageData.url;
      img.onload = () => {
        setImageExists(true);
        setLoading(false);
      };
      img.onerror = () => {
        setImageExists(false);
        setLoading(false);
      };
    } else {
      setImageExists(true);
    }
  }, [imageData.url]);

  useEffect(() => {
    checkImageExists();
  }, [checkImageExists]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      const maxSize = 8 * 1024 * 1024; // 8 MB

      if (!validFormats.includes(selectedFile.type)) {
        alert('Формат файла должен быть PNG, JPG, JPEG или GIF.');
        return;
      }
      if (selectedFile.size > maxSize) {
        alert('Размер файла не должен превышать 8 МБ.');
        return;
      }

      setImageData({
        url: '',
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      });
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setImageData({ url: value, file: null, preview: value.trim() });
  };

  const handleSave = () => {
    const { file, url } = imageData;
    if (file) {
      dispatch(uploadCourseImageThunk({ courseId, file, token }));
    } else if (url.trim() && imageExists) {
      dispatch(updateCourseImageByUrlThunk({ courseId, url, token }));
    } else {
      alert('Вы должны либо загрузить изображение, либо вставить ссылку.');
    }
    setAddBtnClick(false);
  };

  const handleCancel = () => {
    setImageData({ url: '', file: null, preview: null });
    setAddBtnClick(false);
  };

  const isSaveDisabled = () => {
    const { file, url } = imageData;
    return !file && (!url.trim() || !imageExists);
  };

  const handleDeleteImage = async () => {
    await dispatch(deleteCourseImageThunk({ courseId, token }));
  };

  return (
    <div className="course-details-inputs-input image-block">
      <div className="header">
        <p>Image</p>
        <div>
          {addBtnClick && (
            <button className="delete-btn" onClick={handleDeleteImage}>
              {svgIconGarbage()}
            </button>
          )}
          <button onClick={!addBtnClick ? () => setAddBtnClick((prev) => !prev) : handleCancel}>
            {!addBtnClick && svgIconPlus()}
            <span>{addBtnClick ? 'Cancel' : 'Add'}</span>
          </button>
        </div>
      </div>

      <div className="default-img">
        {loading ? (
          <ClipLoader color="#cb91d9" loading={loading} size={50} />
        ) : imageData.preview && imageExists ? (
          <img src={imageData.preview} alt="preview" />
        ) : courseImage ? (
          <img src={courseImage} alt="courseimage" />
        ) : (
          <div className="svg-container">{svgIconImg()}</div>
        )}
      </div>
      {!imageExists && <p style={{ color: '#ff4e4e' }}>Изображение не существует.</p>}

      {addBtnClick && (
        <div className="media-input-container">
          <p>Загрузите фотографию или добавьте ссылку на неё</p>

          <div className="video-input">
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={imageData.url}
              onChange={handleInputChange}
              disabled={!!imageData.file}
            />
          </div>

          <div className="photo-input">
            <div>
              <button
                className="add-btn"
                onClick={() => fileInputRef.current.click()}
                disabled={!!imageData.url}>
                Выбрать файл
              </button>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            {imageData.file && <p>{imageData.file.name}</p>}
          </div>

          <button className="save-btn" onClick={handleSave} disabled={isSaveDisabled()}>
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
