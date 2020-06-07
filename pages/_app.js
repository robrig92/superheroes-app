import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '../node_modules/jquery/dist/jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function App({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        let jwt = Cookies.get('jwt')

        if ((jwt === undefined || !jwt) && router.route !== '/login') {
            router.push('/login')
        }

        if (router.route === '/login' && jwt) {
            router.push('/')
        }
    })

    return (
        <Component {...pageProps} />
    )
}

App.getInitialProps = async (context) => {
    const ctx = context.ctx
    
    if (ctx.res) {
        const cookies = ctx.req.cookies
        const jwt = cookies.jwt

        if (!jwt && ctx.req.url !== '/login') {
            ctx.res.writeHead(302, { Location: '/login' })
            ctx.res.end()
        }

        if (jwt && ctx.req.url === '/login') {
            ctx.res.writeHead(302, { Location: '/' })
            ctx.res.end()
        }
    }

    return {}
}