import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import Vclassroom from './section-components/vclassroom';
import Footer from './global-components/footer-v2';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Virtual Classroom"  />
        <Vclassroom />
        <Footer />
    </div>
}

export default AboutPage

