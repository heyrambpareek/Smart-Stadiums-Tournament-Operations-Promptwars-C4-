// @ts-nocheck
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { startSimulation } from './services/simulationService';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '5000', 10);

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Start Data Simulation Engine
startSimulation();

app.listen(port, () => {
  console.log(`[StadiumMind AI] Server running on port ${port}`);
});
