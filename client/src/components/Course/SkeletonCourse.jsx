import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonCourse = () => (
  <ContentLoader
    speed={2}
    width={246}
    height={272}
    viewBox="0 0 246 272"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="12" y="12" rx="12" ry="12" width="222" height="123" />
    <rect x="12" y="148" rx="6" ry="6" width="220" height="24" />
    <rect x="12" y="179" rx="6" ry="6" width="119" height="17" />
    <rect x="12" y="203" rx="6" ry="6" width="94" height="24" />
    <rect x="172" y="203" rx="6" ry="6" width="62" height="24" />
    <rect x="12" y="236" rx="6" ry="6" width="85" height="24" />
  </ContentLoader>
);

export default SkeletonCourse;
