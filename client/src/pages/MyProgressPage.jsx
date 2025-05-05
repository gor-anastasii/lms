// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import Header from '../components/Header/Header';
// import Navbar from '../components/Navbar/Navbar';
// import CourseCard from '../components/Course/CourseCard';
// import SkeletonCourse from '../components/Course/SkeletonCourse';
// import { loadCourses } from '../redux/slices/courseSlice';
// import {
//   svgIconFirstPage,
//   svgIconLastPage,
//   svgIconNextPage,
//   svgIconPrevPage,
// } from '../utils/svgIcons';
// import { fetchCompletedCourses, fetchInProgressCourses } from '../api/courseApi';

// const MyProgressPage = () => {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courses, status } = useSelector((state) => state.courses);

//   const [inProcess, setInProcess] = React.useState(0);
//   const [done, setDone] = React.useState(0);
//   const [yourCourses, setYourCourses] = React.useState(courses);
//   const [activeDone, setActiveDone] = React.useState(false);
//   const [activeProcess, setActiveProcess] = React.useState(false);

//   React.useEffect(() => {
//     const fetchCourses = async () => {
//       await dispatch(loadCourses(token));

//       const inProcessCount = courses.filter(
//         (course) =>
//           course.Progresses[0]?.progress >= 0 &&
//           course.Progresses[0]?.progress < 100 &&
//           course.Progresses[0]?.progress !== null,
//       ).length;

//       const doneCount = courses.filter((course) => course.Progresses[0]?.progress === 100).length;

//       filterInProcess();
//       setInProcess(inProcessCount);
//       setDone(doneCount);
//     };

//     fetchCourses();
//   }, [dispatch, token]);

//   React.useEffect(() => {
//     const fetchProgressCourses = async () => {
//       const inprogress = await fetchInProgressCourses(token, 1);
//       const done = await fetchCompletedCourses(token, 1);

//       console.log(inprogress);
//       console.log(done);
//     };

//     fetchProgressCourses();
//   }, [token]);

//   const filterInProcess = () => {
//     setActiveProcess(true);
//     setActiveDone(false);
//     const inProcessCourses = courses.filter(
//       (course) =>
//         course.Progresses[0]?.progress >= 0 &&
//         course.Progresses[0]?.progress < 100 &&
//         course.Progresses[0]?.progress !== null,
//     );
//     setYourCourses(inProcessCourses);
//   };

//   const filterDone = () => {
//     setActiveProcess(false);
//     setActiveDone(true);
//     const doneCourses = courses.filter((course) => course.Progresses[0]?.progress === 100);
//     setYourCourses(doneCourses);
//   };

//   return (
//     <>
//       <Header />
//       <main>
//         <Navbar i={1} />

//         <div className="content">
//           <div className="progress-page">
//             <div className="sortbar-progress">
//               <div
//                 className={`sortbar-progress-btn ${activeProcess ? 'active-btn' : ''}`}
//                 onClick={filterInProcess}>
//                 <div
//                   className="progress-btn-icon"
//                   style={{ backgroundColor: '#E2ECFE', color: '#3B65DE' }}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="32"
//                     height="32"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-clock text-blue-700/85 dark:text-blue-400 h-8 w-8">
//                     <circle cx="12" cy="12" r="10"></circle>
//                     <polyline points="12 6 12 12 16 14"></polyline>
//                   </svg>
//                 </div>
//                 <div className="progress-title">
//                   <p>В процессе</p>
//                   <span>{inProcess} курс</span>
//                 </div>
//               </div>

//               <div
//                 className={`sortbar-progress-btn ${activeDone ? 'active-btn' : ''}`}
//                 onClick={filterDone}>
//                 <div
//                   className="progress-btn-icon"
//                   style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="32"
//                     height="32"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-circle-check-big text-emerald-700 dark:text-emerald-100 h-8 w-8">
//                     <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
//                     <path d="m9 11 3 3L22 4"></path>
//                   </svg>
//                 </div>
//                 <div className="progress-title">
//                   <p>Завершено</p>
//                   <span>{done} курс</span>
//                 </div>
//               </div>
//             </div>
//             <div className="course-cards">
//               {status === 'loading' && [...Array(4)].map((item, i) => <SkeletonCourse key={i} />)}
//               {(status === 'failed' || yourCourses.length < 1) && (
//                 <div className="notfoundcourse">
//                   <p>Вы пока не начали обучение.</p>
//                 </div>
//               )}
//               {status === 'succeeded' &&
//                 yourCourses.map((course) => (
//                   <CourseCard
//                     key={course.id}
//                     id={course.id}
//                     title={course.title}
//                     topic={course.topic}
//                     imageUrl={course.imageUrl}
//                     averageRating={course.averageRating}
//                     partsCount={course.CourseParts?.length || 0}
//                     progress={course.Progresses[0]?.progress}
//                   />
//                 ))}
//             </div>
//           </div>

