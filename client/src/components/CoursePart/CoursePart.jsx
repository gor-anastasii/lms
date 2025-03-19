import React from 'react';
import { svgIconArrow } from '../../utils/svgIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateCourseProgressAsync } from '../../redux/slices/currentCourseSlice';

const CoursePart = ({ partInfo }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { id: courseId } = useSelector((state) => state.currentCourse.course);

  const handleComplete = () => {
    dispatch(updateCourseProgressAsync({ courseId, currentPartOrder: partInfo.order, token }));
  };

  return (
    <div className="content course-part-content">
      <div className="course-part-container">
        <iframe
          src={partInfo.videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>

        <div className="course-part-info">
          <h2>{partInfo.title}</h2>
          <button onClick={handleComplete}>Завершить {svgIconArrow()}</button>
        </div>

        <div className="course-part-desc">
          <p>{partInfo.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CoursePart;
