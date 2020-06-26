import { useRouter } from "next/router"
import Swal from 'sweetalert2'
import Form from "../../components/heroes/form"
import Layout from '../../components/layout'
import RequestHandler from '../../lib/request_handler'
import ResponseHandler from '../../lib/response_handler'
import CookiesManager from '../../lib/cookies_manager'
import AlertManager from '../../lib/alert_manager'

export default function New({ heroe, powers }) {
    const router = useRouter()

    const handleSubmit = (event, heroe) => {
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        const alertManager = new AlertManager()

        RequestHandler.post('/heroes', heroe, { headers })
            .then((response) => {
                let createdHeroe = response.data.data.heroe

                alertManager.success('Created!', 'The heroe has been created')

                router.push(`/heroes/edit/${createdHeroe.id}`)
            })
            .catch((error) => {
                alertManager.error('Oops...', 'Something went wrong!')
            })
    }

    return (
        <Layout title="Add a hero" enabled="heroes">
            <Form heroe={heroe} powers={powers} handleSubmit={handleSubmit}/>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let powers = []
    let heroe = {
        name: '',
        age: '',
        powers: []
    }
    const jwt = context.req.cookies.jwt
    let headers = RequestHandler.addJwtToHeaders({}, jwt)

    try {
        const response = await RequestHandler.get('powers', { headers })
        let responseHandler = new ResponseHandler(response)
        powers = responseHandler.data.powers.map((power) => {
            return { label: power.name, value:power.id }
        })
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            heroe,
            powers
        }
    }
}