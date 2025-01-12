import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TripItem from "../common/trip-item";

const TopPackages = () => {
  return (
    <>
     <div className="container-fluid py-3">
        <div className="container pt-5 pb-3">
            <div className="text-center mb-3 pb-3">
                <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Packages</h6>
                <h1>Pefect Tour Packages</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 mb-4">
                  <TripItem />
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default TopPackages;
