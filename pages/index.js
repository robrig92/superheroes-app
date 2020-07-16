import Head from 'next/head'
import React from 'react';

import Cards from '../components/heroes/cards';
import RequestHandler from '../lib/request_handler'
import ResponseHandler from '../lib/response_handler'

export default function ScoreBoard({ heroes }) {
    return (
        <div clasaName="container-fluid" style={{ minHeight: '100vh', minWidth: '100hw', backgroundColor: '#212121', color: '#ffffff' }}>
            <div className="row">
                <div className="col-12">
                    <div className="container" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#ffffff' }}>
                        <Head>
                            <title>Heroes</title>
                        </Head>
                        <div className="row">
                            <div className="col-12 text-center">
                                <div>
                                    <hr />
                                    <h1>Rate my heroes!</h1>
                                    <hr />
                                </div>
                            </div>
                            <div className="col-12" style={{ color: '#000000' }}>
                                <Cards
                                    heroes={heroes}
                                    handleDelete={() => {}}
                                    mode="scores"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let heroes = []

    try {
        const response = await RequestHandler.get('/heroes')
        let responseHandler = new ResponseHandler(response)
        heroes = responseHandler.data.heroes
    } catch(error) {
        console.log(error)
    }

    return {
        props: {
            heroes
        }
    }
}
