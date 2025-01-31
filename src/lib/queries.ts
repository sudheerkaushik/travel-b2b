import prisma from "./prisma";
import bcrypt from "bcrypt";

/**
 * Create a new user in the database.
 */
export async function createUser(email: string, password: string, role: string, agentName?: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role, agentName },
  });

  return user;
}

/**
 * Find a user by email.
 */
export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

/**
 * Create a new trip.
 */
export async function createTrip(
  destination: string,
  price: number,
  margin: number,
  date: string,
  transport: string,
  duration: number,
  description: string,
  isAvailable: boolean
) {
  const trip = await prisma.trip.create({
    data: {
      destination,
      price,
      margin,
      date: new Date(date), // Ensure date is in the correct format
      transport,
      duration,
      description,
      isAvailable,
      imageUrl
    },
  });

  return trip;
}

/**
 * Get all trips.
 */
export async function getAllTrips() {
  const trips = await prisma.trip.findMany();
  return trips;
}

/**
 * Get a trip by ID.
 */
export async function getTripById(id: number) {
  const trip = await prisma.trip.findUnique({ where: { id } });
  return trip;
}

/**
 * Update a trip by ID.
 */
export async function updateTrip(
  id: number,
  updatedData: {
    destination?: string;
    price?: number;
    margin?: number;
    date?: string;
    transport?: string;
    duration?: number;
    description?: string;
    isAvailable?: boolean;
  }
) {
  const trip = await prisma.trip.update({
    where: { id: id.toString() },
    data: {
      ...updatedData,
      date: updatedData.date ? new Date(updatedData.date) : undefined, // Convert date if provided
    },
  });

  return trip;
}

/**
 * Delete a trip by ID.
 */
export async function deleteTrip(id: number) {
  const trip = await prisma.trip.delete({
    where: { id: id.toString() },
  });

  return trip;
}
