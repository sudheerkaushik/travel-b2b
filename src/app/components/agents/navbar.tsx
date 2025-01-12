import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AgentNavigation = () => {
  return (
    <>
    <div className="container-fluid bg-light pt-3 d-none d-lg-block">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
                    <div className="d-inline-flex align-items-center">
                        <p><i className="fa fa-envelope mr-2"></i>info@nodeascend.com</p>
                        <p className="text-body px-3">|</p>
                        <p><i className="fa fa-phone-alt mr-2"></i>+91-9582818240</p>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-primary px-3" href="">
                            <FontAwesomeIcon className="fab fa-facebook-f" />
                        </a>
                        <a className="text-primary px-3" href="">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="text-primary px-3" href="">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a className="text-primary px-3" href="">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="text-primary pl-3" href="">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="container-fluid position-relative nav-bar p-0" style={{ zIndex: '1000' }}>
        <div className="container-lg position-relative p-0 px-lg-3">
            <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-lg py-3 py-lg-0 pl-3 pl-lg-5">
                <a href="/agents" className="navbar-brand">
                    <h1 className="m-0 text-primary"><span className="text-dark">TRAVEL</span>ER</h1>
                </a>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
                    <div className="navbar-nav ml-auto py-0">
                        <a href="/agents/search-trip" className="nav-item nav-link active">Home</a>
                        <a href="/agents/trip-list" className="nav-item nav-link mr-2">Trips</a>
                        {/* <a href="service.html" className="nav-item nav-link">Services</a> */}
                        {/* <a href="package.html" className="nav-item nav-link">Tour Packages</a> */}
                        {/* <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu border-0 rounded-0 m-0">
                                <a href="blog.html" className="dropdown-item">Blog Grid</a>
                                <a href="single.html" className="dropdown-item">Blog Detail</a>
                                <a href="destination.html" className="dropdown-item">Destination</a>
                                <a href="guide.html" className="dropdown-item">Travel Guides</a>
                                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                            </div>
                        </div> */}
                        <a href="/agents/login" className="nav-item nav-link btn btn-primary text-white">Login</a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    </>
  );
};

export default AgentNavigation;
