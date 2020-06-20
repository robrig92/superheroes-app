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

    console.log(selected)

    return (
        <Container fluid className={styles.fullWidth}>
            <Head>
                <title>Heroes app</title>
            </Head>
            <div className="row">
                <div className={`col-12 col-md-3 col-lg-2 ${styles.sidebarContainer}`}>
                    <nav className={styles.sidebar}>
                        <ul className={`${styles.sidebarList}`}>
                            <li className={`${styles.sideBarItem} ${selected === undefined ? styles.active : ''}`}>
                                <Link href="/"><a className={styles.navLink}>Home</a></Link>
                            </li>
                            <li className={`${styles.sideBarItem} ${selected === 'heroes' ? styles.active : ''}`}>
                                <Link href="/heroes"><a className={styles.navLink}>Heroes</a></Link>
                            </li>
                            <li className={`${styles.sideBarItem} ${selected === 'powers' ? styles.active : ''}`}>
                                <Link href="/powers"><a className={styles.navLink}>Powers</a></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-12 col-md-9 col-lg-10 mt-3">
                    <Container>
                        <div className="text-center">
                            <hr />
                            <h1>{title ?? 'Home'}</h1>
                            <hr />
                        </div>
                        {children}
                    </Container>
                </div>
            </div>
        </Container>
    )
}