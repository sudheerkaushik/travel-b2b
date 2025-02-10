// import React, { useState } from "react";
// import Alert from '../../app/components/common/alert';

// const AddEnquiry = () => {
//   const [alert, setAlert] = useState(null);
//   const [formData, setFormData] = useState({
//     destination: "",
//     price: "",
//     margin: "",
//     date: "",
//     transport: "",
//     duration: "",
//     description: "",
//     isAvailable: true,
//   });

//   const closeAlert = () => setAlert(null);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

// //   const handleSubmit = async (e: any) => {
// //     console.log(formData, ' ', e);
// //     e.preventDefault();
// //     try {
// //       const enquiryResponse = await fetch("/api/enquiries", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       const enquiry = await enquiryResponse.json();
// //       console.log(enquiryResponse);

// //       if (enquiryResponse.status === 201) {
// //         setAlert({
// //           type: "success",
// //           message: "Enquiry added successfully!",
// //         });
// //         setFormData({
// //           destination: "",
// //           price: "",
// //           margin: "",
// //           date: "",
// //           transport: "",
// //           duration: "",
// //           description: "",
// //           isAvailable: true,
// //         });
// //       } else {
// //         throw new Error("Failed to add enquiry");
// //       }
// //     } catch (error) {
// //       console.error("Error adding enquiry:", error);
// //       setAlert({
// //         type: "error",
// //         message: "Failed to add enquiry. Please try again.",
// //       });
// //     }
// //   };
// const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const enquiryResponse = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
  
//       const contentType = enquiryResponse.headers.get("Content-Type");
  
//       if (contentType && contentType.includes("application/json")) {
//         const enquiry = await enquiryResponse.json();
//         console.log(enquiry);
  
//         if (enquiryResponse.status === 201) {
//           setAlert({
//             type: "success",
//             message: "Enquiry added successfully!",
//           });
//           setFormData({
//             destination: "",
//             price: "",
//             margin: "",
//             date: "",
//             transport: "",
//             duration: "",
//             description: "",
//             isAvailable: true,
//           });
//         } else {
//           throw new Error("Failed to add enquiry");
//         }
//       } else {
//         throw new Error("Response is not JSON");
//       }
//     } catch (error) {
//       console.error("Error adding enquiry:", error);
//       setAlert({
//         type: "error",
//         message: "Failed to add enquiry. Please try again.",
//       });
//     }
//   };
  
  
//   return (
//     <section className="container mx-auto">
//       <div className="row mt-5 justify-center items-center min-h-screen">
//         {alert && (
//           <Alert type={alert.type} message={alert.message} onClose={closeAlert} />
//         )}
//         <div className="col-3 ms-3">
//           <div id="list-example" className="list-group">
//             <a className="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
//             <a className="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
//             <a className="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
//             <a className="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
//           </div>
//         </div>
//         <div className="col-7">
//           <h1>
//             Add a New Enquiry
//           </h1>
//           <form onSubmit={handleSubmit} className="row space-y-4 text-center">
//             {/* Input fields for form data */}
//             {[ 
//               { label: "Destination", name: "destination", type: "text" },
//               { label: "Price", name: "price", type: "number" },
//               { label: "Margin", name: "margin", type: "number" },
//               { label: "Date", name: "date", type: "date" },
//               { label: "Duration (days)", name: "duration", type: "number" },
//             ].map((field) => (
//               <div key={field.name} className="form-floating mb-3 col-8 ">
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleInputChange}
//                   required
//                   id="floatingInput"
//                   className="form-control border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <label htmlFor="floatingInput" className="ms-3 block text-sm font-medium text-gray-600">
//                   {field.label}
//                 </label>
//               </div>
//             ))}

//             <div className="form-floating col-8">
//               <select
//                 id="floatingSelect"
//                 aria-label="Floating label select example"
//                 name="transport"
//                 value={formData.transport}
//                 onChange={handleInputChange}
//                 className="form-select border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select transport</option>
//                 <option value="Bus">Bus</option>
//                 <option value="Train">Train</option>
//                 <option value="Flight">Flight</option>
//               </select>
//               <label htmlFor="floatingSelect" className="ms-3">
//                 Transport
//               </label>
//             </div>

//             <div className="form-floating col-8 mt-3">
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={4}
//                 id="floatingTextarea2"
//                 className="form-control border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               ></textarea>
//               <label htmlFor="floatingInput" className="ms-3">
//                 Description
//               </label>
//             </div>

//             <div className="flex items-center ">
//               <input
//                 type="checkbox"
//                 name="isAvailable"
//                 checked={formData.isAvailable}
//                 onChange={(e) =>
//                   setFormData({ ...formData, isAvailable: e.target.checked })
//                 }
//                 className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label className="ml-2 text-sm font-medium text-gray-600">
//                 Available
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="btn btn-success rounded-2 col-3 ms-3 transition duration-200"
//             >
//               Add Enquiry
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddEnquiry;
