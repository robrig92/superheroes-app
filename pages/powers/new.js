import { useRouter } from 'next/router'
import Layout from "../../components/layout"
import Form from '../../components/powers/form'
import RequestHandler from '../../lib/request_handler'
import CookiesManager from '../../lib/cookies_manager'
import ResponseHandler from '../../lib/response_handler'
import AlertManager from '../../lib/alert_manager'

export default function New() {
    const router = useRouter()

    const handleSubmit = (event, power) => {
        event.preventDefault()

        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        const alertManager = new AlertManager()

        RequestHandler.post('powers', { name: power.name }, { headers })
            .then((response) => {
                let responseHandler = new ResponseHandler(response)
                let power = responseHandler.data.power

                alertManager.success('Created!', 'The power has been created!')
                router.push(`/powers/edit/${power.id}`)
            })
            .catch((error) => {
                alertManager.error('Oops...', 'Something went wrong!')
            })
    }

    return(
        <Layout title="Add a power" selected="power">
            <Form power={{}} handleSubmit={handleSubmit}/>
        </Layout>
    )
}