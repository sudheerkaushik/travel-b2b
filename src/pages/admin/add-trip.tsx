import React, { useState } from "react";
import Alert from '../../app/components/common/alert';

const AddTrip = () => {
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    destination: "",
    price: "",
    margin: "",
    date: "",
    transport: "",
    duration: "",
    description: "",
    isAvailable: true,
    image: "", // To store the image URL
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // File for uploading

  const closeAlert = () => setAlert(null);

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
        const base64 = reader.result?.toString().split(',')[1];
        if (!base64) return;

        const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: base64, fileType: file.type }),
        });

        const data = await res.json();
        setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
    };
};



  const handleSubmit = async (e : any) => {
    console.log(formData, ' ', e);
    e.preventDefault();
    try {

      const tripResponse = await fetch("/api/trips/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const trip = await tripResponse.json();
      console.log(tripResponse);
  

      if (tripResponse.status === 201) {
        setAlert({
          type: "success",
          message: "Trip added successfully!",
        });
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
        setImageFile(null);
      } else {
        throw new Error("Failed to add trip");
      }
    } catch (error) {
      console.error("Error adding trip:", error);
      setAlert({
        type: "error",
        message: "Failed to add trip. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {alert && (
        <Alert type={alert.type} message={alert.message} onClose={closeAlert} />
      )}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add a New Trip
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-center">
          {/* Input fields for form data */}
          {[
            { label: "Destination", name: "destination", type: "text" },
            { label: "Price", name: "price", type: "number" },
            { label: "Margin", name: "margin", type: "number" },
            { label: "Date", name: "date", type: "date" },
            { label: "Duration (days)", name: "duration", type: "number" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-600">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Transport
            </label>
            <select
              name="transport"
              value={formData.transport}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select transport</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Trip Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                console.log(e.target.files);
                if (e.target.files) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrip;
