
class ResponseHandler {
    constructor(response) {
        this.data = []
        this.message = ''
        this.response = response

        this.parse();
    }

    parse() {
        let response = this.response.data

        this.data = response.data
        this.message = response.message
    }
}

export default ResponseHandler