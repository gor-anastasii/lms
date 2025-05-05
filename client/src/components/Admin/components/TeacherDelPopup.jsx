import React from 'react';

const TeacherDelPopup = ({ active, onClose, onDelete }) => {
  return (
    <div className={`overlay ${active ? 'overlay-active' : ''}`} onClick={onClose}>
      <div className="settings-del-popup" onClick={(e) => e.stopPropagation()}>
        <div className="settings-del-header">
          <h3>Удалить аккаунт</h3>
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

        <p>
          Вы уверены, что хотите удалить аккаунт?
          <br />
          Удаление аккаунта является окончательным и приведет к удалению всеx данных навсегда.
        </p>
        <div className="del-popup-btns">
          <button>Отменить</button>
          <button className="del-btn-popup" onClick={onDelete}>
            Да, я удаляю аккаунт навсегда
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDelPopup;
