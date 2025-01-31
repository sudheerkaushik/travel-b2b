import React, { useState, useEffect } from "react";
import TripItem from "../common/trip-item";

const TopPackages = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("/api/trips/trips"); // Fetch from API
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="container-fluid py-3">
      <div className="row">
        <div className="col-12 text-center mb-3 pb-3">
          <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Packages</h6>
          <h1>Perfect Tour Packages</h1>
        </div>
        <div className="row">
          {trips.length > 0 ? (
            trips.map((trip) => (
              <div key={trip.id} className="col-lg-12 mb-4">
                <TripItem trip={trip} />
              </div>
            ))
          ) : (
            <p className="text-center">No trips available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopPackages;
