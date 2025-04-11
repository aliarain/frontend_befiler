import Swal from "sweetalert2"
import React from "react"
import {notification} from "antd";

const swalAlert = {
    success: async message => {
        await Swal.fire({
            title: "Success",
            html: message,
            icon: 'success',
            timer: 3000
        })
    },
    error: async message => {
        await Swal.fire({
            title: "Error",
            html: message,
            icon: 'error',
            timer: 1500
        })
    },
    warning: async (message, timer = true) => {
        await Swal.fire({
            title: "Warning",
            html: message,
            icon: 'warning',
            timer: timer ? 1500 : undefined
        })
    },
    confirm: async (message, confirmText) => {
        return await Swal.fire({
            title: "Are you sure?",
            html: message,
            icon: 'question',
            showConfirmButton: true,
            confirmButtonText: confirmText || "Yes",
            cancelButtonText: 'Cancel',
            showCancelButton: true
        })
    }
}

export default swalAlert


export const antdAlert = {
    warning: (message, description) => notification.warning({message, description})
}

export const swalLoading = () => {
    Swal.fire({
        title: "",
        html: `
         <div class="loading">
           
        </div>
         `,
        onBeforeOpen() {
            Swal.showLoading()
        },
        onAfterClose() {
            Swal.hideLoading()
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        background: "none"
    })
}