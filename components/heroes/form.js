import { Container } from "reactstrap"
import { useState } from 'react'
import { SaveButton, SimpleBackButton } from '../forms/buttons'
import MultiSelect from "react-multi-select-component"
import { FileUpload, DisplayPhoto } from '../forms/file'

export default function Form({ heroe, powers, handleSubmit }) {
    const [currentHeroe, setHeroe] = useState({...heroe})
    const [selected, setSelected] = useState(heroe.powers)

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

    return (
        <Container>
            <form onSubmit={(e) => handlingSubmit(e)}>
                <div className="row">
                    <div className="col-12 offset-md-4 col-md-4">
                        <DisplayPhoto filePath={currentHeroe.filePath} />
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
                                options={powers}
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
                        <FileUpload
                            nameLabel={currentHeroe.photo ? currentHeroe.photo.name : 'Select a file'}
                            handlePhotoOnChange={handlePhotoOnChange}
                        />
                    </div>
                </div>
                <div className="form-group text-right mt-2">
                    <SaveButton/>
                    <SimpleBackButton href="/heroes"/>
                </div>
            </form>
        </Container>
    )
}