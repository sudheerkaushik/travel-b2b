import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type Trip = {
  id: string;
  name: string;
  location: string;
  price: number;
  itinerary: string;
  description: string;
  ratings: number;
  duration: string;
};

export default function EditTrip() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    // Fetch trip details by ID
    const fetchTrip = async () => {
      const response = await fetch(`/api/trips/${id}`);
      const data = await response.json();
      setTrip(data);
      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trip) return;

    // Update trip via API
    await fetch(`/api/trips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    });

    alert("Trip updated successfully!");
    router.push("/admin/trips");
  };

  if (loading) return <p>Loading...</p>;
  if (!trip) return <p>Trip not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Trip</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Trip Name</label>
          <input
            type="text"
            value={trip.name}
            onChange={(e) => setTrip({ ...trip, name: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            value={trip.location}
            onChange={(e) => setTrip({ ...trip, location: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            value={trip.price}
            onChange={(e) => setTrip({ ...trip, price: parseFloat(e.target.value) })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Itinerary</label>
          <textarea
            value={trip.itinerary}
            onChange={(e) => setTrip({ ...trip, itinerary: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={trip.description}
            onChange={(e) => setTrip({ ...trip, description: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ratings</label>
          <input
            type="number"
            value={trip.ratings}
            onChange={(e) => setTrip({ ...trip, ratings: parseFloat(e.target.value) })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            type="text"
            value={trip.duration}
            onChange={(e) => setTrip({ ...trip, duration: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
