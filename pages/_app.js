import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import '../node_modules/jquery/dist/jquery'
import '../public/css/styles.css'

export default function App({ Component, pageProps }) {
    const router = useRouter()

    if (typeof window !== 'undefined') {
        let jwt = Cookies.get('jwt')

        if ((jwt === undefined || !jwt) && router.route !== '/login' && router.route.includes('/admin')) {
            router.push('/login')
        }

        if (router.route === '/login' && jwt) {
            router.push('/admin')
        }
    }

    return (
        <Component {...pageProps} />
    )
}

App.getInitialProps = async (context) => {
    const ctx = context.ctx

    if (ctx.res) {
        const cookies = ctx.req.cookies
        const jwt = cookies.jwt

        if (!jwt && ctx.req.url !== '/login' && ctx.req.url.includes('/admin')) {
            ctx.res.writeHead(302, { Location: '/login' })
            ctx.res.end()
        }

        if (jwt && ctx.req.url === '/login') {
            ctx.res.writeHead(302, { Location: '/admin' })
            ctx.res.end()
        }
    }

    return {}
}
