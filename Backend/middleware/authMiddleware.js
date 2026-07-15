const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");


        if (!authHeader) {

            return res.status(401).json({
                message:"ไม่พบ Token"
            });

        }


        const token = authHeader.split(" ")[1];


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        req.user = decoded;


        next();


    } catch(error) {

        console.log(error);


        res.status(401).json({
            message:"Token ไม่ถูกต้อง"
        });

    }

};


module.exports = authMiddleware;