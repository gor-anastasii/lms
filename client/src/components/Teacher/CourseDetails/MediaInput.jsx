import React from 'react';
import { svgIconGarbage, svgIconImg, svgIconPlus } from '../../../utils/svgIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCoursePartImageThunk,
  updateCoursePartImageByUrlThunk,
  uploadCoursePartImageThunk,
} from '../../../redux/slices/teacherCourseSlice';
import { ClipLoader } from 'react-spinners';
import { convertToEmbedUrl, validateVideoUrl } from '../../../utils/validations';

const MediaInput = ({ partId, media, onSave }) => {
  const [addBtnClick, setAddBtnClick] = React.useState(false);
  const [isVideoMode, setIsVideoMode] = React.useState(true);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [imageData, setImageData] = React.useState({ url: '', file: null, preview: null });
  const [imageExists, setImageExists] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const [videoError, setVideoError] = React.useState('');

  React.useEffect(() => {
    if (imageData.url && !isVideoMode) {
      setLoading(true);
      const img = new Image();
      img.onload = () => {
        setImageExists(true);
        setLoading(false);
      };
      img.onerror = () => {
        setImageExists(false);
        setLoading(false);
      };
      img.src = imageData.url;

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    } else {
      setImageExists(true);
    }
  }, [imageData.url, isVideoMode]);

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
      setVideoError('');
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setImageData({ url: value, file: null, preview: value.trim() });
    setImageExists(true);
    setVideoError('');
  };

  const handleSave = () => {
    const { file, url } = imageData;
    let mediaType = isVideoMode ? 'video' : 'image';

    if (isVideoMode) {
      if (!validateVideoUrl(url)) {
        setVideoError(
          'Неверная ссылка на видео. Убедитесь, что это ссылка с YouTube для встраивания.',
        );
        return;
      }
      const embedUrl = convertToEmbedUrl(url);
      dispatch(
        updateCoursePartImageByUrlThunk({ partId, imageUrl: embedUrl, token, type: mediaType }),
      );
    } else {
      if (file) {
        dispatch(uploadCoursePartImageThunk({ partId, file, token }));
      } else if (url.trim() && imageExists) {
        dispatch(
          updateCoursePartImageByUrlThunk({ partId, imageUrl: url, token, type: mediaType }),
        );
      } else {
        alert('Вы должны либо загрузить изображение, либо вставить ссылку.');
      }
    }
    setAddBtnClick(false);
    onSave();
  };

  const handleCancel = () => {
    setImageData({ url: '', file: null, preview: null });
    setAddBtnClick(false);
  };

  const isSaveDisabled = () => {
    const { file, url } = imageData;
    if (isVideoMode) return !validateVideoUrl(url);
    return !file && (!url.trim() || !imageExists);
  };

  const checkMedia = () => {
    if (media) {
      if (validateVideoUrl(media)) {
        return (
          <iframe
            src={convertToEmbedUrl(media)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        );
      } else if (!validateVideoUrl(media) && imageExists) {
        return <img src={media} alt="coursePartimage" />;
      } else {
        return <div className="svg-container">{svgIconImg()}</div>;
      }
    }
  };

  const renderMediaContent = () => {
    if (loading) {
      return <ClipLoader color="#cb91d9" loading={loading} size={50} />;
    }

    if (isVideoMode) {
      if (imageData.url && validateVideoUrl(imageData.url)) {
        return (
          <iframe
            src={convertToEmbedUrl(imageData.url)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        );
      } else if (media) {
        return checkMedia();
      } else {
        return <div className="svg-container">{svgIconImg()}</div>;
      }
    }

    if (imageData.preview && imageExists) {
      return <img src={imageData.preview} alt="preview" />;
    } else if (media) {
      return checkMedia();
    } else {
      return <div className="svg-container">{svgIconImg()}</div>;
    }
  };

  const handleDeleteMedia = async () => {
    await dispatch(deleteCoursePartImageThunk({ partId, token }));
  };

  const handleToggle = () => {
    setIsVideoMode((prev) => !prev);
    setImageData({ url: '', file: '', preview: '' });
  };

  return (
    <div className="course-details-inputs-input image-block">
      <div className="header">
        <div>
          {!addBtnClick ? <p>Media</p> : <p>{isVideoMode ? 'Video' : 'Photo'}</p>}
          {addBtnClick && (
            <label className="toggle">
              <input type="checkbox" onClick={handleToggle} />
              <span className="slider"></span>
            </label>
          )}
        </div>

        <div>
          {addBtnClick && (
            <button className="delete-btn" onClick={handleDeleteMedia}>
              {svgIconGarbage()}
            </button>
          )}
          <button onClick={!addBtnClick ? () => setAddBtnClick((prev) => !prev) : handleCancel}>
            {!addBtnClick && svgIconPlus()}
            <span>{addBtnClick ? 'Cancel' : 'Add'}</span>
          </button>
        </div>
      </div>

      <div className="default-img">{renderMediaContent()}</div>
      {!imageExists && !isVideoMode && (
        <p style={{ color: '#ff4e4e' }}>Изображение не существует.</p>
      )}
      {videoError && <p style={{ color: '#ff4e4e' }}>{videoError}</p>}

      {addBtnClick && (
        <div className="media-input-container">
          <p>
            {isVideoMode
              ? 'Добавьте ссылку на видео'
              : 'Загрузите фотографию или добавьте ссылку на неё'}
          </p>

          <div className="video-input">
            <input
              type="text"
              placeholder={`${
                isVideoMode ? 'https://example.com/video.mp4' : 'https://example.com/image.jpg'
              }`}
              value={imageData.url}
              onChange={handleInputChange}
              disabled={!!imageData.file}
            />
          </div>

          {!isVideoMode && (
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
          )}

          <button className="save-btn" onClick={handleSave} disabled={isSaveDisabled()}>
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaInput;
