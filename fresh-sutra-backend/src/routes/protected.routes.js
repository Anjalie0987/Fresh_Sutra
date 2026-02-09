import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireUser, requireAdmin, requireVendor } from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/user', verifyToken, requireUser, (req, res) => {
    res.json({ message: "User access granted", user: req.user });
});

router.get('/admin', verifyToken, requireAdmin, (req, res) => {
    res.json({ message: "Admin access granted", user: req.user });
});

router.get('/vendor', verifyToken, requireVendor, (req, res) => {
    res.json({ message: "Vendor access granted", user: req.user });
});

export default router;
