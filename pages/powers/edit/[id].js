import Layout from "../../../components/layout";
import Axios from 'axios';
import Form from "../../../components/powers/form";

const handleSubmit = (event, power) => {
    event.preventDefault()

    Axios.put(`http://localhost:3001/powers/${power.id}`, {
            name: power.name
        })
        .then((response) => {
            alert('Actualizado')
        })
        .catch((error) => {
            alert('Ocurrió un error al actualizar')
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