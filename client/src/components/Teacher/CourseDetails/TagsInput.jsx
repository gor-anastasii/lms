import React from 'react';
import { svgIconCross, svgIconEdit } from '../../../utils/svgIcons';
import { useDispatch, useSelector } from 'react-redux';
import { createTag } from '../../../api/tagApi';
import { bindTagsToCourse } from '../../../redux/slices/teacherCourseSlice';

const TagsInput = ({ initialTags = [], courseId, onSaveTags }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [editBtnClick, setEditBtnClick] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isValueValid, setIsValueValid] = React.useState(false);
  const [tags, setTags] = React.useState(initialTags);

  React.useEffect(() => {
    setTags(initialTags);
  }, [onSaveTags]);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsValueValid(newValue.trim().length > 0 && newValue.trim().length <= 50);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleRemoveAllTags = () => {
    setTags([]);
  };

  const handleAddTag = async () => {
    if (!isValueValid) return;

    try {
      const newTag = await createTag(token, inputValue);
      setInputValue('');
      setIsValueValid(false);
      if (!tags.some((tag) => tag === newTag.name)) {
        setTags((prevTags) => [...prevTags, newTag]);
      } else {
        console.log('Тег уже существует:', newTag.name);
      }
    } catch (e) {
      console.error('Ошибка при добавлении тега:', e.message);
    }
  };

  const handleSave = async () => {
    const tagIds = tags.map((tag) => tag.id);

    try {
      await dispatch(bindTagsToCourse({ tokenUser: token, courseId, tagIds }))
        .unwrap()
        .then(() => {
          setEditBtnClick(false);
          onSaveTags();

          console.log('Теги успешно связаны с курсом');
        })
        .catch((error) => {
          console.error('Ошибка при обновлении курса:', error);
        });
    } catch (error) {
      console.error('Ошибка при связывании тегов с курсом:', error);
    }
  };

  return (
    <div className="course-details-inputs-input tags-block">
      <div className="header">
        <p>Tags</p>
        <div>
          {editBtnClick && (
            <button onClick={handleRemoveAllTags}>
              <span>Remove All</span>
            </button>
          )}
          <button onClick={() => setEditBtnClick((prev) => !prev)}>
            {!editBtnClick && svgIconEdit()}
            <span>{editBtnClick ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
      </div>
      <div className="tags-container">
        {tags.length === 0 && <p>Добавьте теги к своему курсу</p>}
        {tags.length > 0 &&
          tags.map((tag, i) => {
            return (
              <div className="tag-block" key={i}>
                <span>{tag.name}</span>
                {editBtnClick && <div onClick={() => handleDeleteTag(tag)}>{svgIconCross()}</div>}
              </div>
            );
          })}
      </div>

      {editBtnClick && (
        <>
          <div className="tags-block-save">
            <input type="text" value={inputValue} onChange={handleInput} />
            <button className="add-btn" onClick={handleAddTag} disabled={!isValueValid}>
              Add tag
            </button>
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default TagsInput;
