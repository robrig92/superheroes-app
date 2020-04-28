import Axios from 'axios';
import Layout from '../../components/layout';

export default function Index({ heroes }) {
    return (
        <Layout title="Heroes" selected="heroes">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Powers</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {heroes.map((heroe) => {
                        return (
                            <tr key={heroe.id}>
                                <td>{heroe.id}</td>
                                <td>{heroe.name}</td>
                                <td>{heroe.age}</td>
                                <td>{heroe.powers.map((power) => power.name).join(', ')}</td>
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
    let heroes = []
    
    try {
        const response = await Axios.get('http://localhost:3001/heroes')
        heroes = response.data.data.heroes
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            heroes
        }
    }
}