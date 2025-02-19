// import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import prisma from "../../../lib/prisma"; // Adjust path to prisma instance

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const { email, password } = req.body;

//     const agent = await prisma.user.findUnique({ where: { email } });
//     if (!agent) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, agent.password);
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: agent.id, email: agent.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" } // Token expires in 24 hours
//     );

//     res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; Max-Age=86400;`);
//     return res.status(200).json({ message: "Login successful", token,name: agent.agentName });
//   } else {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
// }
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", name: user.name });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}