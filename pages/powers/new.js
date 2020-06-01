import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Layout from "../../components/layout"
import Form from '../../components/powers/form'
import RequestHandler from '../../lib/request_handler'
import CookiesManager from '../../lib/cookies_manager'
import ResponseHandler from '../../lib/response_handler'

export default function New() {
    const router = useRouter()

    const handleSubmit = (event, power) => {
        event.preventDefault()

        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
        })

        RequestHandler.post('powers', { name: power.name }, { headers })
            .then((response) => {
                let responseHandler = new ResponseHandler(response)
                let power = responseHandler.data.power

                swalWithBootstrapButtons.fire({
                    icon: 'success',
                    title: 'Created!',
                    text: 'The power has been created!'
                })

                router.push(`/powers/edit/${power.id}`)
            })
            .catch((error) => {
                swalWithBootstrapButtons.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            })
    }

    return(
        <Layout title="Add a power" selected="power">
            <Form power={{}} handleSubmit={handleSubmit}/>
        </Layout>
    )
}