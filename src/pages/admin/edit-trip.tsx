// import Adminlinks from "@/app/components/admin/links";
// import { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// type Trip = {
//   id: string;
//   destination: string;
//   price: string;
//   margin: string;
//   date: string;
//   transport: string;
//   duration: string;
//   description: string;
//   isAvailable: boolean;
// };

// export default function TripsManager() {
//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchTrips = async () => {
//       const response = await fetch("/api/trips/trips");
//       const data = await response.json();
//       setTrips(data);
//     };

//     fetchTrips();
//   }, []);

//   const handleEditClick = (trip: Trip) => {
//     setEditingTrip(trip);
//     setShowModal(true);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     if (!editingTrip) return;

//     const { name, value } = e.target;
//     setEditingTrip((prev) => ({ ...prev!, [name]: value }));
//   };

//   const handleSave = async () => {
//     if (!editingTrip) return;

//     const response = await fetch(`/api/trips/trips`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(editingTrip),
//     });

//     if (!response.ok) {
//       alert("Failed to update the trip");
//       return;
//     }

//     const updatedData = await response.json();

//     setTrips((prev) =>
//       prev.map((t) => (t.id === updatedData.trip.id ? updatedData.trip : t))
//     );
//     setEditingTrip(null);
//     setShowModal(false);
//     alert("Trip updated successfully!");
//   };

//   return (
//     <div className="container-fluid row justify-content-center p-0">
//       <h1 className="text-center mb-4 mt-5">Manage Trips</h1>
//       <div className="col-3 ms-3">
//          <Adminlinks/>
//         </div>
//       <div className="p-0 col-8 ms-5 ">

//         {trips.map((trip) => (
//         <div className=" bg-white mb-2 d-flex shadow rounded-3">
//           <img className="img-fluid w-25 m-0 p-0 trip-image rounded-start-3" src={trip.imageUrl} alt="" />
//           <div className="p-4 w-75">
//             <div className="d-flex justify-content-between mb-3">
//               <small className="m-0">
//                 <i className="fa fa-map-marker-alt text-primary mr-2"></i>
//                 {trip.destination}
//               </small>
//               <small className="m-0">
//                 <i className="fa fa-calendar-alt text-primary mr-2"></i>
//                 {trip.duration} days
//               </small>
//               <small className="m-0">
//                 <i className="fa fa-user text-primary mr-2"></i>2 Person
//               </small>
//             </div>
//             <a className="h5 text-decoration-none trip-description" href="#">
//               {trip.description.length > 100 ? trip.description.substring(0, 100) + "..." : trip.description}
//             </a>
//             <div className="border-top mt-4 pt-4">
//               <div className="d-flex justify-content-between">
//                 <h6 className="m-0">
//                   <i className="fa fa-star text-primary mr-2"></i>4.5 <small>(250)</small>
//                 </h6>
//                 <h5 className="m-0">${trip.price}</h5>
//                 <button
//                   className="btn btn-primary col-2 shadow rounded-2"
//                   onClick={() => handleEditClick(trip)}
//                 >
//                   Edit
//                 </button>
                
//               </div>
//             </div>
//           </div>
//         </div>
//         ))}
//       </div>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Trip</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {editingTrip && (
//             <Form>
//               {[
//                 { label: "Destination", name: "destination", type: "text" },
//                 { label: "Price", name: "price", type: "number" },
//                 { label: "Margin", name: "margin", type: "number" },
//                 { label: "Date", name: "date", type: "date" },
//                 { label: "Duration (days)", name: "duration", type: "number" },
//               ].map((field) => (
//                 <Form.Group key={field.name} className="mb-3">
//                   <Form.Label>{field.label}</Form.Label>
//                   <Form.Control
//                     type={field.type}
//                     name={field.name}
//                     value={editingTrip[field.name]}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               ))}

