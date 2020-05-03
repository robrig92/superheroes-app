import Axios from "axios"
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Layout from "../../../components/layout"
import Form from "../../../components/heroes/form"

export default function Edit({ heroe, powers }) {
    const router = useRouter()

    const handleSubmit = (event, heroe) => {
        event.preventDefault()

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
        })
        
        Axios.put(`http://localhost:3001/heroes/${heroe.id}`, heroe)
        .then((response) => {
            swalWithBootstrapButtons.fire({
                icon: 'success',
                title: 'Created!',
                text: 'The heroe has been created'
            })

            router.push(`/heroes`)
        })
        .catch((error) => {
            swalWithBootstrapButtons.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })

    }

    return (
        <Layout title={`Updating the heroe with ID ${heroe.id}`}>
            <Form heroe={heroe} powers={powers} handleSubmit={handleSubmit} />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let id = context.params.id
    let heroe = {
        name: '',
        age: '',
        powers: []
    }
    let powers = []

    try {
        let response = await Axios.get(`http://localhost:3001/heroes/${id}`)
        heroe = response.data.data.heroe
        heroe = { ...heroe, powers: heroe.powers.map((power) => {
                return { label: power.name, value: power.id }
            }) }

        response = await Axios.get('http://localhost:3001/powers')
        powers = response.data.data.powers.map((power) => {
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
