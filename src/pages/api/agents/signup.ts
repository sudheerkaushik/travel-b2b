// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// interface SignupRequest extends NextApiRequest {
//   body: {
//     email: string;
//     password: string;
//     role: string;
//     agentName: string;
//   };
// }

// export default async function handler(req: SignupRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { email, password, role, agentName } = req.body;

//   // Validate input
//   if (!email || !password || !agentName) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//          role: "agent",
//         agentName,
//       },
//     });

//     if (!newUser) {
//       return res.status(500).json({ message: "Failed to create user" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: newUser.id, email: newUser.email, role: newUser.role },
//       process.env.JWT_SECRET!,
//       { expiresIn: "1h" }
//     );

//     // Send response
//     res.status(201).json({
//       User: { id: newUser.id, email: newUser.email, agentName: newUser.agentName, role: newUser.role },
//       // token,
//     });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, role} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });

    return res.status(201).json(user);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}