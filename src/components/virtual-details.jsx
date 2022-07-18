import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
// import CourseDetails from './section-components/course-details';
import VirtualDetails from './section-components/virtual-details';
import Footer from './global-components/footer-v2';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Virtual Classroom"  />
        <VirtualDetails />
        <Footer />
    </div>
}

export default AboutPage

