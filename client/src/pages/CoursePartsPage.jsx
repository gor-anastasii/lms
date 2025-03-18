import React from 'react';
import NavbarCourse from '../components/Navbar/NavbarCourse';
import Header from '../components/Header/Header';
import { svgIconArrow } from '../utils/svgIcons';

const CoursePartsPage = () => {
  return (
    <>
      <Header />
      <main>
        <NavbarCourse />

        <div className="content course-part-content">
          <div className="course-part-container">
            <iframe
              src="https://www.youtube.com/embed/V4ehh7e0VJg?start=2869"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>

            <div className="course-part-info">
              <h2>Part1</h2>
              <button>Завершить {svgIconArrow()}</button>
            </div>

            <div className="course-part-desc">
              <p>
                - Introduction - Overview of the Technology Stack - Required Skills - User Stories -
                Setting Up Next.js 15 and React 19 - Installing ShadCN/ui - Adding a Background
                Image with Tailwind - Creating a Business Card Homepage - Understanding Routing
                Groups, Layouts, and Templates - Implementing Page Routes - Designing the Header and
                Navigation - Custom Animations Using Tailwind - Implementing Light and Dark Mode
                with ShadCN/ui - Setting Up Sentry - Manual Sentry Setup for Next.js 15 RC -
                Creating Error and Global Error Files - Configuring Sentry Alerts and Logs -
                Designing a 404 Not Found Page
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CoursePartsPage;
