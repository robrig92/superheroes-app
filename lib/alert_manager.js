"use strict"

import { Swal } from 'sweetalert2'

class AlertManager {
    customSuccessSwal = () => {
        return swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
        })
    }

    success = (title, text) => {
        const customSwal = this.customSuccessSwal()
        customSwal.fire({
            icon: 'success',
            title,
            text
        })
    }

    error = (title, text) => {
        const customSwal = this.customSwal()

        customSwal.fire({
            icon: 'error',
            title,
            text
        })
    }
}

export default AlertManager