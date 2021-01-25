import {useState} from "react"
import {Container} from "reactstrap"
import {SaveButton, SimpleBackButton} from "../forms/buttons"

export default function Form({ user, handleSubmit, toggle }) {
    const [currentUser, setCurrentUser] = useState({...user})

    const onSubmit = (e) => {
        e.preventDefault()

        handleSubmit(currentUser, setCurrentUser)
    }

    const renderBackButton = () => {
        if (toggle) {
            return <SimpleBackButton href="/admin/users" toggle={toggle}/>
        }

        return <></>
    }

    const handleOnChange = (e, fieldName) => {
        setCurrentUser({
            ...currentUser,
            [fieldName]: e.target.value
        })
    }

    const handleOnChangeSwitch = (e, fieldName) => {
        setCurrentUser({
            ...currentUser,
            [fieldName]: e.target.checked
        })
    }

    return (
        <Container>
            <form onSubmit={ e => onSubmit(e) }>
                <div className="row">
                    <div className="form-group col-12">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" type="text" name="username" aria-describedby="usernameHelp" value={currentUser.username || ''} onChange={ e => handleOnChange(e, 'username') }/>
                        <small name="usernameHelp" className="form-text text-muted">Username of the account</small>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" type="text" name="name" aria-describedby="nameHelp" value={currentUser.name || ''} onChange={ e => handleOnChange(e, 'name') }/>
                        <small name="nameHelp" className="form-text text-muted">Name of the account user</small>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text" name="email" aria-describedby="emailHelp" value={currentUser.email || ''} onChange={ e => handleOnChange(e, 'email') }/>
                        <small name="emailHelp" className="form-text text-muted">Email of the account user</small>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" name="password" aria-describedby="passwordHelp" value={currentUser.password || ''} onChange={ e => handleOnChange(e, 'password') }/>
                        <small name="passwordHelp" className="form-text text-muted">Password of the account user</small>
                    </div>
                </div>
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="isAdmin" name="isAdmin" onChange={e => handleOnChangeSwitch(e, 'isAdmin')}/>
                    <label className="custom-control-label" htmlFor="isAdmin">Is admin</label>
                </div>
                <div className="row">
                    <div className="form-group text-right col-12">
                        <SaveButton/>
                        {renderBackButton()}
                    </div>
                </div>
            </form>
        </Container>
    )
}
