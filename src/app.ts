import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { configureRoutes } from "./routes/public/routes";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

configureRoutes(app);
app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});