import Swal from 'sweetalert2'
import Layout from "../../../components/layout"
import Form from "../../../components/powers/form"
import RequestHandler from '../../../lib/request_handler'
import ResponseHandler from '../../../lib/response_handler'
import CookiesManager from '../../../lib/cookies_manager'

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

    RequestHandler.put(`powers/${power.id}`, { name: power.name }, { headers})
        .then((response) => {
            swalWithBootstrapButtons.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'The power has been updated!'
            })
        })
        .catch((error) => {
            swalWithBootstrapButtons.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
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