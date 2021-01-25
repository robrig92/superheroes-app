import Layout from '../../../components/Layout'
import Form from '../../../components/users/form'
import CookiesManager from '../../../lib/cookies_manager'
import RequestHandler from '../../../lib/request_handler'
import AlertManager from '../../../lib/alert_manager'

export default function New () {
    const handleSubmit = (user, setUser) => {
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        const headers = RequestHandler.addJwtToHeaders({}, jwt)
        const alertManager = new AlertManager()

        RequestHandler.post('/users', user, { headers })
            .then(response => {
                let createdUser = response.data.data.user

                alertManager.success('Created!', 'The user has been created')

                setUser({})
            }).catch(error => {
                alertManager.error('Oops...', 'Something went wrong')
            })
    }

    return (
        <Layout title="Add an user" selected="users">
            <Form user={{}} handleSubmit={handleSubmit} toggle={true}/>
        </Layout>
    )
}
