import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Form from './form'
import CookiesManager from '../../lib/cookies_manager'
import AlertManager from '../../lib/alert_manager'
import ResponseHandler from '../../lib/response_handler'
import RequestHandler from '../../lib/request_handler'

const ModalForm = ({ showModal, setShowModal, handleClose }) => {
    const toggle = () => {
        setShowModal(!showModal)
        handleClose()
    }

    const handleSubmit = (event, power, setPower) => {
        event.preventDefault()

        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        const alertManager = new AlertManager()

        RequestHandler.post('powers', { name: power.name }, { headers })
            .then((response) => {
                let responseHandler = new ResponseHandler(response)
                let power = responseHandler.data.power

                alertManager.success('Created!', 'The power has been created!')
                setPower({})
            })
            .catch((error) => {
                alertManager.error('Oops...', 'Something went wrong!')
            })
    }

    return(
        <div>
            <Modal isOpen={showModal} toggle={toggle} centered={true}>
                <ModalHeader toggle={toggle}>New power</ModalHeader>
                <ModalBody>
                    <Form power={{}} handleSubmit={handleSubmit} toggle={false}/>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalForm
