
const newPostFormHandler = async ( event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if(title && content){
        const res = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(res.ok){
            document.location.replace('/dashboard');
        }else{
            alert('Add post failed')
        }
    }
}

document.querySelector('.new-post-form').onsubmit = newPostFormHandler