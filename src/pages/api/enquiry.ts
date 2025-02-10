import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const enquiries = await prisma.enquiry.findMany();
        res.status(200).json(enquiries);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch enquiries", error });
      }
      break;

    case "POST":
      try {
        const {
          destination,
          price,
          margin,
          contactnum,
          email,
          date,
          transport,
          duration,
          imageUrl,
        } = req.body;

        if (!destination || !price || !margin || !contactnum || !email || !date || !transport || !duration) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        const newEnquiry = await prisma.enquiry.create({
          data: {
            destination,
            price: parseFloat(price),
            margin: parseFloat(margin),
            contactnum,
            email,
            date: new Date(date),
            transport,
            duration: parseInt(duration),
            imageUrl,
          },
        });

        res.status(201).json({ message: "Enquiry created successfully", enquiry: newEnquiry });
      } catch (error) {
        res.status(500).json({ message: "Failed to create enquiry", error });
      }
      break;

    case "PUT":
      try {
        const { id, ...data } = req.body;
        if (!id) return res.status(400).json({ message: "ID is required to update an enquiry" });

        const updatedEnquiry = await prisma.enquiry.update({
          where: { id: parseInt(id) },
          data,
        });

        res.status(200).json({ message: "Enquiry updated successfully", enquiry: updatedEnquiry });
      } catch (error) {
        res.status(500).json({ message: "Failed to update enquiry", error });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: "ID is required to delete an enquiry" });

        await prisma.enquiry.delete({
          where: { id: parseInt(id as string) },
        });

        res.status(200).json({ message: "Enquiry deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Failed to delete enquiry", error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
