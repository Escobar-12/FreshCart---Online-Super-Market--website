import { userModel } from "../model/userInfo.js";

export const VerifyRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        if (!req?.user) {
            console.log("User not logged in");
            return res.status(401).json({ message: "Unauthorized: No user logged in" });
        }

        try {
            const userFound = await userModel.findById(req?.user.id);
            if (!userFound) {
                console.log("User not found");
                return res.status(403).json({ message: "Forbidden: User not found" });
            }

            const userRoles = new Set(userFound.role);
            const allowedRolesSet = new Set(allowedRoles);

            const hasRole = [...allowedRolesSet].some(role => userRoles.has(role));
            if (!hasRole) {
                console.log("No access, insufficient role");
                return res.status(403).json({ message: "Forbidden: Insufficient role" });
            }

            next();
        } catch (error) {
            console.error("Error verifying roles:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};
