import Head from 'next/head'
import styles from './index.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import CookiesManager from '../../lib/cookies_manager'
import RequestHandler from '../../lib/request_handler'
import ResponseHander from '../../lib/response_handler'

export default function Login () {
    const router = useRouter()
    const [ loginUsername, setLoginUsername ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        const cookiesManager = new CookiesManager()

        RequestHandler.post('/auth/login', {
            username: loginUsername,
            password: loginPassword
        }).then((response) => {
            let responseHandler = new ResponseHander(response)
            let jwt = responseHandler.data.jwt
            let user = responseHandler.data.user

            cookiesManager.set('jwt', jwt)
            cookiesManager.set('user', user)

            router.push('/')
        }).catch((err) => {
            // Do something...
        })
    }

    const handleLoginUsernameOnChange = (e) => {
        let username = e.target.value
        setLoginUsername(username)
    }

    const handleLoginPasswordOnChange = (e) => {
        let password = e.target.value
        setLoginPassword(password)
    }

    return (
        <div className="container-fluid">
            <Head>
                <title>Login</title>
            </Head>
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    <div className={ "row " + styles.formLoginContainer }>
                        <div className="offset-2 offset-md-3 col-md-6 col-8 align-self-center">
                            <div className={ styles.customFormLogin }>
                                <h2 className="text-center">Welcome!</h2>
                                <form onSubmit={handleLogin}>
                                    <div className="form-group">
                                        <input name="username" className="form-control" placeholder="Username" type="text" value={loginUsername} onChange={handleLoginUsernameOnChange} />
                                    </div>
                                    <div className="form-group">
                                        <input name="password" className="form-control" placeholder="Password" type="password" value={loginPassword} onChange={handleLoginPasswordOnChange} />
                                    </div>
                                    <div className="text-center">
                                        <input type="submit" className={"btn btn-primary " + styles.fullWidthButton } value="Log in!" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xs-12">
                    <div className={ "row " + styles.formSignUpContainer }>
                        <div className="offset-2 offset-md-3 col-md-6 col-8 align-self-center">
                            <h4 className="text-center">Don't have an account? Sign up here!</h4>
                            <form>
                                <div className="form-group">
                                    <input name="name" className="form-control" placeholder="Name" type="text" />
                                </div>
                                <div className="form-group">
                                    <input name="username" className="form-control" placeholder="Username" type="text" />
                                </div>
                                <div className="form-group">
                                    <input name="email" className="form-control" placeholder="E-mail" type="email" />
                                </div>
                                <div className="form-group">
                                    <input name="password" className="form-control" placeholder="Password" type="password" />
                                </div>
                                <div className="text-center">
                                    <input type="submit" className={"btn btn-primary " + styles.fullWidthButton} value="Sign up!" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}