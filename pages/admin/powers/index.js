import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import CookiesManager from '../../../lib/cookies_manager'
import RequestHandler from '../../../lib/request_handler'
import ResponseHandler from '../../../lib/response_handler'
import {
    EditButton,
    DeleteButton,
    AddButton
} from '../../../components/forms/buttons'
import AlertManager from '../../../lib/alert_manager'

export default function Index({ powers }) {
    const router = useRouter();

    const handleDelete = (id) => {
        const cookiesManager = new CookiesManager()
        let jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        const alertManager = new AlertManager()
        const swalWithBootstrapButtons = alertManager.customInvertedSwal()

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                RequestHandler.delete(`https://frozen-earth-57631.herokuapp.com/powers/${id}`, { headers })
                    .then((response) => {
                        alertManager.success('Deleted!', 'The power has been deleted')
                        router.push('/admin/powers')
                    })
                    .catch((error) => {
                        alertManager.error('Oops...', 'Somwthing went wrong!')
                    })
            }
        })
    }

    return (
        <Layout title="Powers" selected="powers">
            <div className="row">
                <div className="col-12 text-right">
                    <AddButton href="/admin/powers/new" label="Power"/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {powers.map((power) => {
                                return (
                                    <tr key={power.id}>
                                        <td>{power.id}</td>
                                        <td>{power.name}</td>
                                        <td className="text-right">
                                            <EditButton href="/admin/powers/edit/[id]" as={`/admin/powers/edit/${power.id}`} />
                                            <DeleteButton handleDelete={handleDelete} id={power.id} />
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
    let powers = [];
    let jwt = context.req.cookies.jwt
    let headers = RequestHandler.addJwtToHeaders({}, jwt)

    try {
        const response = await RequestHandler.get('/powers', { headers })
        const responseHandler = new ResponseHandler(response)
        powers = responseHandler.data.powers
    } catch(err) {
        console.log(err)
    }

    return {
        props: {
            powers
        }
    }
}
