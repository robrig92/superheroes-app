import Cookies from 'js-cookie'

class CookiesManager {
    constructor(cookies = {}) {
        this.cookies = cookies
    }

    get = (name) => {
        return Cookies.get(name)
    }

    set = (name, value) => {
        Cookies.set(name, value)
    }

    destroy = (name) => {
        Cookies.remove(name)
    }
}

export default CookiesManager