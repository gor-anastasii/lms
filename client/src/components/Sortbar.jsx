import React, { useState } from 'react';

const Sortbar = () => {
  const [activeSort, setActiveSort] = useState(0);
  const sortValue = [
    { value: 'Все', img: null },
    { value: 'Computer Science', img: '/img/science.png' },
    { value: 'Engineering', img: '/img/engineering.png' },
    { value: 'Filming', img: '/img/camera.png' },
    { value: 'Music', img: '/img/musical-note.png' },
  ];

  return (
    <div className="sort">
      <ul>
        {sortValue.map((item, i) => {
          return (
            <li
              key={i}
              className={i === activeSort ? 'active-sort' : ''}
              onClick={() => setActiveSort(i)}>
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
