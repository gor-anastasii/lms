import React, { useState } from 'react';
import { svgIconDone, svgIconNow, svgIconSoon, svgIconComments } from '../../utils/svgIcons';

const NavbarCourse = ({ courseInfo, progressInfo, onPartClick, onReviewClick }) => {
  const partsIcons = {
    done: { icon: svgIconDone(), class: 'done-part' },
    curr: { icon: svgIconNow(), class: 'active-nav' },
    soon: { icon: svgIconSoon(), class: '' },
  };
  const [reviewOpen, setReviewOpen] = useState(false);

  const [currentPartIndex, setCurrentPartIndex] = useState(
    progressInfo.completedParts.length > 0
      ? courseInfo.CourseParts.findIndex(
          (part) => !progressInfo.completedParts.includes(part.order),
        )
      : 0,
  );

  const handlePartClick = (part, index) => {
    setReviewOpen(false);
    setCurrentPartIndex(index);
    onPartClick(part);
  };

  const handleReview = () => {
    setReviewOpen(true);
    onReviewClick();
  };

  React.useEffect(() => {
    onPartClick(courseInfo.CourseParts[currentPartIndex]);
    if (progressInfo.completedParts.length === courseInfo.CourseParts.length) {
      setReviewOpen(true);
    }
  }, []);

  return (
    <>
      <nav className="nav-course">
        <div className="course-progress">
          <h2>{courseInfo.title}</h2>
          <div className="progress-bar">
            <div style={{ width: `${progressInfo.progress}%` }}></div>
          </div>
          <p>{progressInfo.progress}% Пройдено</p>
        </div>
        <ul>
          {courseInfo.CourseParts.map((part, index) => {
            let icon, className;

            if (index === currentPartIndex && !reviewOpen) {
              icon = partsIcons.curr.icon;
              className = partsIcons.curr.class;
            } else if (progressInfo.completedParts.includes(part.order)) {
              icon = partsIcons.done.icon;
              className = partsIcons.done.class;
            } else if (reviewOpen) {
              icon = partsIcons.soon.icon;
              className = partsIcons.soon.class;
            } else {
              icon = partsIcons.soon.icon;
              className = partsIcons.soon.class;
            }

            return (
              <li key={part.id} className={className} onClick={() => handlePartClick(part, index)}>
                {icon}
                <span>{part.title}</span>
              </li>
            );
          })}
          <li onClick={handleReview} className={`${reviewOpen ? 'active-nav' : ''}`}>
            {svgIconComments()}
            <span>Оставить отзыв</span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavbarCourse;
