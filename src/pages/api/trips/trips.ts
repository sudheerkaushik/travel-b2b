import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Authentication Middleware
  // const { authorization } = req.headers;
  // if (!authorization) {
  //   return res.status(401).json({ message: "Unauthorized: No token provided" });
  // }

  // const token = authorization.replace("Bearer ", "");
  // let decoded;

  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
  // } catch (error) {
  //   return res.status(401).json({ message: "Unauthorized: Invalid token" });
  // }

  // if (decoded.role !== "admin") {
  //   return res.status(403).json({ message: "Forbidden: Only admins can perform this action" });
  // }

  switch (method) {
    case "GET":
      try {
        const trips = await prisma.trip.findMany();
        res.status(200).json(trips);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch trips", error });
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
          description,
          isAvailable,
          imageUrl, // Image URL from S3
        } = req.body;

        if (!destination || !price || !margin || !date || !transport || !duration || !description) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        const newTrip = await prisma.trip.create({
          data: {
            destination,
            price: parseFloat(price),
            margin: parseFloat(margin),
            date: new Date(date),
            transport,
            duration: parseInt(duration),
            description,
            isAvailable: Boolean(isAvailable),
            imageUrl, // Attach the S3 URL to the trip
          },
        });

        res.status(201).json({ message: "Trip created successfully", trip: newTrip });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create trip", error });
      }

      break;

      case "PUT":
        try {
          let { id, price, margin, date, duration, isAvailable, ...rest } = req.body;
          if (!id) return res.status(400).json({ message: "ID is required to update a trip" });
      
          // Convert values to the correct types
          price = parseFloat(price);
          margin = parseFloat(margin);
          duration = parseInt(duration);
          isAvailable = Boolean(isAvailable);
          date = new Date(date);
      
          const updatedTrip = await prisma.trip.update({
            where: { id: Number(id) }, // Ensure id is a number
            data: {
              ...rest,
              price,
              margin,
              duration,
              isAvailable,
              date,
            },
          });
      
          res.status(200).json({ message: "Trip updated successfully", trip: updatedTrip });
        } catch (error) {
          console.error("Error updating trip:", error);
          res.status(500).json({ message: "Failed to update trip", error });
        }
        break;
      
    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: "ID is required to delete a trip" });

        await prisma.trip.delete({
          where: { id: parseInt(id as string) },
        });

        res.status(200).json({ message: "Trip deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Failed to delete trip", error });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
