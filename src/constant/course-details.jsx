import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import CourseDetails from './section-components/course-details';
import Footer from './global-components/footer-v2';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="E-Learning"  />
        <CourseDetails/>
        <CourseDetails/>
        <CourseDetails/>
        <Footer />
    </div>
}

export default AboutPage

