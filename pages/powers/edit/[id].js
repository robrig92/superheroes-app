import Axios from 'axios';
import Swal from 'sweetalert2'
import Layout from "../../../components/layout";
import Form from "../../../components/powers/form";

const handleSubmit = (event, power) => {
    event.preventDefault()

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false
    })

    Axios.put(`http://localhost:3001/powers/${power.id}`, {
            name: power.name
        })
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
    let power = {};
    const { id } = context.params;

    try {
        const response = await Axios.get(`http://localhost:3001/powers/${id}`)
        power = response.data.data.power
    } catch(error) {
        console.log(error)
    }

    return {
        props: {
            power
        }
    }
}