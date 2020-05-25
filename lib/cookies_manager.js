import Cookies from 'js-cookie'

class CookiesManager {
    constructor(cookie = {}) {
        this.cookie
    }

    serverSideGet(name) {
        return this.cookie.get(name)
    }

    get(name) {
        return Cookies.get(name)
    }

    set(name, value) {
        Cookies.set(name, value)
    }

    destroy(name) {
        Cookies.remove(name)
    }
}

export default CookiesManager