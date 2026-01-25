export const requireUser = (req, res, next) => {
    if (!req.user || req.user.role !== 'USER') {
        return res.status(403).json({ message: "Access denied. User role required." });
    }
    next();
};

export const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    next();
};

export const requireVendor = (req, res, next) => {
    if (!req.user || req.user.role !== 'VENDOR') {
        return res.status(403).json({ message: "Access denied. Vendor role required." });
    }
    next();
};
