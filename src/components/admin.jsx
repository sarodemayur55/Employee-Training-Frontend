import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import Admin from './section-components/admin';
import Footer from './global-components/footer-v2';

const AdminPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Admin"  />
        <Admin />
        <Footer />
    </div>
}

export default AdminPage

