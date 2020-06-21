import Link from 'next/link'
import {
    FaSave,
    FaDoorOpen,
    FaTrashAlt,
    FaEdit,
    FaPlus
} from 'react-icons/fa'

export function SaveButton() {
    return (
        <button type="submit" className="btn btn-primary btn-xs" data-toggle="tooltip" title="Save"><FaSave size="1.2em" /></button>
    )
}

export function SimpleBackButton({ href }) {
    return (
        <Link href={href}><a className="btn btn-secondary ml-2 btn-xs" data-toggle="tooltip" title="Back"><FaDoorOpen size="1.2em" /></a></Link>
    )
}

export function DeleteButton({ handleDelete, id }) {
    return (
        <button className="btn btn-secondary ml-2 btn-xs" data-toggle="tooltip" title="Delete" onClick={e => handleDelete(id)}><FaTrashAlt size="1.2em" /></button>
    )
}

export function EditButton({ href, as }) {
    return (
        <Link href={href} as={as}><a className="btn btn-primary btn-xs" data-toggle="tooltip" title="Edit"><FaEdit size="1.2em" /></a></Link>
    )
}

export function AddButton({ href, label }) {
    return (
        <Link href={href}><a className="btn btn-primary ml-2 btn-xs" data-toggle="tooltip" title="Add"><FaPlus size="1.2em" /> {label}</a></Link>
    )
}