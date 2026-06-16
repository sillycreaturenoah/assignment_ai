document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const notification = document.getElementById('notification');

    if (urlParams.has('success')) {
        const success = urlParams.get('success');
        if (success === 'account_created') {
            notification.textContent = 'Account created successfully! Please login.';
            notification.className = 'notification success';
        }
    }

    if (urlParams.has('error')) {
        const error = urlParams.get('error');
        let message = '';
        switch(error) {
            case 'username_exists':
                message = 'Username already exists.';
                break;
            case 'user_not_found':
                message = 'User not found.';
                break;
            case 'wrong_password':
                message = 'Wrong password.';
                break;
            case 'db_error':
            case 'server_error':
                message = 'An error occurred. Please try again.';
                break;
            default:
                message = 'An error occurred.';
        }
        notification.textContent = message;
        notification.className = 'notification error';
    }
});