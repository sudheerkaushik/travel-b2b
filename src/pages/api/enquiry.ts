import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Import your prisma instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const enquiry = await prisma.enquiry.findMany();
        res.status(200).json(enquiry);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch enquiry", error });
      }

      break;

    case "POST":
      try {
        const {
          destination,
          price,
          margin,
          date,
          transport,
          duration,
          agentName,
          contactNumber,
          email,
        } = req.body;

        // Log incoming request data
        console.log("Incoming Enquiry Data:", req.body);

        // Validate required fields
        if (!destination || !price || !margin || !date || !transport || !duration || !agentName || !contactNumber || !email) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        // Validate if price, margin, duration are numbers
        if (isNaN(price) || isNaN(margin) || isNaN(duration)) {
          return res.status(400).json({ message: "Price, margin, and duration must be valid numbers" });
        }

        // Create the enquiry record in the database
        const newEnquiry = await prisma.enquiry.create({
          data: {
            destination,
            price: parseFloat(price),
            margin: parseFloat(margin),
            date: new Date(date),
            transport,
            duration: parseInt(duration, 10),
            agentName,
            contactNumber,
            email,
            specialRequests: null, // Optional: Can be added based on form data
          },
        });

        res.status(201).json({ message: "Enquiry submitted successfully", enquiry: newEnquiry });
      } catch (error) {
        console.error("Error while creating enquiry:", error);
        res.status(500).json({ message: "Failed to submit enquiry", error: error.message || "Unknown error" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
