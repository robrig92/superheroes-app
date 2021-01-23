import Layout from "../../../components/layout";
import {AddButton, DeleteButton} from "../../../components/forms/buttons";
import RequestHandler from '../../../lib/request_handler';
import {useRouter} from "next/router";
import CookiesManager from "../../../lib/cookies_manager";
import AlertManager from "../../../lib/alert_manager";
import ResponseHandler from '../../../lib/response_handler'


export default function Index({ users }) {
    const router = useRouter()

    const handleDelete = (id) => {
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        const headers = RequestHandler.addJwtToHeaders({}, jwt)
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
                RequestHandler.delete(`http://localhost:3001/users/${id}`, { headers })
                    .then((response) => {
                        alertManager.success('Deleted!', 'The power has been deleted')
                        router.push('/admin/users')
                    })
                    .catch((error) => {
                        alertManager.error('Oops...', 'Somwthing went wrong!')
                    })
            }
        })

    }

    return(
        <Layout title="Users" selected="users">
            <div className="row">
                <div className="col-12 text-right">
                    <AddButton href="/admin/users/new" label="User"/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Username</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <DeleteButton handleDelete={handleDelete} id={user.id}/>
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
    let users = []
    let jwt = context.req.cookies.jwt
    let headers = RequestHandler.addJwtToHeaders({}, jwt)

    try {
        const response = await RequestHandler.get('/users', { headers })
        let responseHandler = new ResponseHandler(response)
        users = responseHandler.data.users
    } catch(error) {
        console.log(error)
    }

    return {
        props: {
            users
        }
    }
}
