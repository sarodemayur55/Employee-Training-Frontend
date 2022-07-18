import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import SignUp from './section-components/sign-up';
import Footer from './global-components/footer-v2';

const SingUpPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Sign Up"  />
        <SignUp />
        <Footer />
    </div>
}

export default SingUpPage

