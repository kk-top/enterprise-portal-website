const jsonwebtoken = require('jsonwebtoken')
const secret = 'KK is a tops'
const JWT = {
    // 生成token
    generate(value, expires) {
        return jsonwebtoken.sign(value, secret, { expiresIn: expires })
    },
    // 验证token
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (e) {
            return false
        }
    }
}

module.exports = JWT