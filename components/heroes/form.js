import { Container } from "reactstrap"
import { useState } from 'react'
import { SaveButton, SimpleBackButton } from '../forms/buttons';

export default function Form({ heroe, handleSunbit }) {
    const [currentHeroe, setHeroe] = useState({...heroe})

    return (
        <Container>
            <form>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" className="form-control" name="name" aria-describeby="nameHelp" value={currentHeroe.name || ''}/>
                    <small id="nameHelp" className="form-text text-muted">Name of the heroe</small>
                </div>
                <div className="form-group">
                    <label htmlFor="age"></label>
                    <input type="number" className="form-control" name="age" aria-describeby="ageHelp" value={currentHeroe.age || 0}/>
                    <small id="ageHelp" className="form-text text-muted">Age of the heroe</small>
                </div>
                <div className="form-group text-right">
                    <SaveButton/>
                    <SimpleBackButton href="/heroes"/>
                </div>
            </form>
        </Container>
    )
}