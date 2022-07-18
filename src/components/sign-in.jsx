import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import SignIn from './section-components/sign-in';
import Footer from './global-components/footer-v2';

const SingInPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Sign In"  />
        <SignIn />
        <Footer />
    </div>
}

export default SingInPage

