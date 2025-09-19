'use client'

import { Slide, ToastContainer } from 'react-toastify'



export default function ToastNotification() {
    return (
        <ToastContainer
            position='top-left'
            hideProgressBar
            theme='colored'
            transition={Slide}
            autoClose={3000}

        />
    )
}
