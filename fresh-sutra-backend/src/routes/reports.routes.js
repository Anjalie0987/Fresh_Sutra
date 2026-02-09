import express from 'express';
import { generateCustomerMatchReport } from '../controllers/reports.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

// GET /api/admin/reports/customer-match
router.get('/customer-match', verifyToken, requireAdmin, generateCustomerMatchReport);

export default router;
