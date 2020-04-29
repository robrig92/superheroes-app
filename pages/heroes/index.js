import Axios from 'axios'
import { AddButton, EditButton, DeleteButton } from '../../components/forms/buttons'
import Layout from '../../components/layout'

export default function Index({ heroes }) {
    return (
        <Layout title="Heroes" selected="heroes">
            <div className="row">
                <div className="col-12 text-right">
                    <AddButton href="/heroes/new" label="Heroe" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead className="thead-dark">
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
                                        <td className="text-right">
                                            <EditButton href="/heroes/edit/[id]" as={`/heroes/edit/${heroe.id}`}/>
                                            <DeleteButton/>
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