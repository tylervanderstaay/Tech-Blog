const signupFormHandler = async (event) => {
    event.preventDefault();

    const firstname = document.querySelector('#first-name-signup').value.trim();
    const lastname = document.querySelector('#last-name-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (firstname && lastname && username && email && password){
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                firstname,
                lastname,
                username,
                email,
                password
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if(res.ok){
            document.location.replace('/dashboard');
        }else{
            alert('Failed to signup')
            alert(res.statusText);
        }
    }
};

document.querySelector('.form-signup-btn').onclick = signupFormHandler;