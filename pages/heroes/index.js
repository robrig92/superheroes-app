import RequestHandler from '../../lib/request_handler'
import { useRouter } from 'next/router'
import { AddButton } from '../../components/forms/buttons'
import Layout from '../../components/layout'
import ResponseHandler from '../../lib/response_handler'
import CookiesManager from '../../lib/cookies_manager'
import AlertManager from '../../lib/alert_manager' 
import GridHeroe from '../../components/heroes/grid'

export default function Index({ heroes }) {
    const router = useRouter()

    const handleDelete = (id) => {
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        const alertManager = new AlertManager()
        const customSwal = alertManager.customInvertedSwal()

        customSwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                RequestHandler.delete(`heroes/${id}`, { headers })
                    .then((response) => {
                        alertManager.success('Deleted!', 'The heroe has been deleted')
                        router.push('/heroes')
                    })
                    .catch((error) => {
                        alertManager.error('Oops...', 'Something went wrong!')
                    })
            }
        })
    }

    return (
        <Layout title="Heroes" selected="heroes">
            <div className="row">
                <div className="col-12 text-right">
                    <AddButton href="/heroes/new" label="Heroe" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <GridHeroe heroes={heroes} handleDelete={handleDelete}/>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let heroes = []
    let jwt = context.req.cookies.jwt
    let headers = RequestHandler.addJwtToHeaders({}, jwt)

    try {
        const response = await RequestHandler.get('/heroes', { headers })
        let responseHandler = new ResponseHandler(response)
        heroes = responseHandler.data.heroes
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            heroes
        }
    }
}
