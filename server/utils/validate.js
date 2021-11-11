require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    jwksUri: `${process.env.DOMAIN}.well-known/jwks.json`
})

function getKey(header, cb){
    client.getSigningKey(header.kid, function(err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
}

const options = {
    audience: process.env.AUDIENCE,
    issuer: process.env.DOMAIN,
    algorithms: ['RS256']
}

async function isTokenValid(token) {
    if (token) {
        const bearerToken = token.split(' ')[1];

        const result = new Promise((resolve) => {
            jwt.verify(bearerToken, getKey, options, (err, decoded) => {
                if (err) {
                    resolve({err});
                }

                resolve({decoded});
            })
        })

        return result;
    }

    return false;
}

module.exports = isTokenValid;