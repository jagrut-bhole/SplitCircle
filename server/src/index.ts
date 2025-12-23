// Load environment variables FIRST, before any other imports
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import app from "./app.js";

// Prisma COnfiguration
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
