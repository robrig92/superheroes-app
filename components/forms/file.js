
const serverFileRoute = (filePath) => {
    const staticRoute = filePath.replace('server/storage', '')
    const url = `http://localhost:3001/${staticRoute}`

    return url
}

export const FileUpload = ({ nameLabel, handlePhotoOnChange }) => {
    return (
        <div className="row">
            <div className="col-12">
                <label htmlFor="photo">Photo</label>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="photo" onChange={handlePhotoOnChange} />
                    <label className="custom-file-label" htmlFor="photo">{nameLabel}</label>
                </div> 
            </div> 
        </div>
    )
}

export const PhotoContainer = ({ filePath }) => {
    if (!filePath) {
        return <></>
    }

    return (
        <div className="row">
            <div className="col-12">
                <label>Current uploaded photo</label>
                <br/>
                <img src={serverFileRoute(filePath)} height="250px" width="200px"></img>
            </div>
        </div>
    )
}
