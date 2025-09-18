'use client'

import { Slide, ToastContainer } from 'react-toastify'



export default function ToastNotification() {
    return (
        <ToastContainer
            position='bottom-left'
            hideProgressBar
            theme='colored'
            transition={Slide}
            autoClose={3000}

        />
    )
}
