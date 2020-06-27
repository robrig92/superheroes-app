import Layout from "../../../components/layout"
import Form from "../../../components/powers/form"
import RequestHandler from '../../../lib/request_handler'
import ResponseHandler from '../../../lib/response_handler'
import CookiesManager from '../../../lib/cookies_manager'
import AlertManager from '../../../lib/alert_manager'

const handleSubmit = (event, power) => {
    event.preventDefault()

    const cookiesManager = new CookiesManager()
    const jwt = cookiesManager.get('jwt')
    let headers = RequestHandler.addJwtToHeaders({}, jwt)
    const alertManager = new AlertManager()

    RequestHandler.put(`powers/${power.id}`, { name: power.name }, { headers})
        .then((response) => {
            alertManager.success('Updated!', ' The power has been updated!')
        })
        .catch((error) => {
            alertManager.error('Oops...', 'Something went wrong')
        })
}

export default function editForm( {power} ) {
    return(
        <Layout title={`Update power with id ${power.id}`} selected="powers">
            <div className="row">
                <div className="col-12">
                    <Form power={power} handleSubmit={handleSubmit}/>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let power = {}
    const jwt = context.req.cookies.jwt
    let headers = RequestHandler.addJwtToHeaders({}, jwt)
    const { id } = context.params

    try {
        const response = await RequestHandler.get(`powers/${id}`, { headers })
        const responseHandler = new ResponseHandler(response)
        power = responseHandler.data.power
    } catch(error) {
        console.log(error)
    }

    return {
        props: {
            power
        }
    }
}