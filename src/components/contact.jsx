import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import ContactPage from './section-components/contact-page';
import Footer from './global-components/footer-v2';

const Contact = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Contact"  />
        <ContactPage />
        <Footer />
    </div>
}

export default Contact

