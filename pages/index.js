import Head from 'next/head'
import React, { useState, useEffect } from 'react'

import _ from 'lodash'
import Cards from '../components/heroes/cards'
import RequestHandler from '../lib/request_handler'
import ResponseHandler from '../lib/response_handler'
import CookiesManager from '../lib/cookies_manager'
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'

export default function ScoreBoard({ heroes }) {
    const [ isLogged, setIsLogged ] = useState(false)
    const router = useRouter()
    
    useEffect(() => {
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')

        if (jwt) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    })

    const handleSignOut = (e) => {
        e.preventDefault()

        const cookiesManager = new CookiesManager()

        cookiesManager.destroy('jwt')
        cookiesManager.destroy('user')
        router.push('/')
    }

    const handleSignIn = (e) => {
        e.preventDefault()

        router.push('/login')
    }

    const authControls = () => {
        if (isLogged) {
            return (
                <a href="#" onClick={handleSignOut} style={{ color: '#ffffff' }}><FaSignOutAlt /> Sign out</a>
            )
        }

        return (
            <a href="#" onClick={handleSignIn} style={{ color: '#ffffff' }}><FaSignInAlt /> Sign in</a>
        )
    }

    return (
        <div className="container-fluid" style={{ minHeight: '100vh', minWidth: '100hw', backgroundColor: '#212121', color: '#ffffff' }}>
            <div className="row">
                <div className="col-12">
                    <div className="container" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#ffffff' }}>
                        <Head>
                            <title>Heroes</title>
                        </Head>
                        <div className="row">
                            <div className="col-12 text-center">
                                <hr />
                                <div className="row">
                                    <div className="offset-2 col-8">
                                        <h1>Rate my heroes!</h1>
                                    </div>
                                    <div className="col-2 align-self-center">
                                        {authControls()}
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="col-12" style={{ color: '#000000' }}>
                                <Cards
                                    heroes={heroes}
                                    handleDelete={() => {}}
                                    mode="scores"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let heroes = []

    try {
        const response = await RequestHandler.get('/heroes')
        let responseHandler = new ResponseHandler(response)
        heroes = responseHandler.data.heroes
    } catch(error) {
        console.log(error)
    }

    return {
        props: {
            heroes
        }
    }
}
