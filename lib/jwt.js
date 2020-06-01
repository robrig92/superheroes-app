import CookiesManager from './cookies_manager'

class Jwt {
    constructor() {
        this.cookiesManager = new CookiesManager()
    }

    get () {
        return this.cookiesManager.get('jwt')
    }

    store (jwt) {
        this.cookiesManager.set('jwt', jwt)
    }

    destroy () {
        this.cookiesManager.destroy('jwt')
    }
}

export default Jwt