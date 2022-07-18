import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV4 extends Component {

    render() {

        // let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="about-area pd-top-100 pd-bottom-100" style={{backgroundImage: 'url("'+ 'assets/img/bg/2.png")'}}>
			  <div className="container">
			    <div className="about-area-inner">
			      <div className="row">
			        <div className="col-lg-6 order-lg-12 align-self-center">
			          <img src={ "assets/img/about/4.png"} alt="img" />
			        </div>
			        <div className="col-lg-6 order-lg-1 align-self-center mt-4 mt-lg-0">
			          <div className="about-inner-wrap">  
			            <div className="section-title mb-0">
			              {/* <h6 className="sub-title style-btn">It saves time and cost</h6> */}
			              <h2 className="title">It saves time and cost</h2>
			              <p className="content">It improves the training effectiveness and reduces the cost, which results in better ROI. It increases the profitability and productivity of your organization.</p>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default AboutV4