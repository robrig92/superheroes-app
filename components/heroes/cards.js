import React, { useState } from 'react'
import { DeleteButton, EditButton } from '../forms/buttons'
import ScoreModal from './score_modal'
import Score from './score'

const Cards = ({ heroes, handleDelete, mode }) => {
    const [ currentHeroe, setCurrentHeroe ] = useState({})
    const [ showModal, setShowModal ] = useState(false)

    const handleClick = (e, heroe) => {
        setShowModal(true)
        setCurrentHeroe(heroe)
    }

    const renderControl = (heroe) => {
        if (mode !== 'admin') {
            return <></>
        }

        return (
            <div className="text-right mb-2">
                <EditButton href="/admin/heroes/edit/[id]" as={`/admin/heroes/edit/${heroe.id}`} />
                <DeleteButton id={heroe.id} handleDelete={handleDelete} />
            </div>
        )
    }

    const renderCard = (heroe) => {
        const photoUrl = heroe.filePath ? heroe.filePath.replace('server/storage', 'http://localhost:3001/') : '';
        return (
            <div className="col-12 col-md-4 mb-2" key={heroe.id}>
                <div className="card" style={{minHeight: '520px', maxHeight: '520px'}} onClick={e => handleClick(e, heroe)}>
                    <img src={photoUrl} height="250" className="card-img-top" alt="..." />
                    <div className="row">
                        <div className="col-12 text-center">
                            <hr />
                            <h3 className="card-title text-center">{heroe.name}</h3>
                            <Score heroe={heroe} mode={mode} scoreForm={{}} setScoreForm={()=>{}} isRateable={false} />
                            <hr />
                        </div>
                    </div>
                    <div className="card-body">
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
            <ScoreModal heroe={currentHeroe} mode={mode} showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}

export default Cards
