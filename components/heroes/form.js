import { Container } from "reactstrap"
import { useState } from 'react'
import { SaveButton, SimpleBackButton } from '../forms/buttons';

export default function Form({ heroe, powers, handleSubmit }) {
    const [currentHeroe, setHeroe] = useState({...heroe})

    const handlingSubmit = (event) => {
        event.preventDefault()
        handleSubmit(event, currentHeroe)
    }

    const handleNameOnChange = (event) => {
        let name = event.target.value
        setHeroe({...currentHeroe, name})
    }

    const handleAgeOnChange = (event) => {
        let age = event.target.value
        setHeroe({...currentHeroe, age})
    }

    const handlePowersOnChange = (event) => {
        let currentPowers = event.target.value
        setHeroe({...currentHeroe, powers: currentPowers})
    }

    return (
        <Container>
            <form onSubmit={(e) => handlingSubmit(e)}>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="name" value={currentHeroe.name || ''} onChange={handleNameOnChange}/>
                            <small id="nameHelp" className="form-text text-muted">Name of the heroe</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input type="number" className="form-control" name="age" value={currentHeroe.age || 0} onChange={handleAgeOnChange}/>
                            <small id="ageHelp" className="form-text text-muted">Age of the heroe</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="powers">Powers</label>
                            <select multiple className="form-control" name="powers" onChange={handlePowersOnChange}>
                                {powers.map((power) => {
                                    return(
                                        <option key={power.id} value={power.id}>{power.name}</option>
                                    )
                                })}
                            </select>
                            <small id="powersHelp" className="form-text text-muted">Powers of the heroe</small>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
                    <select multiple className="form-control" id="exampleFormControlSelect2">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="form-group text-right">
                    <SaveButton/>
                    <SimpleBackButton href="/heroes"/>
                </div>
            </form>
        </Container>
    )
}