//               <Form.Group className="mb-3">
//                 <Form.Label>Transport</Form.Label>
//                 <Form.Select
//                   name="transport"
//                   value={editingTrip.transport}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select transport</option>
//                   <option value="Bus">Bus</option>
//                   <option value="Train">Train</option>
//                   <option value="Flight">Flight</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   name="description"
//                   rows={3}
//                   value={editingTrip.description}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3 d-flex align-items-center">
//                 <Form.Check
//                   type="checkbox"
//                   name="isAvailable"
//                   checked={editingTrip.isAvailable}
//                   onChange={(e) =>
//                     setEditingTrip({ ...editingTrip, isAvailable: e.target.checked })
//                   }
//                 />
//                 <Form.Label className="ms-2">Available</Form.Label>
//               </Form.Group>

//               <Button variant="success" onClick={handleSave}>
//                 Save Changes
//               </Button>
//             </Form>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }
import Adminlinks from "@/app/components/admin/links";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Image from "next/image";

type Trip = {
  id: string;
  destination: string;
  price: string;
  margin: string;
  date: string;
  transport: string;
  duration: string;
  description: string;
  isAvailable: boolean;
  imageUrl: string;
};

export default function TripsManager() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch("/api/trips/trips");
      const data = await response.json();
      setTrips(data);
    };

    fetchTrips();
  }, []);

  const handleEditClick = (trip: Trip) => {
    setEditingTrip(trip);
    setShowModal(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!editingTrip) return;

    const { name, value } = e.target;
    setEditingTrip((prev) => ({ ...prev!, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingTrip) return;

    const response = await fetch(`/api/trips/trips`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingTrip),
    });

    if (!response.ok) {
      alert("Failed to update the trip");
      return;
    }

    const updatedData = await response.json();

    setTrips((prev) =>
      prev.map((t) => (t.id === updatedData.trip.id ? updatedData.trip : t))
    );
    setEditingTrip(null);
    setShowModal(false);
    alert("Trip updated successfully!");
  };

  return (
    <div className="container-fluid row justify-content-center p-0">
      <h1 className="text-center mb-4 mt-5">Manage Trips</h1>
      <div className="col-3 ms-3">
        <Adminlinks />
      </div>
      <div className="p-0 col-8 ms-5 ">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white mb-2 d-flex shadow rounded-3">
            <div className="position-relative w-25 m-0 p-0 trip-image rounded-start-3">
              <Image
                src={trip.imageUrl}
                alt={trip.destination}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
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
                {trip.description.length > 100
                  ? trip.description.substring(0, 100) + "..."
                  : trip.description}
              </a>
              <div className="border-top mt-4 pt-4">
                <div className="d-flex justify-content-between">
                  <h6 className="m-0">
                    <i className="fa fa-star text-primary mr-2"></i>4.5{" "}
                    <small>(250)</small>
                  </h6>
                  <h5 className="m-0">${trip.price}</h5>
                  <button
                    className="btn btn-primary col-2 shadow rounded-2"
                    onClick={() => handleEditClick(trip)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingTrip && (
            <Form>
              {[
                { label: "Destination", name: "destination", type: "text" },
                { label: "Price", name: "price", type: "number" },
                { label: "Margin", name: "margin", type: "number" },
                { label: "Date", name: "date", type: "date" },
                { label: "Duration (days)", name: "duration", type: "number" },
              ].map((field) => (
                <Form.Group key={field.name} className="mb-3">
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    name={field.name}
                    // value={(editingTrip as any )[field.name]}
                    value={editingTrip as unknown as keyof Trip}

                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              ))}

              <Form.Group className="mb-3">
                <Form.Label>Transport</Form.Label>
                <Form.Select
                  name="transport"
                  value={editingTrip.transport}
                  onChange={handleChange}
                >
                  <option value="">Select transport</option>
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Flight">Flight</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  value={editingTrip.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  name="isAvailable"
                  checked={editingTrip.isAvailable}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      isAvailable: e.target.checked,
                    })
                  }
                />
                <Form.Label className="ms-2">Available</Form.Label>
              </Form.Group>

              <Button variant="success" onClick={handleSave}>
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
