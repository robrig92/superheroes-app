import Axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Layout from "../../components/layout"
import Form from '../../components/powers/form'

export default function New() {
    const router = useRouter()

    const handleSubmit = (event, power) => {
        event.preventDefault()

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
        })

        Axios.post('http://localhost:3001/powers', {
                name: power.name
            })
            .then((response) => {
                let power = response.data.data.power

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