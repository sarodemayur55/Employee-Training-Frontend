import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV5 extends Component {

    render() {

        // let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="about-area pd-top-80">
			  <div className="container">
			    <div className="about-area-inner">
			      <div className="row">
			        <div className="col-lg-6 align-self-center">
			          <img src={ "assets/img/about/5.png"} alt="img" />
			        </div>
			        <div className="col-lg-6 align-self-center">
			          <div className="about-inner-wrap">  
			            <div className="section-title mb-0">
			              {/* <h6 className="sub-title style-btn"></h6> */}
			              <h2 className="title">More scalable and adaptable</h2>
			              <p className="content">Our best employee training system offers better scalability and flexibility. With the increase in the number of users, a traditional method requires more booklets to print, more training, and admin cost. At the same time, a corporate LMS is easier to scale than traditional training programs. You can create courses, and deploy new training programs quickly.</p>
			             
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default AboutV5