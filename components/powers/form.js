import { useState } from 'react'
import { Container } from 'reactstrap'
import { SaveButton, SimpleBackButton } from '../../components/forms/buttons'


export default function Form({ power, handleSubmit }) {
    const [currentPower, setPower] = useState({ ...power })

    const handleOnChange = (event, power, setPower) => {
        let name = event.target.value
    
        setPower({ ...power, name: name })
    }

    return(
        <Container>
            <form onSubmit={(e) => handleSubmit(e, currentPower, setPower)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" name="name" aria-describedby="nameHelp" value={currentPower.name || ''} onChange={e => handleOnChange(e, currentPower, setPower)} />
                    <small id="nameHelp" className="form-text text-muted">Name of the power</small>
                </div>
                <div className="form-group text-right">
                    <SaveButton/>
                    <SimpleBackButton href="/powers" />
                </div>
            </form>
        </Container>
    )
}