import Head from 'next/head'
import styles from './index.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import CookiesManager from '../../lib/cookies_manager'
import RequestHandler from '../../lib/request_handler'
import ResponseHander from '../../lib/response_handler'
import AlertManager from '../../lib/alert_manager'

export default function Login () {
    const router = useRouter()
    const [ signUp, setSignUp ] = useState({})
    const [ loginUsername, setLoginUsername ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')
    const [ signUpErrors, setSignUpErrors ] = useState({})
    const [ signInError, setSignInError ] = useState('')

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
            setSignInError('')

            router.push('/')
        }).catch((err) => {
            setSignInError(`Invalid credentials`)
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

    const handleSignUpSubmit = (e) => {
        e.preventDefault()
        let { name, username, password, email } = signUp
        const alertManager = new AlertManager()

        RequestHandler.post('/users', {
            name,
            username,
            password,
            email
        }).then((response) => {
            alertManager.success('Created!', 'The account has been created')
            setSignUp({})
        }).catch((err) => {
            const { errors } = err.response.data.err
            const mappedErrors = errors.forEach((error) => {
                setSignUpErrors({
                    ...signUpErrors,
                    [error.path]: {
                        'message': error.message,
                        'value': error.value
                    }
                })
            })
            alertManager.error('Oops...', 'Somwthing went wrong!')
        })
    }

    const renderError = (field) => {
        if (signUpErrors.hasOwnProperty(field)) {
            return <span className={`${styles.errorLabel}`}>{ signUpErrors[field].message }</span>
        }

        return null
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
                                        {signInError !== '' && <span className={`${styles.errorLabel}`}>{ signInError }</span> }
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
                            <form onSubmit={handleSignUpSubmit}>
                                <div className="form-group">
                                    <input name="name" className="form-control" placeholder="Name" type="text" value={signUp.name || ''} onChange={(e) => setSignUp({...signUp, name: e.target.value})} required />
                                    {renderError('name')}
                                </div>
                                <div className="form-group">
                                    <input name="username" className="form-control" placeholder="Username" type="text" value={signUp.username || ''} onChange={(e) => setSignUp({ ...signUp, username: e.target.value })} required />
                                    {renderError('username')}
                                </div>
                                <div className="form-group">
                                    <input name="email" className="form-control" placeholder="E-mail" type="email" value={signUp.email || ''} onChange={(e) => setSignUp({ ...signUp, email: e.target.value })} required/>
                                    {renderError('email')}
                                </div>
                                <div className="form-group">
                                    <input name="password" className="form-control" placeholder="Password" type="password" value={signUp.password || ''} onChange={(e) => setSignUp({ ...signUp, password: e.target.value })} required />
                                    {renderError('password')}
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
