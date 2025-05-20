import React from 'react';
import { svgIconEdit } from '../../../utils/svgIcons';
import MarkdownRenderer from '../../MarkdownRenderer';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTextCourseFields,
  updateTextCoursePartFields,
} from '../../../redux/slices/teacherCourseSlice';

const DataInputs = ({ dataType, value, block, courseId, coursePartId }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [editBtnClick, setEditBtnClick] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isValueValid, setIsValueValid] = React.useState(false);

  React.useEffect(() => {
    if (value) {
      setInputValue(value);
      setIsValueValid(true);
    }
  }, [value]);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (dataType === 'Title') {
      setIsValueValid(newValue.trim().length > 0 && newValue.trim().length <= 255);
    } else if (block === 'coursePart' && dataType === 'Description') {
      setIsValueValid(newValue.trim().length > 0);
    } else {
      setIsValueValid(newValue.trim().length > 0 && newValue.trim().length <= 1000);
    }
  };

  const handleUpdate = () => {
    if (block === 'course') {
      const courseData = {};
      if (dataType === 'Title') {
        courseData.title = inputValue;
      } else if (dataType === 'Description') {
        courseData.description = inputValue;
      } else if (dataType === 'Topic') {
        courseData.topic = inputValue;
      }

      dispatch(updateTextCourseFields({ id: courseId, courseData, token }))
        .unwrap()
        .then(() => {
          setEditBtnClick(false);
        })
        .catch((error) => {
          console.error('Ошибка при обновлении курса:', error);
        });
    } else if (block === 'coursePart') {
      const courseData = {};
      if (dataType === 'Title') {
        courseData.title = inputValue;
      } else if (dataType === 'Description') {
        courseData.description = inputValue;
      }
      dispatch(updateTextCoursePartFields({ courseId, id: coursePartId, courseData, token }))
        .unwrap()
        .then(() => {
          setEditBtnClick(false);
        })
        .catch((error) => {
          console.error('Ошибка при обновлении  раздела курса:', error);
        });
    }
  };

  return (
    <div className="course-details-inputs-input text-block">
      <div className="header">
        <p>{dataType}</p>

        <button onClick={() => setEditBtnClick((prev) => !prev)}>
          {!editBtnClick && svgIconEdit()}
          <span>{editBtnClick ? 'Cancel' : 'Edit'}</span>
        </button>
      </div>

      {!editBtnClick &&
        (!value ? (
          <span className="empty-input">No {dataType}</span>
        ) : block === 'coursePart' && dataType === 'Description' ? (
          <MarkdownRenderer markdownText={value} />
        ) : (
          <span>{value}</span>
        ))}

      {editBtnClick && (
        <>
          {dataType === 'Description' ? (
            <>
              <textarea value={inputValue} onChange={handleInput}></textarea>
              {block === 'coursePart' && (
                <p className="info">Можно использовать markdown разметку</p>
              )}
            </>
          ) : (
            <input type="text" value={inputValue} onChange={handleInput} />
          )}

          <button disabled={!isValueValid} className="save-btn" onClick={handleUpdate}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default DataInputs;
