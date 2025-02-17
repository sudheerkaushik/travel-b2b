import React, { useState, useEffect } from "react";

const Adminlinks = () => {
  return (
    <div id="list-example" className="list-group">
    <a className="list-group-item list-group-item-action" href="agent-list">Agents List</a>
  <a className="list-group-item list-group-item-action" href="trip-list">Trip List</a>
  <a className="list-group-item list-group-item-action" href="edit-trip">Edit Trip</a>
  <a className="list-group-item list-group-item-action" href="add-trip">Add Trip</a>
  <a className="list-group-item list-group-item-action" href="/">home</a>
    </div>
  );
};

export default Adminlinks;