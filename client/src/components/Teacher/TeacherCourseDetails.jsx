import React from 'react';
import {
  svgIconChapters,
  svgIconCreateCourse,
  svgIconEdit,
  svgIconGarbage,
  svgIconSell,
  svgIconTags,
  svgIconWarning,
} from '../../utils/svgIcons';

import { ClipLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCourseThunk,
  loadTeacherCourses,
  updateCoursePublished,
  updateCourseStatusFunc,
} from '../../redux/slices/teacherCourseSlice';
import PartName from './CourseDetails/PartName';
import DataInputs from './CourseDetails/DataInputs';
import CategoryInput from './CourseDetails/CategoryInput';
import TagsInput from './CourseDetails/TagsInput';
import ChaptersInput from './CourseDetails/ChaptersInput';
import ImageInput from './CourseDetails/ImageInput';

const TeacherCourseDetails = () => {
  const totalFields = 4;
  const { id } = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courses, status } = useSelector((state) => state.teacherCourses);
  const [course, setCourse] = React.useState(null);
  const [isCourseLoaded, setIsCourseLoaded] = React.useState(false);
  const [isCourseCanPublish, setIsCourseCanPublish] = React.useState(false);
  const [fullFieldsCount, setFullFieldsCount] = React.useState(1);

  const calcFullFields = (foundCourse) => {
    const hasActivePart =
      Array.isArray(foundCourse.CourseParts) &&
      foundCourse.CourseParts.some((part) => part.status === 'active');

    const filledFields = [
      foundCourse.title,
      foundCourse.topic,
      foundCourse.description,
      hasActivePart,
    ].filter((field) => field).length;

    setFullFieldsCount(filledFields);

    if (filledFields === totalFields) {
      setIsCourseCanPublish(true);
    }
  };

  const foundCourse = () => {
    const foundCourse = courses.find((c) => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
      setIsCourseLoaded(true);

      calcFullFields(foundCourse);
    }
  };

  const fetchCourses = async () => {
    await dispatch(loadTeacherCourses(token));
  };

  React.useEffect(() => {
    fetchCourses();
  }, [dispatch, token]);

  React.useEffect(() => {
    foundCourse();
  }, [courses, id]);

  React.useEffect(() => {
    if (course && totalFields === fullFieldsCount && course.published === 'draft') {
      dispatch(updateCoursePublished({ id, value: 'unpublished', tokenUser: token }));
    }
  }, [fullFieldsCount, course, totalFields, dispatch, id, token]);

  const handleSaveTags = async () => {
    await fetchCourses();
  };

  const handleDeleteCourse = async () => {
    await dispatch(deleteCourseThunk({ courseId: course.id, tokenUser: token }));
    navigator('/teacher-mode/');
  };

  const handlePublishCourse = async () => {
    await dispatch(updateCoursePublished({ id, value: 'published', tokenUser: token }));
    await dispatch(updateCourseStatusFunc({ id, value: 'public', tokenUser: token }));
  };

  const handleCourseStatus = async () => {
    const value = course.status === 'public' ? 'private' : 'public';
    await dispatch(updateCourseStatusFunc({ id, value, tokenUser: token }));
  };

  if (status === 'loading' || !isCourseLoaded) {
    return (
      <div className="loading">
        <ClipLoader color="#cb91d9" loading={true} size={50} />
      </div>
    );
  }

  if (!course) {
    return <div>Курс не найден.</div>;
  }

  return (
    <div className="course-details-components">
      {course.status === 'private' && (
        <div className="not-publish">
          {svgIconWarning()}

          <p>Курс не опубликован. Он не будет виден студентам.</p>
        </div>
      )}

      <button className="course-details-exit" onClick={() => navigator('/teacher-mode')}>
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
        <span>Назад к курсам</span>
      </button>

      <div className="course-details-container">
        <div className="course-details-header">
          <div className="teacher-header-title">
            <h1>Настройки курса</h1>
            <p>
              Заполните все поля ({fullFieldsCount}/{totalFields})
            </p>
          </div>

          <div className="teacher-header-btns">
            {course.published !== 'published' && (
              <button
                className="btn-publish"
                disabled={!isCourseCanPublish}
                onClick={handlePublishCourse}>
                Опубликовать
              </button>
            )}
            <button className="btn-delete" onClick={handleDeleteCourse}>
              {svgIconGarbage()}
            </button>
          </div>
        </div>

        {course.published === 'published' && (
          <div className="course-change-private">
            <div>
              <h4>Изменить видимость курса</h4>
              <p>
                Вы можете сделать курс приватным, либо публичным. Если курс является приватным, то
                никто не сможет его увидеть кроме вас.
              </p>
            </div>

            <button onClick={handleCourseStatus}>
              <span>{course.status === 'private' ? 'Public' : 'Private'}</span>
            </button>
          </div>
        )}

        <div className="course-details-inputs">
          <div className="course-details-inputs-left">
            <PartName svg={svgIconCreateCourse()} title="Создай свой курс" />

            <DataInputs dataType="Title" value={course.title} block="course" courseId={course.id} />
            <DataInputs
              dataType="Description"
              value={course.description}
              block="course"
              courseId={course.id}
            />

            <ImageInput courseId={course.id} courseImage={course.imageUrl} />

            <CategoryInput value={course.topic} courseId={course.id} />
          </div>
          <div className="course-details-inputs-left">
            <PartName svg={svgIconChapters()} title="Разделы курсов" />

            <ChaptersInput parts={course.CourseParts || []} courseId={course.id} />
            <PartName svg={svgIconSell()} title="Продай свой курс" />

            <div className="course-details-inputs-input price-block">
              <div className="header">
                <p>Price</p>
                <button>
                  {svgIconEdit()}
                  <span>Edit</span>
                </button>
              </div>

              <div className="price">
                <span>Бесплатно</span>
              </div>
            </div>

            <PartName svg={svgIconTags()} title="Добавь теги к курсу" />
            <TagsInput
              initialTags={course.Tags || []}
              courseId={course.id}
              onSaveTags={handleSaveTags}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourseDetails;
