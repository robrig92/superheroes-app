import Head from 'next/head'
import styles from './index.module.css'

export default function Login () {
    const handleLogin = (e) => {
        e.preventDefault()

        console.log('login')
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
                                        <input name="username" className="form-control" placeholder="Username" type="text"/>
                                    </div>
                                    <div className="form-group">
                                        <input name="password" className="form-control" placeholder="Password" type="password" />
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