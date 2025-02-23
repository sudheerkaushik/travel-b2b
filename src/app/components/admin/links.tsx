import React from "react";
import Link from "next/link";

const AdminLinks = () => {
  return (
    <div id="list-example" className="list-group">
      <Link className="list-group-item list-group-item-action" href="/">Home</Link>
      <Link className="list-group-item list-group-item-action" href="/admin/agent-list">Enqiries</Link>
      <Link className="list-group-item list-group-item-action" href="/admin/trip-list">Trip List</Link>
      <Link className="list-group-item list-group-item-action" href="/admin/edit-trip">Edit Trip</Link>
      <Link className="list-group-item list-group-item-action" href="/admin/add-trip">Add Trip</Link>
    </div>
  );
};

export default AdminLinks;
