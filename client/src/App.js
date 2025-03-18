import { Routes, Route, Navigate } from 'react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import AllCoursePage from './pages/AllCoursePage';
import AuthPage from './pages/AuthPage';
import CoursePreviewPage from './pages/СoursePreviewPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import { fetchUserData, logout } from './redux/slices/authSlice';
import CoursePartsPage from './pages/CoursePartsPage';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const tokenFromStorage = localStorage.getItem('token');

    if (tokenFromStorage) {
      const tokenFromStorage = localStorage.getItem('token');

      if (tokenFromStorage) {
        dispatch(fetchUserData(tokenFromStorage))
          .unwrap()
          .then(() => {
            setLoading(false);
          })
          .catch(() => {
            dispatch(logout());
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading">
        <ClipLoader color="#cb91d9" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={token ? <AllCoursePage /> : <Navigate to="/auth/signin" />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/course/:id" element={<CoursePreviewPage />} />
        <Route
          path="/settings/general"
          element={token ? <SettingsPage /> : <Navigate to="/auth/signin" />}
        />
        <Route path="/course/:id/parts/:partId" element={<CoursePartsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