//           <div className="pagination-block">
//             <button>{svgIconFirstPage()}</button>
//             <button>{svgIconPrevPage()}</button>
//             <span>{/* {currentPage} / {totalPages} */}1/2</span>
//             <button>{svgIconNextPage()}</button>
//             <button>{svgIconLastPage()}</button>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default MyProgressPage;

import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import CourseCard from '../components/Course/CourseCard';
import SkeletonCourse from '../components/Course/SkeletonCourse';
import {
  svgIconFirstPage,
  svgIconLastPage,
  svgIconNextPage,
  svgIconPrevPage,
} from '../utils/svgIcons';
import { fetchCompletedCourses, fetchInProgressCourses } from '../api/courseApi';

const MyProgressPage = () => {
  const { token } = useSelector((state) => state.auth);

  const [inProgressCourses, setInProgressCourses] = React.useState([]);
  const [completedCourses, setCompletedCourses] = React.useState([]);

  const [inProgressPage, setInProgressPage] = React.useState(1);
  const [completedPage, setCompletedPage] = React.useState(1);

  const [inProgressTotalPages, setInProgressTotalPages] = React.useState(1);
  const [completedTotalPages, setCompletedTotalPages] = React.useState(1);

  const [activeTab, setActiveTab] = React.useState('inProgress');
  const [loading, setLoading] = React.useState(false);

  const [inprogCount, setInprogCount] = React.useState(0);
  const [doneCount, setDoneCount] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'inProgress') {
          const res = await fetchInProgressCourses(token, inProgressPage);
          setInProgressCourses(res.courses);
          setInProgressTotalPages(res.totalPages || 1);
          setInprogCount(res.totalCount || 0);
          const res2 = await fetchCompletedCourses(token, completedPage);
          setDoneCount(res2.totalCount || 0);
        } else {
          const res = await fetchCompletedCourses(token, completedPage);
          setCompletedCourses(res.courses);
          setCompletedTotalPages(res.totalPages || 1);
          setDoneCount(res.totalCount || 0);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token, activeTab, inProgressPage, completedPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'inProgress') {
      setInProgressPage(1);
    } else {
      setCompletedPage(1);
    }
  };

  const handlePageChange = (page) => {
    if (activeTab === 'inProgress') {
      setInProgressPage(page);
    } else {
      setCompletedPage(page);
    }
  };

  const displayedCourses = activeTab === 'inProgress' ? inProgressCourses : completedCourses;
  const totalPages = activeTab === 'inProgress' ? inProgressTotalPages : completedTotalPages;
  const currentPage = activeTab === 'inProgress' ? inProgressPage : completedPage;

  return (
    <>
      <Header />
      <main>
        <Navbar i={1} />
        <div className="content">
          <div className="progress-page">
            <div className="sortbar-progress">
              <div
                className={`sortbar-progress-btn ${activeTab === 'inProgress' ? 'active-btn' : ''}`}
                onClick={() => handleTabChange('inProgress')}>
                <div
                  className="progress-btn-icon"
                  style={{ backgroundColor: '#E2ECFE', color: '#3B65DE' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock text-blue-700/85 dark:text-blue-400 h-8 w-8">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="progress-title">
                  <p>В процессе</p>
                  <span>{inprogCount} курс</span>
                </div>
              </div>

              <div
                className={`sortbar-progress-btn ${activeTab === 'completed' ? 'active-btn' : ''}`}
                onClick={() => handleTabChange('completed')}>
                <div
                  className="progress-btn-icon"
                  style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-check-big text-emerald-700 dark:text-emerald-100 h-8 w-8">
                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                    <path d="m9 11 3 3L22 4"></path>
                  </svg>
                </div>
                <div className="progress-title">
                  <p>Завершено</p>
                  <span>{doneCount} курс</span>
                </div>
              </div>
            </div>

            <div className="course-cards">
              {loading && [...Array(4)].map((_, i) => <SkeletonCourse key={i} />)}

              {!loading && displayedCourses.length === 0 && (
                <div className="notfoundcourse">
                  <p>
                    {activeTab === 'inProgress'
                      ? 'Вы пока не начали обучение.'
                      : 'Вы пока не завершили ни один курс.'}
                  </p>
                </div>
              )}

              {!loading &&
                displayedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    topic={course.topic}
                    imageUrl={course.imageUrl}
                    averageRating={course.averageRating}
                    partsCount={course.CourseParts?.length || 0}
                    progress={course.Progresses?.[0]?.progress}
                  />
                ))}
            </div>
          </div>

          {displayedCourses.length !== 0 && (
            <div className="pagination-block">
              <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                {svgIconFirstPage()}
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                {svgIconPrevPage()}
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                {svgIconNextPage()}
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}>
                {svgIconLastPage()}
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default MyProgressPage;
