'use strict'
const _ = require('lodash')

const checkIsAdmin = (req, res, next) => {
    const user = JSON.parse(req.cookies.user || '{}')

    if (_.isEmpty(user) || !user.isAdmin) {
        res.writeHead(302, { Location: '/' })
        return res.end()
    }

    next()
}

module.exports = {
    checkIsAdmin
}
