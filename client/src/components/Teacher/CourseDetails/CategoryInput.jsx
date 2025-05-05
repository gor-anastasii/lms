import React from 'react';
import { svgIconEdit, svgIconSelect } from '../../../utils/svgIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateTextCourseFields } from '../../../redux/slices/teacherCourseSlice';

const CategoryInput = ({ value, courseId }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [editBtnClick, setEditBtnClick] = React.useState(false);
  const [selectBtnClick, setSelectBtnClick] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState(value);

  const categories = ['Computer Science', 'Engineering', 'Music', 'Filming'];

  const handleSelect = (i) => {
    setSelectValue(categories[i]);
    setSelectBtnClick(false);
  };

  const handleUpdate = () => {
    if (value !== selectValue) {
      const courseData = { topic: selectValue };
      dispatch(updateTextCourseFields({ id: courseId, courseData, token }))
        .unwrap()
        .then(() => {
          setEditBtnClick(false);
        })
        .catch((error) => {
          console.error('Ошибка при обновлении курса:', error);
        });
    }
  };

  return (
    <div className="course-details-inputs-input category-block">
      <div className="header">
        <p>Category</p>
        <button onClick={() => setEditBtnClick((prev) => !prev)}>
          {!editBtnClick && svgIconEdit()}
          <span>{editBtnClick ? 'Cancel' : 'Edit'}</span>
        </button>
      </div>

      {!editBtnClick &&
        (!value ? <span className="empty-input">No category</span> : <span>{value}</span>)}

      {editBtnClick && (
        <>
          <div className={`selection-block ${selectBtnClick ? 'selection-block-active' : ''}`}>
            <div className="select" onClick={() => setSelectBtnClick((prev) => !prev)}>
              <span>{!selectValue ? 'Выбери категорию' : selectValue}</span>
              {svgIconSelect()}
            </div>
            {console.log(selectBtnClick)}
            <div
              className={`catagories-select-block ${
                selectBtnClick ? 'catagories-select-block-active' : ''
              }`}>
              <div className="category">
                {categories.map((cat, i) => {
                  return (
                    <span key={i} onClick={() => handleSelect(i)}>
                      {cat}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <button className="save-btn" onClick={handleUpdate}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryInput;
