import React from 'react';
import { useNavigate } from 'react-router';

const TeacherNewCourse = () => {
  const navigator = useNavigate();

  return (
    <div className="teacher-create-container">
      <div className="create-box">
        <h1>Назовите ваш курс</h1>
        <p>Не знаешь как назвать курс? Не волнуйся, название можно сменить позже.</p>

        <div className="input-name">
          <span>Title</span>
          <input type="text" placeholder="e. g. 'Advanced FullStack Course'" />
        </div>
        <p>Чему ты хочешь научить в этом курсе?</p>

        <div className="create-block-btns">
          <button className="cancel" onClick={() => navigator('/teacher-mode')}>
            <span>Отмена</span>
          </button>
          <button className="continue">
            <span>Продолжить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherNewCourse;
