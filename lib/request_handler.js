import axios from "axios"
import Cookies from "js-cookie"
import CookiesManager from './cookies_manager';

const singleton = Symbol()
const singletonEnforcer = Symbol()
const host = 'localhost:3001'
const protocol = 'http:'

class RequestHandler {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }

        this.session = axios.create({
            baseURL: `${protocol}//${host}`,
            headers: {
                'Accept': 'application/json'
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

    addJwtToHeaders = (headers, jwt) => {
        return {
            ...headers,
            'Authorization': this.craftJwtBearer(jwt)
        }
    }

    craftJwtBearer = (jwt) => {
        return `Bearer ${jwt}`
    }

    get = (...params) => this.session.get(...params)
    post = (...params) => this.session.post(...params)
    put = (...params) => this.session.put(...params)
    patch = (...params) => this.session.patch(...params)
    delete = (...params) => this.session.delete(...params)
}

export default RequestHandler.instance
