import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterCoursesByTopic, loadCourses } from '../redux/slices/courseSlice';

const Sortbar = () => {
  const [activeSort, setActiveSort] = useState(0);
  const dispatch = useDispatch();

  const sortValue = [
    { value: 'Все', img: null },
    { value: 'Computer Science', img: '/img/science.png' },
    { value: 'Engineering', img: '/img/engineering.png' },
    { value: 'Filming', img: '/img/camera.png' },
    { value: 'Music', img: '/img/musical-note.png' },
  ];

  const handleFilter = (i, filterValue) => {
    setActiveSort(i);
    if (filterValue === 'Все') {
      dispatch(loadCourses());
    } else {
      dispatch(filterCoursesByTopic(filterValue));
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
