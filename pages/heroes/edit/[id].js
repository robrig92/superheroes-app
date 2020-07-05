import { useRouter } from 'next/router'
import Layout from "../../../components/layout"
import Form from "../../../components/heroes/form"
import RequestHandler from '../../../lib/request_handler'
import ResponseHandler from '../../../lib/response_handler'
import CookiesManager from '../../../lib/cookies_manager'
import AlertManager from '../../../lib/alert_manager'

export default function Edit({ heroe, powers }) {
    const router = useRouter()

    const handleSubmit = (event, heroe) => {
        event.preventDefault()
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        const alertManager = new AlertManager()
        let formData = new FormData()

        formData.set('name', heroe.name)
        formData.set('age', heroe.age)
        formData.set('powers', heroe.powers)
        formData.append('photo', heroe.photo)

        RequestHandler.put(`heroes/${heroe.id}`, formData, { headers })
        .then((response) => {
            alertManager.success('Updated!', 'The heroe has been created')

            router.push(`/heroes`)
        })
        .catch((error) => {
            alertManager.error('Oops...', 'Something went wrong!')
        })

    }

    return (
        <Layout title={`Updating the heroe with ID ${heroe.id}`}>
            <Form heroe={heroe} powers={powers} handleSubmit={handleSubmit} />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const jwt = context.req.cookies.jwt
    let headers = RequestHandler.addJwtToHeaders({}, jwt)
    let id = context.params.id
    let heroe = {
        name: '',
        age: '',
        powers: []
    }
    let powers = []

    try {
        let response = await RequestHandler.get(`heroes/${id}`, { headers })
        let responseHandler = new ResponseHandler(response)
        heroe = responseHandler.data.heroe
        heroe = { ...heroe, powers: heroe.powers.map((power) => {
                return { label: power.name, value: power.id }
            }) }

        response = await RequestHandler.get('powers', { headers })
        responseHandler = new ResponseHandler(response)
        powers = responseHandler.data.powers.map((power) => {
            return { label: power.name, value: power.id }
        })

        return {
            props: {
                heroe,
                powers
            }
        }
    } catch(error) {
        console.log(error)
    }
}
