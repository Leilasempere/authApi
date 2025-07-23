// middlewares/rateLimiter.js
import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  limit: 5, // Limite à 5 tentatives de login par IP
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    message: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
  },
});