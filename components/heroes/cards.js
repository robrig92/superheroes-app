import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Rating from 'react-rating'
import React, { useState } from 'react'
import _ from 'lodash'
import {
    EditButton,
    DeleteButton
} from "../forms/buttons"
import CookiesManager from '../../lib/cookies_manager'
import RequestHandler from '../../lib/request_handler'

const Cards = ({ heroes, handleDelete, mode }) => {
    const [ modal, setModal ] = useState(false)
    const [ currentHeroe, setCurrentHeroe ] = useState({})
    const [ scoreForm, setScoreForm ] = useState({})
    const toggle = () => setModal(!modal)
    const [ showComments, setShowComments ] = useState(false)

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

    const clossingModal = () => {
        setScoreForm({})
        setShowComments(false)
        toggle()
    }

    const storeScore = (e) => {
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        let score = {}

        score.score = scoreForm.score
        if (scoreForm.comment) {
            score.comment = scoreForm.comment
        }

        RequestHandler.post(`heroes/${currentHeroe.id}/scores`, score, { headers })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
        clossingModal()
    }

    const closeModal = () => {
        clossingModal()
    }

    const handleViewCommentsClick = (e) => {
        e.preventDefault()
        setShowComments(!showComments)
    }

    const renderComments = () => {
        if (!showComments) {
            return (
                <div className="row">
                    <div className="col-12 text-right">
                        <a href="#" onClick={handleViewCommentsClick}>{ `View ${currentHeroe.scores.length} comments` }</a>
                    </div>
                </div>
            )
        }

        return (
            <>
                <div className="row">
                    <div className="col-12 text-right">
                        <a href="#" onClick={handleViewCommentsClick}>{ `Hide comments` }</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        { currentHeroe.scores.map((score) => {
                            return (
                                <div key={score.id} className="row">
                                    <div className="col-12">
                                        <p><b>{ score.user ? score.user.name : `Unknown`}</b> rated <b>{score.score}</b> points</p>
                                    </div>
                                    <div className="col-12">
                                        <p>{score.comment}</p>
                                        <hr />
                                    </div>
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </>
        );
    }

    const renderScoreModal = () => {
        if (!renderScoreModal || mode === 'admin' || _.isEmpty(currentHeroe)) {
            return <></>
        }

        const photoUrl = currentHeroe.filePath ? currentHeroe.filePath.replace('server/storage', 'http://localhost:3001/') : '';

        return (
            <div>
                <Modal isOpen={modal} toggle={closeModal} centered={true}>
                    <ModalHeader toggle={toggle}>Rate to {currentHeroe.name}</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-12 text-center">
                                <img className="col-12" src={photoUrl} style={{maxHeight: '80vh'}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <hr />
                                <h3>{currentHeroe.name}</h3>
                                {renderScore(currentHeroe, true)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="comment">Make a comment</label>
                                    <textarea name="comment" id="comment" className="form-control" value={scoreForm.comment || ''} onChange={e => setScoreForm({...scoreForm, comment: e.target.value})}></textarea>
                                </div>
                            </div>
                        </div>
                        {renderComments()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={storeScore}>Score!</Button>{' '}
                        <Button color="secondary" onClick={closeModal}>Cancel</Button>
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

    const renderScore = (heroe, isRateable = false) => {
        if (mode !== 'scores') {
            return <></>
        }

        if (isRateable) {
            return (
                <div className="text-center mt-2">
                    <Rating
                        name="score"
                        onClick={(value) => setScoreForm({...scoreForm, score: value})}
                        initialRating={scoreForm.score || undefined}
                        fractions={2}
                    />
                </div>
            )
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
