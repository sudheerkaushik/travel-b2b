import React, { useState } from "react";
import Adminlinks from "@/app/components/admin/links";
import AdminLayout from "../AdminLayout";

type FormDataType = {
  destination: string;
  price: string;
  margin: string;
  date: string;
  transport: string;
  duration: string;
  description: string;
  isAvailable: boolean;
  image: string;
};

const AddTrip = () => {
  const [formData, setFormData] = useState<FormDataType>({
    destination: "",
    price: "",
    margin: "",
    date: "",
    transport: "",
    duration: "",
    description: "",
    isAvailable: true,
    image: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (!base64) return;

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64, fileType: file.type }),
      });

      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const tripResponse = await fetch("/api/trips/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await tripResponse.json();

      if (tripResponse.status === 201) {
     
        setFormData({
          destination: "",
          price: "",
          margin: "",
          date: "",
          transport: "",
          duration: "",
          description: "",
          isAvailable: true,
          image: "",
        });
      } else {
        throw new Error("Failed to add trip");
      }
    } catch (error) {
      console.error("Error adding trip:", error);
  
    }
  };

  return (
    <section className="container mx-auto">
      <div className="row mt-5 justify-center items-center min-h-screen">
        <div className="col-7">
          <h1>Add a New Trip</h1>
          <form onSubmit={handleSubmit} className="row space-y-4 text-center">
            {/* Input fields for form data */}
            {[
              { label: "Destination", name: "destination", type: "text" },
              { label: "Price", name: "price", type: "number" },
              { label: "Margin", name: "margin", type: "number" },
              { label: "Date", name: "date", type: "date" },
              { label: "Duration (days)", name: "duration", type: "number" },
            ].map((field) => (
              <div key={field.name} className="form-floating mb-3 col-8">
                <input
                  type={field.type}
                  name={field.name}
                  value={String(formData[field.name as keyof FormDataType])}
                  onChange={handleInputChange}
                  required
                  id="floatingInput"
                  className="form-control border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="floatingInput"
                  className="ms-3 block text-sm font-medium text-gray-600"
                >
                  {field.label}
                </label>
              </div>
            ))}

            <div className="form-floating col-8">
              <select
                id="floatingSelect"
                aria-label="Floating label select example"
                name="transport"
                value={formData.transport}
                onChange={handleInputChange}
                className="form-select border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select transport</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
              </select>
              <label htmlFor="floatingSelect" className="ms-3">
                Transport
              </label>
            </div>

            <div className="form-floating col-8 mt-3">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                id="floatingTextarea2"
                className="form-control border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <label htmlFor="floatingInput" className="ms-3">
                Description
              </label>
            </div>

            <div className="col-8 mt-3">
              <div className="form-floating position-relative">
                <input
                  type="file"
                  accept="image/*"
                  id="isAvailable"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                  className="form-control border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select a file"
                  style={{ paddingTop: "1.5rem" }}
                />
                <label htmlFor="isAvailable" className="form-check-label">
                  Trip Image
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData({ ...formData, isAvailable: e.target.checked })
                }
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-600">
                Available
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-success rounded-2 col-3 ms-3 transition duration-200"
            >
              Add Trip
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

AddTrip.layout = AdminLayout;

export default AddTrip;
