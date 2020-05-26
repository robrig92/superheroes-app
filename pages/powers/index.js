import Axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import CookiesManager from '../../lib/cookies_manager'
import RequestHandler from '../../lib/request_handler'
import ResponseHandler from '../../lib/response_handler'
import {
    EditButton,
    DeleteButton,
    AddButton
} from '../../components/forms/buttons'

export default function Index({ powers }) {
    const router = useRouter();

    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-secondary',
                cancelButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })

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
                Axios.delete(`http://localhost:3001/powers/${id}`)
                    .then((response) => {
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'The power has been deleted.',
                            'success'
                        )
                        router.push('/powers')
                    })
                    .catch((error) => {
                        swalWithBootstrapButtons.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        })
                    })
            }
        })
    }

    return (
        <Layout title="Powers" selected="powers">
            <div className="row">
                <div className="col-12 text-right">
                    <AddButton href="/powers/new" label="Power"/>
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
                                            <EditButton href="/powers/edit/[id]" as={`/powers/edit/${power.id}`} />
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
    let cookies = context.req.cookies
    let headers = RequestHandler.addJwtToHeaders({}, cookies.jwt)

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