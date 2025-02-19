import React from "react";
import Link from "next/link";

const AdminLinks = () => {
  return (
    <div id="list-example" className="list-group">
      <Link className="list-group-item list-group-item-action" href="/agent-list">Agents List</Link>
      <Link className="list-group-item list-group-item-action" href="/trip-list">Trip List</Link>
      <Link className="list-group-item list-group-item-action" href="/edit-trip">Edit Trip</Link>
      <Link className="list-group-item list-group-item-action" href="/add-trip">Add Trip</Link>
      <Link className="list-group-item list-group-item-action" href="/">Home</Link>
    </div>
  );
};

export default AdminLinks;
