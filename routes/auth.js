import express from 'express';
import { register, login, verifyEmail, requestPasswordReset, resetPassword } from '../controllers/authController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { createUserSchema } from '../validations/userValidation.js';
import { createUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);



router.post('/password-reset-request', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);
router.post('/', validate(createUserSchema), createUser);


router.get('/user-profile', protect, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.name}` });
});

router.get('/admin-panel', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Bienvenue dans le panneau admin' });
 
});

router.get('/moderator-section', protect, authorize('moderator', 'admin'), (req, res) => {
  res.json({ message: 'Bienvenue dans la section modérateur' });
});

export default router;
