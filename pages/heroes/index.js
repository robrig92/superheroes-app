import RequestHandler from '../../lib/request_handler'
import { useRouter } from 'next/router'
import { AddButton } from '../../components/forms/buttons'
import Layout from '../../components/layout'
import ResponseHandler from '../../lib/response_handler'
import CookiesManager from '../../lib/cookies_manager'
import AlertManager from '../../lib/alert_manager' 
import GridHeroes from '../../components/heroes/grid'
import Cards from '../../components/heroes/cards'
import { useState } from 'react'
import { FaEye } from 'react-icons/fa'

export default function Index({ heroes }) {
    const router = useRouter()
    const [showMode, setShowMode] = useState('grid')

    const handleDelete = (id) => {
        const cookiesManager = new CookiesManager()
        const jwt = cookiesManager.get('jwt')
        let headers = RequestHandler.addJwtToHeaders({}, jwt)
        const alertManager = new AlertManager()
        const customSwal = alertManager.customInvertedSwal()

        customSwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                RequestHandler.delete(`heroes/${id}`, { headers })
                    .then((response) => {
                        alertManager.success('Deleted!', 'The heroe has been deleted')
                        router.push('/heroes')
                    })
                    .catch((error) => {
                        alertManager.error('Oops...', 'Something went wrong!')
                    })
            }
        })
    }

    const renderList = (heroes) => {
        if (showMode === 'grid') {
            return <GridHeroes heroes={heroes} handleDelete={handleDelete}/>
        }

        return <Cards heroes={heroes} />
    }

    return (
        <Layout title="Heroes" selected="heroes">
            <div className="row">
                <div className="col-12 text-right">
                    <button className="btn btn-primary" onClick={(e) => {setShowMode(showMode === 'grid' ? 'cards' : 'grid')}}><FaEye size="1.2em" /> Change view</button>
                    <AddButton href="/heroes/new" label="Heroe" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    {renderList(heroes)}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let heroes = []
    let jwt = context.req.cookies.jwt
    let headers = RequestHandler.addJwtToHeaders({}, jwt)

    try {
        const response = await RequestHandler.get('/heroes', { headers })
        let responseHandler = new ResponseHandler(response)
        heroes = responseHandler.data.heroes
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            heroes
        }
    }
}
