const jwt = require("jsonwebtoken");

let generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {

        // Thực hiện ký và tạo token
        jwt.sign(
            {data: user},
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            });
    });
};

let verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
};

module.exports = {
    generateToken,
    verifyToken,
};
