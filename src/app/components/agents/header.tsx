import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AgentHeader = () => {
  return (
    <>
    
    <div className="container-fluid p-0">
        <div id="header-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src="../img/carousel-1.jpg" alt="Image" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: '900px' }}>
                        <h4 className="text-white text-uppercase mb-md-3">Tours & Travel</h4>
                        <h1 className="display-3 text-white mb-md-4">Let's Discover The World Together</h1>
                        <a href="" className="btn btn-primary py-md-3 px-md-5 mt-2">Book Now</a>
                      </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src="../img/carousel-2.jpg" alt="Image" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: '900px' }}>
                            <h4 className="text-white text-uppercase mb-md-3">Tours & Travel</h4>
                            <h1 className="display-3 text-white mb-md-4">Discover Amazing Places With Us</h1>
                            <a href="" className="btn btn-primary py-md-3 px-md-5 mt-2">Book Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                    <span className="carousel-control-prev-icon mb-n2"></span>
                </div>
            </a>
            <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                    <span className="carousel-control-next-icon mb-n2"></span>
                </div>
            </a>
        </div>
    </div>
     <div className="container-fluid booking mt-5 pb-5">
     <div className="container pb-5">
         <div className="bg-light shadow p-3">
           <div className="row align-items-center" style={{ minHeight: '60px' }}>
             <div className="col-md-10">
               <div className="row">
                 <div className="col-md-3">
                   <div className="mb-3 mb-md-0">
                     <select className="custom-select px-4" style={{ height: '47px' }}>
                       <option selected>Destination</option>
                       <option value="1">Destination 1</option>
                       <option value="2">Destination 1</option>
                       <option value="3">Destination 1</option>
                     </select>
                   </div>
                 </div>
                 <div className="col-md-3">
                   <div className="mb-3 mb-md-0">
                     <div className="date" id="date1" data-target-input="nearest">
                       <input type="text" className="form-control p-4 datetimepicker-input" placeholder="Depart Date" data-target="#date1" data-toggle="datetimepicker"/>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-3">
                   <div className="mb-3 mb-md-0">
                     <div className="date" id="date2" data-target-input="nearest">
                       <input type="text" className="form-control p-4 datetimepicker-input" placeholder="Return Date" data-target="#date2" data-toggle="datetimepicker"/>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-3">
                   <div className="mb-3 mb-md-0">
                     <select className="custom-select px-4" style={{ height: '47px' }}>
                       <option selected>Duration</option>
                       <option value="1">Duration 1</option>
                       <option value="2">Duration 1</option>
                       <option value="3">Duration 1</option>
                     </select>
                   </div>
                 </div>
               </div>
             </div>
             <div className="col-md-2">
               <button className="btn btn-primary btn-block" type="submit" style={{ height: '47px', marginTop: '-2px' }}>Submit</button>
             </div>
           </div>
           </div>
         </div>
     </div>
     </>
  );
};

export default AgentHeader;
