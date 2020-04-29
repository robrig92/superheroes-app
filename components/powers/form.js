import { Container } from 'reactstrap'
import { SaveButton, SimpleBackButton } from '../../components/forms/buttons'


export default function Form({ power }) {
    return(
        <Container>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" name="name" aria-describedby="nameHelp" defaultValue={power.name || ''} />
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