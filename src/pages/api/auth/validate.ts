// import { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";

// /**
//  * Middleware to authenticate API requests using JWT.
//  */
// export function authenticate(req: NextApiRequest, res: NextApiResponse, next: Function) {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
//     (req as any).user = decoded; // Attach user info to the request object
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// }
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends NextApiRequest {
  user?: string | jwt.JwtPayload;
}

/**
 * Middleware to authenticate API requests using JWT.
 */
export function authenticate(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
): void {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (_error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
