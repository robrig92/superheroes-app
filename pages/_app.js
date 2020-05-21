import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import '../node_modules/jquery/dist/jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function App({ Component, pageProps }) {
    const router = useRouter()
    const [waitRender, setWaitRender] = useState(true)

    useEffect(() => {
        let jwt = Cookies.get('jwt')
        setWaitRender(false)

        if ((jwt === undefined || !jwt) && router.route !== '/login') {
            router.push('/login')
        }

        if (router.route === '/login' && jwt) {
            router.push('/')
        }
    })

    if (waitRender) {
        return null;
    }

    return (
        <Component {...pageProps} />
    )
}