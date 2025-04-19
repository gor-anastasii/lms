import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ClipLoader } from 'react-spinners';
import { addTeacherCourse } from '../../redux/slices/teacherCourseSlice';

const TeacherNewCourse = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.teacherCourses);
  const [value, setValue] = React.useState('');
  const [isTitleValid, setIsTitleValid] = React.useState(false);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsTitleValid(newValue.trim().length > 0 && newValue.trim().length <= 255);
  };

  const handleAddCourse = async () => {
    const courseData = { title: value.trim() };

    const resultAction = await dispatch(addTeacherCourse({ courseData, token }));

    if (addTeacherCourse.fulfilled.match(resultAction)) {
      const courseId = resultAction.payload.id;
      navigator(`/teacher-mode/course/${courseId}`);
    }
  };

  if (status === 'loading') {
    return (
      <div className="loading">
        <ClipLoader color="#cb91d9" loading={true} size={50} />
      </div>
    );
  }

  return (
    <div className="teacher-create-container">
      <div className="create-box">
        <h1>Назовите ваш курс</h1>
        <p>Не знаешь как назвать курс? Не волнуйся, название можно сменить позже.</p>

        <div className="input-name">
          <span>Title</span>
          <input
            type="text"
            placeholder="например, 'Advanced FullStack Course'"
            value={value}
            onChange={handleInput}
          />
        </div>
        <p>Чему ты хочешь научить в этом курсе?</p>

        <div className="create-block-btns">
          <button className="cancel" onClick={() => navigator('/teacher-mode')}>
            <span>Отмена</span>
          </button>
          <button className="continue" onClick={handleAddCourse} disabled={!isTitleValid}>
            <span>Продолжить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherNewCourse;
