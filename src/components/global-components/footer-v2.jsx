import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer_v2 extends Component {

    componentDidMount() {
        // let publicUrl = process.env.PUBLIC_URL+'/'
        const minscript = document.createElement("script");
        minscript.async = true;
        minscript.src =   "assets/js/main.js";

        document.body.appendChild(minscript);
    }

    render() {

        // let publicUrl = process.env.PUBLIC_URL+'/'
        let imgattr = "Footer logo"

        return (
			<footer className="footer-area footer-area-2 bg-gray">
			  <div className="footer-top">
			    <div className="container">
			      <div className="row">
			        <div className="col-lg-3 col-md-6">
			          <div className="widget widget_about text-center">
			            <a href="index.html"><img src={ "assets/img/newmayur.png"} alt="img" /></a>
			            <div className="details">
			              <p>Mayur Pvt. Limited is a hub of passionate professionals who are dynamic in their mission and operate on call to action.</p>
			              
			            </div>
			          </div>
			        </div>
			        <div className="col-lg-3 col-md-6">
			          <div className="widget widget_contact">
			            <h4 className="widget-title">Contact Us</h4>
			            <ul className="details">
			              <li><i className="fa fa-map-marker" />120 Triose Street Baramati</li>
			              <li><i className="fa fa-envelope" /> info.contact@gmail.com</li>
			              <li><i className="fa fa-phone" /> +91 9876543210</li>
			            </ul>
			          </div>
			        </div>
			        <div className="col-lg-3 col-md-6">
			          <div className="widget widget_blog_list">
			            <h4 className="widget-title">News &amp; Blog</h4>
			            <ul>
			              <li>
			                <h6>Big Ideas Of Business Branding Info.</h6>
			                <span className="date"><i className="fa fa-calendar" />December 7, 2021</span>
			              </li>
			              <li>
			                <h6>Ui/Ux Ideas Of Business Branding Info.</h6>
			                <span className="date"><i className="fa fa-calendar" />December 7, 2021</span>
			              </li>
			            </ul>
			          </div>
			        </div>
			        <div className="col-lg-3 col-md-6">
			          <div className="widget widget_nav_menu">
			            <h4 className="widget-title">Features</h4>
			            <ul className="go-top">
			              <li>Useful for every industry</li>
			              <li>Cloud Integration</li>
			              <li>Easy to use</li>
			              <li>Boost onboarding programs</li>
			              {/* <li>Graphics design</li> */}
			            </ul>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</footer>

        )
    }
}


export default Footer_v2