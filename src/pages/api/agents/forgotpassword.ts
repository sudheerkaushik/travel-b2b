import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset link (mocked here)
    const resetLink = `https://yourdomain.com/reset-password?token=mocked-token`;
    return res.status(200).json({ message: "Password reset link sent", resetLink });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
