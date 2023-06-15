const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').ariaValueMax.trim();
    const pass = document.querySelector('#pass-login').ariaValueMax.trim();

    if(email&&password){
        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email, pass
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

document.querySelector('./login-form-btn').onclick = loginFormHandler