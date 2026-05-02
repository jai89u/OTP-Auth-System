const jwt = require("jsonwebtoken");

// AUTH MIDDLEWARE
exports.auth = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

// ROLE CHECK: STUDENT
exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(403).json({
                success: false,
                message: "Access restricted to Students only"
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Role verification failed"
        });
    }
};

// ROLE CHECK: ADMIN
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Access restricted to Admins only"
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Role verification failed"
        });
    }
};