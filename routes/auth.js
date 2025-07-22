import express from 'express';
import { register, login, verifyEmail, requestPasswordReset, resetPassword, resendVerificationEmail } from '../controllers/authController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';
import { createUserSchema } from '../validations/userValidation.js';
import { validate } from '../middlewares/validationMiddleware.js';


const router = express.Router();


router.post('/login', login);
router.get('/verify/:token', verifyEmail);

router.post('/register', validate(createUserSchema), register);
router.post("/resend-verification", resendVerificationEmail);



router.post('/password-reset-request', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);


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
