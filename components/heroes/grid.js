import {
    EditButton,
    DeleteButton
} from '../../components/forms/buttons'

const GridHeroes = ({ heroes, handleDelete }) => {
    return (
        <div className="row">
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
                                        <EditButton href="/admin/heroes/edit/[id]" as={`/admin/heroes/edit/${heroe.id}`}/>
                                        <DeleteButton id={heroe.id} handleDelete={handleDelete}/>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default GridHeroes
