import { Container } from "reactstrap"
import { useState } from 'react'
import Rating from 'react-rating'
import { SaveButton, SimpleBackButton } from '../forms/buttons'
import MultiSelect from "react-multi-select-component"
import { FileUpload, PhotoContainer } from '../forms/file'
import {FaPlus} from "react-icons/fa"
import ModalForm from "../powers/modal_form"
import CookiesManager from '../../lib/cookies_manager'
import AlertManager from '../../lib/alert_manager'
import ResponseHandler from '../../lib/response_handler'
import RequestHandler from '../../lib/request_handler'

export default function Form({ heroe, powers, handleSubmit }) {
    const [currentHeroe, setHeroe] = useState({...heroe})
    const [selected, setSelected] = useState(heroe.powers)
    const [showModal, setShowModal] = useState(false)
    const [currentPowers, setCurrentPowers] = useState(powers)

    const handlingSubmit = (event) => {
        event.preventDefault()

        let powers = selected.map((power) => power.value)
        let heroe = {
            ...currentHeroe,
            powers,
        }

        handleSubmit(event, heroe, setHeroe, setSelected)
    }

    const handlePhotoOnChange = (event) => {
        let photo = event.target.files[0]
        setHeroe({...currentHeroe, photo})
    }

    const handleNameOnChange = (event) => {
        let name = event.target.value
        setHeroe({...currentHeroe, name})
    }

    const handleAgeOnChange = (event) => {
        let age = event.target.value
        setHeroe({...currentHeroe, age})
    }

    const renderScore = (scores) => {
        if (!scores) {
            return <></>
        }

        return (
            <div className="row">
                <div className="col-12 mt-3">
                    <div className="form-group">
                        <label htmlFor="score">Score</label>
                        <br/>
                        <Rating
                            name="score"
                            readonly
                            initialRating={scores.reduce((sum, score) => (sum + score.score), 0) / scores.length}
                        />
                        <small id="scoreHelp" className="form-text text-muted">Current heroe score</small>
                    </div>
                </div>
            </div>
        )
    }

    const handleClose = () => {
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        const alertManager = new AlertManager()

        RequestHandler.get('powers', { headers })
            .then((response) => {
                let responseHandler = new ResponseHandler(response)
                setCurrentPowers(responseHandler.data.powers.map((power) => ({label: power.name, value: power.id})))
            })
            .catch((error) => {
                alertManager.error('Oops...', 'Something went wrong!')
            })
    }

    return (
        <Container>
            <form onSubmit={(e) => handlingSubmit(e)}>
                <div className="row">
                    <div className="col-12 offset-md-4 col-md-4 text-center">
                        <PhotoContainer filePath={currentHeroe.filePath} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="name" value={currentHeroe.name || ''} onChange={handleNameOnChange} required/>
                            <small id="nameHelp" className="form-text text-muted">Name of the heroe</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input type="number" className="form-control" name="age" value={currentHeroe.age || ''} onChange={handleAgeOnChange} required/>
                            <small id="ageHelp" className="form-text text-muted">Age of the heroe</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="powers">Powers</label>
                            <MultiSelect
                                options={currentPowers}
                                value={selected}
                                onChange={setSelected}
                                labelledBy={"Select"}
                            />
                            <small id="powersHelp" className="form-text text-muted">Powers of the heroe</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <button type="button" className="btn btn-primary btn-xs" onClick={(e) => {setShowModal(true)}}><FaPlus size="1.2em"/> power</button>
                            <small className="form-text text-muted">Can't find your super power here? Feel free of adding it</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <FileUpload
                            nameLabel={currentHeroe.photo ? currentHeroe.photo.name : 'Select a file'}
                            handlePhotoOnChange={handlePhotoOnChange}
                        />
                    </div>
                </div>
                {renderScore(currentHeroe.scores || undefined)}
                <div className="form-group text-right mt-2">
                    <SaveButton/>
                    <SimpleBackButton href="/admin/heroes" toggle={true}/>
                </div>
            </form>
            <ModalForm showModal={showModal} setShowModal={setShowModal} handleClose={handleClose}/>
        </Container>
    )
}
