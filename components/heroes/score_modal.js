import Link from 'next/link'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import AlertManager from '../../lib/alert_manager';
import CookiesManager from '../../lib/cookies_manager'
import RequestHandler from '../../lib/request_handler'
import ResponseHandler from '../../lib/response_handler';
import Score from './score';

const ScoreModal = ({ heroe, mode, showModal, setShowModal }) => {
    const [ scoreForm, setScoreForm ] = useState({})
    const toggle = () => setShowModal(!showModal)
    const [ showComments, setShowComments ] = useState(false)
    const router = useRouter()

    const getUserScore = (user) => {
        const filteredScores = heroe.scores.filter((score) => parseInt(score.user_id, 10) === parseInt(user.id, 10))
        const score = filteredScores.pop()

        return score
    }

    useEffect(() => {
        const cookiesManager = new CookiesManager()
        const user = JSON.parse(cookiesManager.get('user') || '{}')

        if (showModal && !_.isEmpty(user)) {
            const score = getUserScore(user)
            console.log(score)

            setScoreForm({
                score: score ? score.score : 0,
                comment: score ? score.comment : null
            })
        }
    }, [showModal])

    const handleHide = () => {
        setCurrentHeroe({})
        setShowModal(false)
    }

    const clossingModal = () => {
        setScoreForm({})
        setShowComments(false)
        toggle()
    }

    const storeScore = (e) => {
        const alertManager = new AlertManager()
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        const user = JSON.parse(cookiesManager.get('user') || '{}')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        let score = {}

        score.score = scoreForm.score || 0
        if (scoreForm.comment) {
            score.comment = scoreForm.comment
        }

        const userScore = getUserScore(user)
        let requestRoute = `heroes/${heroe.id}/scores`
        let method = 'post'

        if (!_.isEmpty(userScore)) {
            requestRoute += `/${userScore.id}`
            method = 'put'
        }

        RequestHandler[method](requestRoute, score, { headers })
            .then((response) => {
                const responseHandler = new ResponseHandler(response)
                clossingModal()
                router.push('/')
            })
            .catch((err) => {
                alertManager.error('Oops!', 'Something went wrong...')
            })
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
                        <a href="#" onClick={handleViewCommentsClick}>{ `View ${heroe.scores.length} comments` }</a>
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
                        { heroe.scores.map((score) => {
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
        if (!renderScoreModal || mode === 'admin' || _.isEmpty(heroe)) {
            return <></>
        }

        const photoUrl = heroe.filePath ? heroe.filePath.replace('server/storage', 'http://localhost:3001/') : '';
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')

        return (
            <div>
                <Modal isOpen={showModal} toggle={closeModal} centered={true}>
                    <ModalHeader toggle={toggle}>Rate to {heroe.name}</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-12 text-center">
                                <img className="col-12" src={photoUrl} style={{maxHeight: '80vh'}}/>
                                <hr />
                            </div>
                        </div>
                        { _.isEmpty(jwt)
                            ? (
                                <div className="row">
                                    <div className="col-12 text-center">
                                        <h3>{heroe.name}</h3>
                                        <h5>You need to be logged into your account to rate</h5>
                                        <h5><Link href='/login'><a>Sign in here!</a></Link></h5>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <h3>{heroe.name}</h3>
                                            <Score heroe={heroe} mode={mode} scoreForm={scoreForm} setScoreForm={setScoreForm} isRateable={true}/>
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
                                </>
                            )}
                        {renderComments()}
                    </ModalBody>
                    <ModalFooter>
                        { _.isEmpty(jwt)
                            ? (
                                <></>
                            ): (
                                <>
                                    <Button color="primary" onClick={storeScore}>Score!</Button>{' '}
                                </>
                        )}
                        <Button color="secondary" onClick={closeModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    return (
        <>
            {renderScoreModal()}
        </>
    )
}

export default ScoreModal
