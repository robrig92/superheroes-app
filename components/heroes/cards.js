import React from 'react';
import Rating from 'react-rating';
import {
    EditButton,
    DeleteButton
} from "../forms/buttons";

const Cards = ({ heroes, handleDelete, mode }) => {
    const renderControl = (heroe) => {
        if (mode !== 'admin') {
            return <></>
        }

        return (
            <div className="text-right mb-2">
                <EditButton href="/heroes/edit/[id]" as={`/heroes/edit/${heroe.id}`} />
                <DeleteButton id={heroe.id} handleDelete={handleDelete} />
            </div>
        )
    }

    const renderScore = (heroe) => {
        if (mode !== 'scores') {
            return <></>
        }

        return (
            <div className="text-center mt-2">
                <hr />
                <Rating
                    name="score"
                    initialRating={(heroe.scores.reduce((sum, score) => sum + score.score, 0) / heroe.scores.length)}
                    readonly
                />
                <hr />
            </div>
        )
    }

    const renderCard = (heroe) => {
        const photoUrl = heroe.filePath ? heroe.filePath.replace('server/storage', 'http://localhost:3001/') : '';
        return (
            <div className="col-12 col-md-4 mb-2" key={heroe.id}>
                <div className="card">
                    <img src={photoUrl} height="250" className="card-img-top" alt="..." />
                    {renderScore(heroe)}
                    <div className="card-body">
                        <h5 className="card-title">{heroe.name}</h5>
                        <p className="card-text"><b>Age </b>{heroe.age}</p>
                        <p className="card-text"><b>Powers </b>{heroe.powers.map((power) => `${power.name}`).join(', ')}</p>
                    </div>
                    {renderControl(heroe)}
                </div>
            </div>
        )
    }

    return (
        <div className="row">
            {heroes.map((heroe) => renderCard(heroe))}
        </div>
    )
}

export default Cards
