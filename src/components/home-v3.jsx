import React from 'react';
import Footer from './global-components/footer-v2';
import Navbar from './global-components/navbar-v3';
import Banner from './section-components/banner-v3';
import Intro from './section-components/intro-v3';
import FeaturedCourse from './section-components/course-featured-v2';
import AboutV4 from './section-components/about-v4';
import AboutV5 from './section-components/about-v5';
import Team from './section-components/team-v2';
const Home_V2 = () => {
    return <div>
          <Navbar />
        <Banner />
        <Intro />
        {/* <FeaturedCourse /> */}
        <AboutV4 />
        <AboutV5 />
        {/* <Team /> */}
        <Footer />
    </div>
}

export default Home_V2

