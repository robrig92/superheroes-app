import Axios from "axios";
import Form from "../../components/heroes/form";
import Layout from '../../components/layout';

export default function New({ powers }) {
    const handleSubmit = (event, heroe) => {
        let powers = event.target.value
        console.log(heroe)
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
        powers = response.data.data.powers
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            powers
        }
    }
}