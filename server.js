const express = require('express')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const cookieParser = require('cookie-parser')
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    server.use(cookieParser())

    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl

        console.log(req.cookies)

        handle(req, res, parsedUrl)
    }).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})