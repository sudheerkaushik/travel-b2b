import React, { useState, useEffect } from "react";

const Adminlinks = () => {
  return (
    <div className="col-3 ms-3">
    <div id="list-example" className="list-group">
      {/* <a className="list-group-item list-group-item-action" href="#list-item-1">Agents List</a> */}
      <a className="list-group-item list-group-item-action" href="/admin/trip-list">Trip List</a>
      <a className="list-group-item list-group-item-action" href="/admin/add-trip">Add Trip</a>
      <a className="list-group-item list-group-item-action" href="/admin/edit-trip">Edit Trip</a>
    </div>
  </div>
  );
};

export default Adminlinks;