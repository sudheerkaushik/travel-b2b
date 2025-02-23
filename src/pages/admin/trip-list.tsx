
import React, { useState, useEffect } from "react";
import TripItem from "../../app/components/common/trip-item";
import Adminlinks from "@/app/components/admin/links";
import AdminLayout from "../AdminLayout";

const TripList = () => {
  interface Trip {
    id: string | number;
    destination: string;
    price: number;
    margin: number;
    date: string;
    duration: number;
    description: string;
    imageUrl: string;
    transport: string;
    // Add other properties of Trip here
  }

  const [trips, setTrips] = useState<Trip[]>([]);

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



  return (
    <div className="container-fluid py-3">
      <div className="row">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip.id} className="col-12 mb-4">
              <TripItem trip={trip} />
            </div>
          ))
        ) : (
          <p className="text-center">No trips available</p>
        )}
      </div>
    </div>
  );
};

TripList.layout = AdminLayout;

export default TripList;
