import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import networkRoutes from './routes/networkRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import showRoutes from './routes/showRoutes.js';

const app = express();

// enable cors for all routes
app.use(cors());

// parse incoming request bodies 
app.use(bodyParser.json());

// routes
app.use('/networks', networkRoutes);
app.use('/packages', packageRoutes);
app.use('/shows', showRoutes);

export default app;