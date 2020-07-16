import React, { useState } from 'react'
import Rating from 'react-rating'
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
        if (!renderScoreModal || mode === 'admin') {
            return <></>
        }

        return (
            <div>
                <Modal isOpen={modal} toggle={toggle} centered={true}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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
                <div className="card" style={{minHeight: '520px', maxHeight: '520px'}} onClick={e => handleClick(e, heroe)}>
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
            {renderScoreModal()}
        </div>
    )
}

export default Cards
