import { Container } from "reactstrap"
import Link from 'next/link'

export default function Layout({ title, children, selected }) {
    return (
        <Container className="mt-4">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link href="/"><a className="navbar-brand">Home</a></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className={"nav-item " + (selected === 'heroes' ? 'active' : '')}>
                                    <Link href="/heroes"><a className="nav-link" >Heroes <span className="sr-only">(current)</span></a></Link>
                                </li>
                                <li className={"nav-item " + (selected === 'powers' ? 'active' : '')}>
                                    <Link href="/powers"><a className="nav-link" >Powers <span className="sr-only">(current)</span></a></Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="text-center">
                        <h1>{title}</h1>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {children}
                </div>
            </div>
        </Container>
    )
}