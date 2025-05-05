import React from 'react';
import { svgIconArrow, svgIconImg } from '../../utils/svgIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateCourseProgressAsync } from '../../redux/slices/currentCourseSlice';
import MarkdownRenderer from '../MarkdownRenderer';
import { validateVideoUrl } from '../../utils/validations';

const CoursePart = ({ partInfo }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { id: courseId } = useSelector((state) => state.currentCourse.course);
  const [imageExists, setImageExists] = React.useState(true);

  React.useEffect(() => {
    if (partInfo.mediaUrl && !validateVideoUrl(partInfo.mediaUrl)) {
      const img = new Image();
      img.onload = () => setImageExists(true);
      img.onerror = () => setImageExists(false);
      img.src = partInfo.mediaUrl;

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [partInfo.mediaUrl]);

  const handleComplete = () => {
    dispatch(updateCourseProgressAsync({ courseId, currentPartOrder: partInfo.order, token }));
  };

  return (
    <div className="content course-part-content">
      <div className="course-part-container">
        {partInfo.mediaUrl &&
          (validateVideoUrl(partInfo.mediaUrl) ? (
            <iframe
              src={partInfo.mediaUrl}
              title="Видео"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          ) : (
            imageExists && (
              <img src={partInfo.mediaUrl} alt="course part" className="coursePart-img" />
            )
          ))}

        <div className="course-part-info">
          <h2>{partInfo.title}</h2>
          <button onClick={handleComplete}>Завершить {svgIconArrow()}</button>
        </div>

        <div className="course-part-desc">
          <MarkdownRenderer markdownText={partInfo.content} />
        </div>
      </div>
    </div>
  );
};

export default CoursePart;
