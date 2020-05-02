if (typeof window !== "undefined") {
    require ('../node_modules/jquery/dist/jquery')
    require ('../node_modules/popper.js/dist/popper')
    require ('../node_modules/bootstrap/dist/js/bootstrap')
    require ('../node_modules/bootstrap/dist/css/bootstrap.min.css')
}

export default function App({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    )
}