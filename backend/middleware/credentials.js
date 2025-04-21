import { AllowedOrigins } from "../config/allowedOrigins.js";

export const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (!origin || AllowedOrigins.includes(origin)) { 
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
};


