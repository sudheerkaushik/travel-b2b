// import prisma from '../../lib/prisma';


// import { NextApiRequest, NextApiResponse } from 'next';



// interface UserRequest extends NextApiRequest {
//   body: {
//     email: string;
//     password: string;
//     role: string;
//   };
// }

export default async function handler() {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
  
//   if (!req.body) {
//     return res.status(400).json({ message: "No request body provided" });
//   }
//   const { email, password, role } = req.body && req.body;

//   // Optionally hash the password
//   // const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const user = await prisma.user.create({
//       data: { email, password, role },
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Error creating user", error });
//   }
}
