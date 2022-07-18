import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import Trainer from './section-components/trainer';
import Footer from './global-components/footer-v2';
import { useAuthState,useAuth } from '../states/AuthState';
const TrainerPage = () => {
    const {first_name,last_name} = useAuthState()
    return <div>
        <Navbar />
        <PageHeader headertitle={`Hello ${first_name}  ${last_name}`}  />
        <Trainer />
        <Footer />
    </div>
}

export default TrainerPage

