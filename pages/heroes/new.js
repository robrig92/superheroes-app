import Axios from "axios";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import Form from "../../components/heroes/form";
import Layout from '../../components/layout';

export default function New({ powers }) {
    const router = useRouter()

    const handleSubmit = (event, heroe) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
        })

        Axios.post('http://localhost:3001/heroes', heroe)
            .then((response) => {
                let createdHeroe = response.data.data.heroe

                swalWithBootstrapButtons.fire({
                    icon: 'success',
                    title: 'Created!',
                    text: 'The heroe has been created'
                })

                router.push(`/heroes/edit/${createdHeroe.id}`)
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
        <Layout title="Add a hero" enabled="heroes">
            <Form heroe={{}} powers={powers} handleSubmit={handleSubmit}/>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let powers = []

    try {
        const response = await Axios.get('http://localhost:3001/powers')
        powers = response.data.data.powers.map((power) => {
            return { label: power.name, value:power.id }
        })
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            powers
        }
    }
}