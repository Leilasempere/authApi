import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import deleteUserCron from "./middlewares/deleteUser.js";
import auditDependencies from './middlewares/auditDependencies.js'
import cors from 'cors';
import helmet from 'helmet';    
import { authLimiter } from './middlewares/rateLimiter.js';
import { logout } from './controllers/authController.js';


dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors()); 
app.use(helmet()); // Sécurise les en-têtes HTTP


// Démarre le cron
deleteUserCron.start();
auditDependencies.start()

app.use( authLimiter); // Limite le nombre de requêtes pour les routes d'authentification
app.use('/api/auth', authRoutes);  // authLimiter est un middleware qui limite le nombre de requêtes

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
