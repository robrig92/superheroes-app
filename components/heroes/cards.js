import React, { useState } from 'react'
import Rating from 'react-rating'
import _ from 'lodash'
import {
    EditButton,
    DeleteButton
} from "../forms/buttons"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Cards = ({ heroes, handleDelete, mode }) => {
    const [ modal, setModal ] = useState(false)
    const [ currentHeroe, setCurrentHeroe ] = useState({})
    const toggle = () => setModal(!modal);

    const handleClick = (e, heroe) => {
        setModal(true)
        setCurrentHeroe(heroe)
    }

    const handleHide = () => {
        setCurrentHeroe({})
        setModal(false)
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

    const renderScoreModal = () => {
        if (!renderScoreModal || mode === 'admin' || _.isEmpty(currentHeroe)) {
            return <></>
        }

        const photoUrl = currentHeroe.filePath ? currentHeroe.filePath.replace('server/storage', 'http://localhost:3001/') : '';

        return (
            <div>
                <Modal isOpen={modal} toggle={toggle} centered={true}>
                    <ModalHeader toggle={toggle}>Rate to {currentHeroe.name}</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-12 text-center">
                                <img className="col-12" src={photoUrl} style={{maxHeight: '700px'}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <hr />
                                <h3>{currentHeroe.name}</h3>
                                {renderScore(currentHeroe)}
                                <p className="text-center">Score {getScore(currentHeroe.scores)}</p>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p><b>Age </b>{currentHeroe.age}</p>
                                <p><b>Powers </b>{currentHeroe.powers.map((power) => `${power.name}`).join(', ')}</p>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    const getScore = (scores) => {
        if (scores.length === 0) {
            return 0
        }

        return (scores.reduce((sum, score) => sum + score.score, 0) / scores.length).toFixed(2)
    }

    const renderScore = (heroe) => {
        if (mode !== 'scores') {
            return <></>
        }

        return (
            <div className="text-center mt-2">
                <Rating
                    name="score"
                    initialRating={getScore(heroe.scores)}
                    readonly
                />
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
                            {renderScore(heroe)}
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
            {renderScoreModal()}
        </div>
    )
}

export default Cards
