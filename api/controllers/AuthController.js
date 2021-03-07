const bcrypt = require('bcrypt');

const jwtHelper = require("../helpers/JWT");
const googleAuth = require("../helpers/GoogleAuth");
const facebookAuth = require("../helpers/FacebookAuth");
const User = require("../model/User");

const debug = console.log.bind(console);

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret";

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email + "/" + password)
        const _user = await User.getByEmail(email);
        if(_user != undefined){
            const user = _user;
            // const compare = await bcrypt.compare(password, user.password);
            const compare = true;
            if(compare){
                const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);

                const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
                tokenList[refreshToken] = {accessToken, refreshToken};

                res.status(200).json({
                    status_code: 200,
                    user: user,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    error: ""
                })
            } else {
                return res.status(202).json({
                    status_code: 202,
                    message: "wrong password"
                });
            }
        } else {
            return res.status(201).json({
                status_code: 201,
                message: "wrong email"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status_code: 500,
            error: error
        });
    }
};

let loginGoogle = async (req, res) => {
    try {
        const googleUser = await googleAuth.getGoogleUser(req.body.token);
        let user;

        const _user = await User.getBySocialId(googleUser.id);
        if(_user == undefined){
            user = await User.insert(googleUser);
        } else {
            user = googleUser;
            user.id = _user.id;
        }
        const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);

        const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
        tokenList[refreshToken] = {accessToken, refreshToken};

        res.status(200).json({
            status_code : 200,
            user: user,
            access_token: accessToken,
            refresh_token: refreshToken
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status_code: 500,
            error: error
        });
    }
};


let loginFacebook = async (req, res) => {
    try {
        const facebookUser = await facebookAuth.getUser(req.body.token);
        let user;

        const _user = await User.getBySocialId(facebookUser.id);
        if(_user == undefined){
            user = await User.insert(facebookUser);
        } else {
            user = facebookUser;
            user.id = _user.id;
        }

        const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);

        const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
        tokenList[refreshToken] = {accessToken, refreshToken};

        res.status(200).json({
            status_code : 200,
            user: user,
            access_token: accessToken,
            refresh_token: refreshToken
        })
    } catch (error) {
        return res.status(500).json({
            status_code: 500,
            error: error
        });
    }
};

let refreshToken = async (req, res) => {

    const refreshTokenFromClient = req.body.refresh_token;

    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            const userData = decoded.data;

            const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);

            return res.status(200).json({
                status_code: 200,
                accessToken,
            });
        } catch (error) {
            res.status(403).json({
                status_code: 403,
                message: 'Invalid refresh token.',
            });
        }
    } else {
        return res.status(403).send({
            status_code: 403,
            message: 'No token provided.',
        });
    }
};

module.exports = {
    login,
    loginGoogle,
    loginFacebook,
    refreshToken,
};