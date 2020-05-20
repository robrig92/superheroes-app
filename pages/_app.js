import '../node_modules/jquery/dist/jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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