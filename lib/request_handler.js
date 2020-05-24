import axios from "axios"
import Cookies from "js-cookie"

const singleton = Symbol()
const singletonEnforcer = Symbol()
const host = 'http://localhost:3001'

class RequestHandler {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }

        console.log(`API Service for ${location.protocol}//${location.host}/api`)

        this.session = axios.create({
            baseURL: `${location.protocol}//${host}`,
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            },
        });
    }

    static get instance() {
        // Try to get an efficient singleton
        if (!this[singleton]) {
            this[singleton] = new RequestHandler(singletonEnforcer)
        }

        return this[singleton]
    }

    get = (...params) => this.session.get(...params)
    post = (...params) => this.session.post(...params)
    put = (...params) => this.session.put(...params)
    patch = (...params) => this.session.patch(...params)
    remove = (...params) => this.session.delete(...params)
}

export default RequestHandler.instance