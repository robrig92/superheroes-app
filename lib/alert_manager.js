"use strict"

import Swal from 'sweetalert2'

class AlertManager {
    customSwal = () => {
        return Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
        })
    }

    customInvertedSwal = () => {
        return Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-secondary',
                cancelButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })
    }

    success = (title, text) => {
        const customSwal = this.customSwal()
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
