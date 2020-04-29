import Axios from 'axios';
import Layout from '../../components/layout';
import {
    EditButton,
    DeleteButton,
    AddButton
} from '../../components/forms/buttons'

export default function Index({ powers }) {
    return (
        <Layout title="Powers" selected="powers">
            <div className="row">
                <div className="col-12 text-right">
                    <AddButton href="/powers/new" label="Power"/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
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
                                        <td className="text-right">
                                            <EditButton href="/powers/edit/[id]" as={`/powers/edit/${power.id}`} />
                                            <DeleteButton />
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