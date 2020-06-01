const express = require('express')
const { parse } = require('url')
const next = require('next')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    server.use(cookieParser())

    server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl

        handle(req, res, parsedUrl)
    })

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})