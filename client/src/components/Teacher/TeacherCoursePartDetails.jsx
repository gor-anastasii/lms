import React from 'react';
import {
  svgIconCreateCourse,
  svgIconGarbage,
  svgIconMedia,
  svgIconWarning,
} from '../../utils/svgIcons';

import { ClipLoader } from 'react-spinners';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCoursePartThunk,
  loadTeacherCourses,
  updateCoursePartStatusThunk,
} from '../../redux/slices/teacherCourseSlice';
import PartName from './CourseDetails/PartName';
import DataInputs from './CourseDetails/DataInputs';
import MediaInput from './CourseDetails/MediaInput';

const TeacherCoursePartDetails = () => {
  const { id, partId } = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { search: searchParams } = useLocation();
  const query = new URLSearchParams(searchParams);
  const search = query.get('search') || '';
  const page = parseInt(query.get('page')) || 1;

  const { token } = useSelector((state) => state.auth);
  const { courses, status } = useSelector((state) => state.teacherCourses);
  const [coursePart, setCoursePart] = React.useState(null);
  const totalFields = 2;
  const [fullFieldsCount, setFullFieldsCount] = React.useState(0);
  const [canPublish, setCanPublish] = React.useState(false);

  const fetchCourses = async () => {
    await dispatch(loadTeacherCourses({ userData: token, page, search }));
  };

  React.useEffect(() => {
    fetchCourses();
  }, [dispatch, token]);

  React.useEffect(() => {
    const foundCourse = courses.find((c) => c.id === id);
    if (foundCourse) {
      const foundCoursePart = foundCourse.CourseParts.find((p) => p.id === partId);
      setCoursePart(foundCoursePart);
      calcFullFields(foundCoursePart);
    }
  }, [courses, id, partId]);

  const calcFullFields = (part) => {
    const filledFields = [part.title, part.content].filter((f) => f && f.trim() !== '').length;
    setFullFieldsCount(filledFields);
    setCanPublish(filledFields === totalFields);
  };

  const handleDeleteCoursePart = async () => {
    await dispatch(deleteCoursePartThunk({ coursePartId: partId, tokenUser: token }));
    navigator(`/teacher-mode/course/${id}`);
  };

  const onSaveMedia = () => {
    fetchCourses();
  };

  const handleStatusChange = async () => {
    const value = coursePart.status === 'active' ? 'inactive' : 'active';
    await dispatch(updateCoursePartStatusThunk({ partId, status: value, tokenUser: token }));
  };

  if (status === 'loading') {
    return (
      <div className="loading">
        <ClipLoader color="#cb91d9" loading={true} size={50} />
      </div>
    );
  }

  if (!coursePart) {
    return <div>Раздел не найден.</div>;
  }

  return (
    <div className="course-details-components">
      {coursePart.status === 'inactive' && (
        <div className="not-publish">
          {svgIconWarning()}

          <p>Раздел не опубликован. Он не будет виден студентам.</p>
        </div>
      )}

      <button
        className="course-details-exit"
        onClick={() => navigator(`/teacher-mode/course/${id}`)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-left h-4 w-4 mr-2">
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        <span>Назад к настройкам</span>
      </button>

      <div className="course-details-container">
        <div className="course-details-header">
          <div className="teacher-header-title">
            <h1>Настройки раздела курса</h1>
            <p>
              Заполните все поля ({fullFieldsCount}/{totalFields})
            </p>
          </div>

          <div className="teacher-header-btns">
            <button className="btn-publish" disabled={!canPublish} onClick={handleStatusChange}>
              {coursePart.status === 'active' ? 'Скрыть' : 'Опубликовать'}
            </button>

            <button className="btn-delete" onClick={handleDeleteCoursePart}>
              {svgIconGarbage()}
            </button>
          </div>
        </div>

        <div className="course-details-inputs">
          <div className="course-details-inputs-left">
            <PartName svg={svgIconCreateCourse()} title="Создай раздел курса" />

            <DataInputs
              dataType="Title"
              value={coursePart.title}
              block="coursePart"
              courseId={id}
              coursePartId={partId}
            />

            <DataInputs
              dataType="Description"
              value={coursePart.content}
              block="coursePart"
              courseId={id}
              coursePartId={partId}
            />
            {/* <DataInputs dataType="Description" value={testMarkdown} block="coursePart" courseId={id} coursePartId={partId}/> */}
          </div>
          <div className="course-details-inputs-left">
            <PartName svg={svgIconMedia()} title="Добавьте видео или фото" />

            <MediaInput media={coursePart.mediaUrl} partId={partId} onSave={onSaveMedia} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCoursePartDetails;
