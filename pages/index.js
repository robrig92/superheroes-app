import Head from 'next/head'
import RequestHandler from '../lib/request_handler'
import ResponseHandler from '../lib/response_handler'

export default function ScoreBoard({ heroes }) {
    return (
        <div className="row">
            <Head>
                <title>Heroes</title>
            </Head>
            <div className="col-12 text-center">
                <h1>Rate my heroe!</h1>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let heroes = []

    try {
        const response = await RequestHandler.get('/heroes')
        let responseHandler = new ResponseHandler(response)
        heroes = responseHandler.data.Heroes
    } catch(error) {
        console.log(error)
    }

    return {
        props: {
            heroes
        }
    }
}
