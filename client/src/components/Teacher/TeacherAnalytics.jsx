// import React, { useEffect, useState } from 'react';
// import { getTeacherStatistic } from '../../api/courseApi';
// import { ClipLoader } from 'react-spinners';

// const TeacherAnalytics = () => {
//   const [statistics, setStatistics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStatistics = async () => {
//       try {
//         const data = await getTeacherStatistic();
//         setStatistics(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStatistics();
//   }, []);

//   if (loading) {
//     return (
//       <div className="loading">
//         <ClipLoader color="#cb91d9" loading={true} size={50} />
//       </div>
//     );
//   }

//   if (error) {
//     return <p>Произошла ошибка при загрузке данных, попробуйте зайти на страницу позже(</p>;
//   }

//   return (
//     <div className="teacherAnalytic-container">
//       <h1>Статистика</h1>

//       <div className="block-analytics">
//         <div className="block-analytics">
//           <h3>Статистика курсов</h3>
//           <div>
//             <p>
//               Количество ваших курсов: <span>{statistics.totalCourses}</span>
//             </p>
//             <p>
//               Количество публичных курсов: <span>{statistics.publicCourses}</span>
//             </p>
//             <p>
//               Количество приватных курсов: <span>{statistics.privateCourses}</span>
//             </p>
//             <p>
//               Ваш самый популярный курс: <span>{statistics.mostPopularCourse}</span>
//             </p>
//             <p>
//               Ваш самый рейтенговый курс: <span>{statistics.highestRatedCourse}</span>
//             </p>
//           </div>
//         </div>

//         <div className="block-analytics">
//           <h3>Статистика подписчиков</h3>
//           <div>
//             <p>
//               Общее количество подписчиков на ваши курсы: <span>{statistics.totalSubscribers}</span>
//             </p>
//             <p>
//               Общее количество учеников, которые прошли ваши курсы до конца:{' '}
//               <span>{statistics.totalCompletedStudents}</span>
//             </p>
//             <p>
//               Количество отзывов на ваши курсы: <span>{statistics.totalReviews}</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherAnalytics;

import React, { useEffect, useState } from 'react';
import { getTeacherStatistic } from '../../api/courseApi';
import { ClipLoader } from 'react-spinners';
import CountUp from 'react-countup';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import {
  BookOpen,
  Eye,
  Lock,
  Star,
  Users,
  CheckCircle,
  MessageSquare,
  Award,
  Clipboard,
  Layers,
} from 'lucide-react';

const COLORS = ['#7c3aed', '#e879f9', '#ff7300', '#00c49f', '#0088FE'];

const TeacherAnalytics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getTeacherStatistic();
        setStatistics(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <ClipLoader color="#cb91d9" loading={true} size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="error-message">Произошла ошибка при загрузке данных. Попробуйте позже.</p>;
  }

  const pieData = [
    { name: 'Публичные', value: statistics.publicCourses },
    { name: 'Приватные', value: statistics.privateCourses },
  ];

  const statItems = [
    {
      label: 'Всего курсов',
      value: statistics.totalCourses,
      icon: <BookOpen />,
    },
    {
      label: 'Публичных курсов',
      value: statistics.publicCourses,
      icon: <Eye />,
    },
    {
      label: 'Приватных курсов',
      value: statistics.privateCourses,
      icon: <Lock />,
    },
    {
      label: 'Самый популярный курс',
      value: statistics.mostPopularCourse,
      icon: <Star />,
    },
    {
      label: 'Самый рейтинговый курс',
      value: statistics.highestRatedCourse,
      icon: <Star />,
    },
    {
      label: 'Подписчиков на курсы',
      value: statistics.totalSubscribers,
      icon: <Users />,
    },
    {
      label: 'Прошли курсы до конца',
      value: statistics.totalCompletedStudents,
      icon: <CheckCircle />,
    },
    {
      label: 'Всего отзывов',
      value: statistics.totalReviews,
      icon: <MessageSquare />,
    },
    {
      label: 'Средний рейтинг курсов',
      value: statistics.averageRating,
      icon: <Award />,
    },
    {
      label: 'Среднее количество частей на курс',
      value: statistics.averagePartsPerCourse,
      icon: <Clipboard />,
    },
    {
      label: 'Средний процент завершения',
      value: statistics.averageCompletion,
      icon: <Layers />,
    },
  ];

  const categories = ['Computer Science', 'Music', 'Filming', 'Engineering', 'Other'];

  const completeCategoryData = categories.map((category) => {
    const categoryDataItem = statistics.categoryData?.find((item) => item.name === category);
    return {
      name: category,
      value: categoryDataItem ? categoryDataItem.value : 0,
      percentage: categoryDataItem ? parseFloat(categoryDataItem.percentage.toFixed(1)) : 0,
    };
  });

  return (
    <div className="teacherAnalytics">
      <h1>📊 Статистика учителя</h1>

      <div className="stats-grid">
        {statItems.map((item, idx) => (
          <div key={idx} className="stat-card">
            <div className="icon">{item.icon}</div>
            <div className="info">
              <div className="label">{item.label}</div>
              <div className="value">
                {typeof item.value === 'number' ? (
                  <CountUp end={item.value} duration={2} />
                ) : (
                  item.value || '—'
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-section">
          <h2>🔵 Соотношение публичных и приватных курсов</h2>
          <div className="pie-chart">
            <PieChart width={300} height={300}>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* Диаграмма категорий */}
        <div className="chart-section">
          <h2>📊 Распределение курсов по категориям</h2>
          <div className="pie-chart">
            <PieChart width={300} height={300}>
              <Pie
                data={completeCategoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="percentage"
                label>
                {completeCategoryData.map((entry, index) => (
                  <Cell key={`category-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAnalytics;
