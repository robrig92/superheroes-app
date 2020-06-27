import RequestHandler from '../../lib/request_handler'
import { useRouter } from 'next/router'
import {
    AddButton,
    EditButton,
    DeleteButton
} from '../../components/forms/buttons'
import Layout from '../../components/layout'
import ResponseHandler from '../../lib/response_handler'
import CookiesManager from '../../lib/cookies_manager'
import AlertManager from '../../lib/alert_manager' 

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
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Powers</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {heroes.map((heroe) => {
                                return (
                                    <tr key={heroe.id}>
                                        <td>{heroe.id}</td>
                                        <td>{heroe.name}</td>
                                        <td>{heroe.age}</td>
                                        <td>{heroe.powers.map((power) => power.name).join(', ')}</td>
                                        <td className="text-right">
                                            <EditButton href="/heroes/edit/[id]" as={`/heroes/edit/${heroe.id}`}/>
                                            <DeleteButton id={heroe.id} handleDelete={handleDelete}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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
