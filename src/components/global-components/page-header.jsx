import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Page_header extends Component {

    render() {

        let HeaderTitle = this.props.headertitle;
        // let publicUrl = process.env.PUBLIC_URL+'/'
        let Subheader = this.props.subheader ? this.props.subheader : HeaderTitle

        return (


	<div className="breadcrumb-area bg-black bg-overlay">
	  <div className="container mt-4">
	    <div className="breadcrumb-inner">
	      <div className="section-title mb-0 text-center">
	        <h2 className="page-title" style={{color: 'black'}}>{ HeaderTitle }</h2>
	        <ul className="page-list">
	          <li><Link to="/" style={{color: 'black'}}>Home</Link></li>
	          {/* <li>{ Subheader }</li> */}
	        </ul>
	      </div>
	    </div>
	  </div>
	</div>



        )
    }
}


export default Page_header