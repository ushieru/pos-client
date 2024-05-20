import Toastify from 'toastify-js'

const Theme = {
    default: 'linear-gradient(to right, #2a323c, #2a323c, #2a323c, #2a323c, #2a323c)',
    success: 'linear-gradient(to right, #00a96e, #00a96e, #00a96e, #00a96e, #00a96e)',
    error: 'linear-gradient(to right, #ff5861, #ff5861, #ff5861, #ff5861, #ff5861)',
}

export const toast = (
    text: string,
    theme: 'default' | 'success' | 'error' = 'default',
) => {
    Toastify({
        text,
        duration: 3000,
        selector: "toastify-container",
        style: {
            background: Theme[theme] ?? Theme.default,
            color: theme != 'default' ? 'black' : 'inherit'
        }
    }).showToast()
}

