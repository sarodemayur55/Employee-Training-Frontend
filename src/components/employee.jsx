import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import Employee from './section-components/employee';
import Footer from './global-components/footer-v2';

const EmployeePage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Employee"  />
        <Employee />
        <Footer />
    </div>
}

export default EmployeePage

