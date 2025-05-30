import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import NotFoundPage from './NotFoundPage';
import NavbarCourse from '../components/Navbar/NavbarCourse';
import Header from '../components/Header/Header';
import CoursePart from '../components/CoursePart/CoursePart';
import { fetchCourseDetailsAsync } from '../redux/slices/currentCourseSlice';
import Review from '../components/Review';

// const CoursePartsPage = () => {
//   const { id } = useParams();
//   const { token } = useSelector((state) => state.auth);
//   const { course, status, progress } = useSelector((state) => state.currentCourse);
//   const dispatch = useDispatch();
//   const [reviewOpen, setReviewOpen] = useState(false);
//   const [currentPart, setCurrentPart] = useState(null);

//   React.useEffect(() => {
//     dispatch(
//       fetchCourseDetailsAsync({ courseId: id, token: token || localStorage.getItem('token') }),
//     ).then(() => {
//       if (course && progress.completedParts.length === course.CourseParts.length) {
//         setReviewOpen(true);
//       }
//     });
//   }, [dispatch, token, id]);

//   const handlePartClick = (part) => {
//     setReviewOpen(false);
//     setCurrentPart(part);
//   };

//   const handleReviewClick = () => {
//     setReviewOpen(true);
//   };

//   if (status === 'loading') {
//     return (
//       <div className="loading">
//         <ClipLoader color="#cb91d9" loading={true} size={50} />
//       </div>
//     );
//   }

//   if (!course) {
//     return <NotFoundPage />;
//   }

//   return (
//     <>
//       <Header />
//       <main>
//         <NavbarCourse
//           courseInfo={course}
//           progressInfo={progress}
//           onPartClick={handlePartClick}
//           onReviewClick={handleReviewClick}
//         />
//         {reviewOpen ? (
//           <Review courseId={id} />
//         ) : currentPart ? (
//           <CoursePart partInfo={currentPart} />
//         ) : (
//           <div>Выберите раздел для просмотра</div>
//         )}
//       </main>
//     </>
//   );
// };

// export default CoursePartsPage;

const CoursePartsPage = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { course, status, progress } = useSelector((state) => state.currentCourse);
  const dispatch = useDispatch();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState(null);

  // React.useEffect(() => {
  //   dispatch(
  //     fetchCourseDetailsAsync({ courseId: id, token: token || localStorage.getItem('token') }),
  //   ).then(() => {
  //     if (course && progress.completedParts.length === course.CourseParts.length) {
  //       setReviewOpen(true);
  //     }
  //   });
  // }, [dispatch, token, id]);

  React.useEffect(() => {
    dispatch(
      fetchCourseDetailsAsync({ courseId: id, token: token || localStorage.getItem('token') }),
    );
  }, [dispatch, token, id]);

  // Выбор части после загрузки данных
  React.useEffect(() => {
    if (status === 'succeeded' && course && progress) {
      const sortedParts = [...course.CourseParts].sort((a, b) => a.order - b.order);

      // Находим первую не пройденную часть
      const firstUncompleted = sortedParts.find(
        (part) => !progress.completedParts.includes(part.order),
      );

      if (firstUncompleted) {
        setCurrentPart(firstUncompleted);
        setReviewOpen(false);
      } else {
        setReviewOpen(true); // Все части пройдены — открываем отзывы
      }
    }
  }, [status, course, progress]);

  const handlePartClick = (part) => {
    setReviewOpen(false);
    setCurrentPart(part);
  };

  const handleReviewClick = () => {
    setReviewOpen(true);
  };

  if (status === 'loading') {
    return (
      <div className="loading">
        <ClipLoader color="#cb91d9" loading={true} size={50} />
      </div>
    );
  }

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Header />
      <main>
        <NavbarCourse
          courseInfo={course}
          progressInfo={progress}
          onPartClick={handlePartClick}
          onReviewClick={handleReviewClick}
          currentPart={currentPart}
          reviewOpen={reviewOpen}
        />
        {reviewOpen ? (
          <Review courseId={id} />
        ) : currentPart ? (
          <CoursePart partInfo={currentPart} />
        ) : (
          <div>Выберите раздел для просмотра</div>
        )}
      </main>
    </>
  );
};

export default CoursePartsPage;
