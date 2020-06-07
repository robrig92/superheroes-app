import Link from 'next/link'
import Head from 'next/head'
import { Container } from "reactstrap"
import styles from './layout.module.css'
import CookiesManager from '../lib/cookies_manager';
import { useRouter } from 'next/router';

export default function Layout({ title, children, selected }) {
    const router = useRouter()

    const handleLogOut = (e) => {
        const cookiesManager = new CookiesManager()

        cookiesManager.destroy('jwt')
        cookiesManager.destroy('user')
        router.push('/login')
    }

    return (
        <Container fluid>
            <Head>
                <title>Heroes app</title>
            </Head>
            <div>
                <div className="row">
                    <div className={"col-12 " + styles.fullWidth}>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <Link href="/"><a className="navbar-brand">Home</a></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className={"nav-item " + (selected === 'heroes' ? 'active' : '')}>
                                        <Link href="/heroes"><a className="nav-link" >Heroes <span className="sr-only">(current)</span></a></Link>
                                    </li>
                                    <li className={"nav-item " + (selected === 'powers' ? 'active' : '')}>
                                        <Link href="/powers"><a className="nav-link" >Powers <span className="sr-only">(current)</span></a></Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={"float-right " + styles.logOutButton} onClick={handleLogOut}>Log out</div>
                        </nav>
                        <div className="text-center">
                            <h1>{title}</h1>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {children}
                    </div>
                </div>
            </div>
        </Container>
    )
}