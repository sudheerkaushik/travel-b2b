import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const TripItem = () => {
  return (
    <div className="package-item bg-white mb-2 d-flex">
    <img className="img-fluid w-25" src="../img/package-1.jpg" alt="" />
    <div className="p-4 w-75">
        <div className="d-flex justify-content-between mb-3">
            <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2"></i>Thailand</small>
            <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2"></i>3 days</small>
            <small className="m-0"><i className="fa fa-user text-primary mr-2"></i>2 Person</small>
        </div>
        <a className="h5 text-decoration-none" href="">Discover amazing places of the world with us</a>
        <div className="border-top mt-4 pt-4">
            <div className="d-flex justify-content-between">
                <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>4.5 <small>(250)</small></h6>
                <h5 className="m-0">$350</h5>
                <button className="btn btn-primary">Book Now</button>
            </div>
        </div>
    </div>
</div>
  );
};

export default TripItem;
