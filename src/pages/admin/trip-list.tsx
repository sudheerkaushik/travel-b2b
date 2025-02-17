import React, { useState, useEffect } from "react";
import TripItem from "../../app/components/common/trip-item";
import FilterComponent from "@/app/components/common/filter";
import Adminlinks from "@/app/components/admin/links";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("/api/trips/trips"); // Fetch from API
        const data = await response.json();
        setTrips(data);
        console.log("Trips fetched:", data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (id) => {
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

  return (
    <div className="container-fluid py-3">
      <div className="row ms-5">
        <div className="col-12 text-center mb-3 pb-3">
          <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Packages</h6>
          <h1>Perfect Tour Packages</h1>
        </div>
        <div className="col-12 col-md-3 mb-4 ps-5">
          {/* <FilterComponent /> */}
          <Adminlinks/>
        </div>
        <div className="col-12 col-md-9 ps-5">
          <div className="row">
            {trips.length > 0 ? (
              trips.map((trip) => (
                <div key={trip.id} className="col-12 col-md-10 mb-4">
                  <TripItem trip={trip} >

                  </TripItem>
                  <button
                    onClick={() => handleDelete(trip.id)}
                    className="btn btn-danger mt-2"
                  >
                    Delete Trip
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center">No trips available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripList;
