const jwt = require('jsonwebtoken');
/**
 * @param  {Object} user
 * @param  {Object} client
 */
async function generateTokens(user, client) {
    const jwtToken = jwt.sign({
        user,
    }, config.secret, { expiresIn: parseInt(config.tokenExpiration, 10) });

    await RefreshToken.findOneAndRemove({ user: user._id });

    const refreshTokenVal = uuid.v4();
    await RefreshToken.create({
        token: refreshTokenVal,
        user: user._id,
    });

    return [jwtToken, refreshTokenVal, { expires_in: config.tokenExpiration }];
}