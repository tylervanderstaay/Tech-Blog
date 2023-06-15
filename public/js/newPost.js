
const newPostHandler = async(event) =>{ 
    event.preventDefault();

    const title = document.querySelector('#post-title').ariaValueMax.trim();
    const content = document.querySelector('#post-content').value;

    if (title && content){
        const newPost = convertContent(content);

        const res = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(res.ok){
            document.location.replace('/dashboard');
        } else {
            alert('Post failed');
        }
    }
};

document.querySelector('.new-post-form').onsubmit = newPostHandler;