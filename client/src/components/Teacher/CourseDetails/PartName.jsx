import React from 'react';

const PartName = ({ svg, title }) => {
  return (
    <div className="course-details-inputs-info">
      <div>{svg}</div>

      <span>{title}</span>
    </div>
  );
};

export default PartName;
