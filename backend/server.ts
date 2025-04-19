import express from "express"; // Correct import for express
import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import cors from "cors"; // Import cors

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // Enable CORS
app.use(express.json());

// Define types for request bodies
interface SignupRequestBody {
  uid: string;
  password: string;
}

interface LoginRequestBody {
  uid: string;
  password: string;
}

// Signup Route
app.post("/api/signup", (async (req, res) => {
  const { uid, password } = req.body as SignupRequestBody;

  try {
    const existingUser = await prisma.user.findUnique({ where: { uid } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { uid, password: hashedPassword },
    });

    res.status(201).json({ success: true, message: "User created!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: (error as any).message });
  }
}) as express.RequestHandler);

// Login Route
app.post("/api/login", (async (req, res) => {
  const { uid, password } = req.body as LoginRequestBody;

  try {
    const user = await prisma.user.findUnique({ where: { uid } });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: user.id }, "secret_key", { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: (error as any).message });
  }
}) as express.RequestHandler);

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
