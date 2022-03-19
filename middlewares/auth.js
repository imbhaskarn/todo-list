const {
    TokenExpiredError, JsonWebTokenError
} = require("jsonwebtoken");

const jwt = require("jsonwebtoken");

function collectToken(req) {
    console.log(req.headers.authtoken)
    if (
        req.headers.authtoken &&
        req.headers.authtoken.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authtoken.split(" ")[1];
    }
    return null
}
module.exports = isLoggedIn = async (req, res, next) => {
    try {
        const token = collectToken(req)
        if (!token) {
            return res.json({
                msg: "auth token is empty"
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if (err) {
                console.log(err)
                message = err.name === "JsonWebTokenError" ? "unauthorized" : err.message
                return res.json({
                    message: message
                })
            }
            req.payload = payload
            next()
        })
    } catch (err) {
        if (err) {
            console.log(err)
            res.json({
                message: "server error"
            })
        }
    }

}