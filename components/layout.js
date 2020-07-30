import Link from 'next/link'
import Head from 'next/head'
import { Container } from "reactstrap"
import styles from './layout.module.css'
import CookiesManager from '../lib/cookies_manager';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
    FaBars,
    FaHome,
    FaMask,
    FaMagic,
    FaSignOutAlt,
    FaStar
} from 'react-icons/fa';

export default function Layout({ title, children, selected }) {
    const router = useRouter()
    const cookiesManager = new CookiesManager()
    const [displayMenu, setDisplayMenu] = useState(false);

    const handleLogOut = (e) => {
        const cookiesManager = new CookiesManager()

        cookiesManager.destroy('jwt')
        cookiesManager.destroy('user')
        router.push('/admin/login')
    }

    const handleDisplayMenu = (e) => {
        const updatedDisplayMenu = !displayMenu
        setDisplayMenu(updatedDisplayMenu)
        cookiesManager.set('displayMenu', updatedDisplayMenu)
    }

    useEffect(() => {
       setDisplayMenu(cookiesManager.get('displayMenu') === undefined || cookiesManager.get('displayMenu') === 'true' ? true : false)
    })

    const renderMenu = () => {
        if (!displayMenu) {
            return <></>
        }

        return (
            <div className={`col-12 col-md-3 col-lg-2 ${styles.sidebarContainer} ${styles.sidebar}`}>
                <ul className={`${styles.sidebarList}`}>
                    <li className={`${styles.sideBarItem} ${selected === undefined ? styles.active : ''}`}>
                        <Link href="/admin"><a className={styles.navLink}><FaHome size="1.5em"/> Home</a></Link>
                    </li>
                    <li className={`${styles.sideBarItem} ${selected === 'heroes' ? styles.active : ''}`}>
                        <Link href="/admin/heroes"><a className={styles.navLink}><FaMask size="1.5em"/> Heroes</a></Link>
                    </li>
                    <li className={`${styles.sideBarItem} ${selected === 'powers' ? styles.active : ''}`}>
                        <Link href="/admin/powers"><a className={styles.navLink}><FaMagic size="1.5em"/> Powers</a></Link>
                    </li>
                    <li className={`${styles.sideBarItem}`}>
                        <Link href="/"><a className={styles.navLink}><FaStar size="1.5em"/> Scores</a></Link>
                    </li>
                    <li className={`${styles.logOutButtonContainer}`}>
                        <a className={`${styles.logOutButton}`} onClick={handleLogOut}><FaSignOutAlt size="1.2em"/> Log out</a>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Container fluid>
            <Head>
                <title>Heroes app</title>
            </Head>
            <div className="row">
                {renderMenu()}
                <div className={displayMenu ? "col-12 col-md-9 col-lg-10 mt-3" : "col-12 mt-3"}>
                    <Container fluid>
                        <div className="text-center">
                            <hr />
                            <div className="row">
                                <div className="col-1">
                                    <a onClick={handleDisplayMenu} style={{cursor: 'pointer'}}> <FaBars size="1.2em"/> </a>
                                </div>
                                <div className="col-11">
                                    <h1>{title ?? 'Home'}</h1>
                                </div>
                            </div>
                            <hr />
                        </div>
                        {children}
                    </Container>
                </div>
            </div>
        </Container>
    )
}
