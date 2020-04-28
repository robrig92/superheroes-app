import Axios from 'axios';
import Layout from '../../components/layout';

export default function Index({ powers }) {
    return (
        <Layout title="Powers" selected="powers">
            <table className="table">
                <thead>
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
                                <td>
                                    <button className="btn btn-primary">Edit</button>
                                    <button className="btn btn-secondary">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let powers = [];

    try {
        const response = await Axios.get('http://localhost:3001/powers')
        powers = response.data.data.powers
    } catch(err) {
        console.log(err)
    }

    return {
        props: {
            powers
        }
    }
}