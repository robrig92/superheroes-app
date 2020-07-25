import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Form from './form'

const ModalForm = ({ showModal, setShowModal }) => {
    const toggle = () => setShowModal(!showModal)

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
