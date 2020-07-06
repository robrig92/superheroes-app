const renderCard = (heroe) => {
    const photoUrl = heroe.filePath.replace('server/storage', 'http://localhost:3001/');
    return (
        <div className="col-12 col-md-4 mb-2" key={heroe.id}>
            <div className="card">
                <img src={photoUrl} height="250" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{heroe.name}</h5>
                    <p className="card-text"><b>Age </b>{heroe.age}</p>
                    <p className="card-text"><b>Powers </b>{heroe.powers.map((power) => `${power.name}`)}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}

const Cards = ({ heroes }) => {
    return (
        <div className="row">
            {heroes.map((heroe) => renderCard(heroe))}
        </div>
    )
}

export default Cards