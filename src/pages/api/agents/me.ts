// import { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";
// import prisma from "../../../lib/prisma"; // Adjust the path

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     // Get token from cookies or headers
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; email: string };

//     // Fetch agent details
//     // const agent = await prisma.user.findUnique({
//     //   where: { id: decoded.id },
//     //   select: {
//     //     id: true,
//     //     email: true,
//     //     agentName: true, // Assuming your DB has this field
//     //     role: true,
//     //   },
//     // });

//     const agent = await prisma.user.findMany();

//     if (!agent) {
//       return res.status(404).json({ message: "Agent not found" });
//     }

//     return res.status(200).json(agent);
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token", error });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma"; // Adjust the path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get token from cookies or headers
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; email: string };

    // Fetch agents with role 'agent'
    const agents = await prisma.user.findMany({
      where: { role: "agent" }, // Ensure this filters by the correct role
      select: {
        id: true,
        email: true,
        agentName: true, // Assuming your DB has this field
        role: true,
      },
    });

    if (!agents || agents.length === 0) {
      return res.status(404).json({ message: "No agents found" });
    }

    return res.status(200).json(agents);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token", error });
  }
}
