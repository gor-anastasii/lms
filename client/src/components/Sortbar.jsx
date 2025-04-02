import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesSearchFilter, loadCourses, setFilterTopic } from '../redux/slices/courseSlice';

const Sortbar = () => {
  const [activeSort, setActiveSort] = useState(0);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state.courses);

  const sortValue = [
    { value: 'Все', img: null },
    { value: 'Computer Science', img: '/img/science.png' },
    { value: 'Engineering', img: '/img/engineering.png' },
    { value: 'Filming', img: '/img/camera.png' },
    { value: 'Music', img: '/img/musical-note.png' },
  ];

  const handleFilter = (i, filterValue) => {
    setActiveSort(i);
    const currentQuery = searchQuery.trim();
    dispatch(setFilterTopic(filterValue));
    const fetchParams = { userData: token, query: currentQuery };

    if (filterValue === 'Все') {
      if (currentQuery === '') {
        dispatch(loadCourses(token));
      } else {
        dispatch(fetchCoursesSearchFilter({ ...fetchParams, topic: '' }));
      }
    } else {
      dispatch(fetchCoursesSearchFilter({ ...fetchParams, topic: filterValue }));
    }
  };

  return (
    <div className="sort">
      <ul>
        {sortValue.map((item, i) => {
          return (
            <li
              key={i}
              className={i === activeSort ? 'active-sort' : ''}
              onClick={() => handleFilter(i, item.value)}>
              {item.img && <img src={item.img} alt="sort" />}
              <span>{item.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sortbar;
