import Image from "next/image";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Trip {
  destination: string;
  price: number;
  margin: number;
  date: string;
  transport: string;
  duration: number;
  imageUrl: string;
  description: string;
}

const TripItem: React.FC<{ trip: Trip }> = ({ trip }) => {

  const [trips, setTrips] = useState<Trip[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    destination: trip.destination || "",
    price: trip.price || "",
    margin: trip.margin || "",
    date: trip.date || "",
    transport: trip.transport || "",
    duration: trip.duration || "",
    agentName: "",
    contactNumber: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: string | number) => {
    try {
      const response = await fetch(`/api/trips/trips?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTrips(trips.filter((trip) => trip.id !== id)); // Remove deleted trip from state
        console.log("Trip deleted successfully");
      } else {
        console.error("Error deleting trip");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Form Data:", formData); // Debugging: Log form data before sending

    try {
      const enquiryResponse = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await enquiryResponse.json();

      console.log("Response Status:", data); // Debug response status

      if (enquiryResponse.status === 201) {
        console.log("Enquiry submitted successfully!");
        setShowModal(false);
      } else {
        const errorData = await enquiryResponse.json();
        console.error("Server Error:", errorData); // Log error response
        console.log(`Failed to submit enquiry: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
  };

  return (
    <>
      {trip && (
        <div className="package-item bg-white mb-2 d-flex shadow rounded-3">
          <Image width={500} height={500} className="img-fluid w-25 trip-image rounded-start-3" src={trip.imageUrl} alt="" />
          <div className="p-4 w-75">
            <div className="d-flex justify-content-between mb-3">
              <small className="m-0">
                <i className="fa fa-map-marker-alt text-primary mr-2"></i>
                {trip.destination}
              </small>
              <small className="m-0">
                <i className="fa fa-calendar-alt text-primary mr-2"></i>
                {trip.duration} days
              </small>
              <small className="m-0">
                <i className="fa fa-user text-primary mr-2"></i>2 Person
              </small>
            </div>
            <a className="h5 text-decoration-none trip-description" href="#">
              {trip.description.length > 100 ? trip.description.substring(0, 100) + "..." : trip.description}
            </a>
            <div className="border-top mt-4 pt-4">
              <div className="d-flex justify-content-between">
                <h6 className="m-0">
                  <i className="fa fa-star text-primary mr-2"></i>4.5 <small>(250)</small>
                </h6>
                <h5 className="m-0">${trip.price}</h5>
                <button className="btn btn-primary shadow rounded-2" onClick={() => setShowModal(true)}>
                  Book Now
                </button>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="btn btn-danger shadow rounded-2 mt-2"
                >
                  Delete Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enquiry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row" onSubmit={handleSubmit}>
            {/* Read-Only Trip Details */}
            {[
              { label: "Destination", name: "destination", type: "text", readOnly: true },
              { label: "Price", name: "price", type: "number", readOnly: true },
              { label: "Duration", name: "duration", type: "number", readOnly: true },
              { label: "Transport", name: "transport", type: "text", readOnly: true },
            ].map((field) => (
              <Form.Group className="mb-3 col-6" key={field.name}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  readOnly={field.readOnly}
                />
              </Form.Group>
            ))}

            {/* Editable Fields for Agent */}
            <Form.Group className="mb-3 col-6">
              <Form.Label>Agent Name</Form.Label>
              <Form.Control
                type="text"
                name="agentName"
                value={formData.agentName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 col-6">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 col-6">
              <Form.Label>Margin</Form.Label>
              <Form.Control
                type="text"
                name="Margin"
                value={formData.margin}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-6">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-6">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="success" className="col-6 offset-3 btn btn-lg mt-4" type="submit">
              Submit Enquiry
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TripItem;
