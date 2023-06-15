const newCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-content').value.trim();
    const id = document.querySelector('#post-id').value;

    if(comment){
        const res = await fetch('/api/comment',{
            method: 'POST',
            body: JSON.stringify({
                comment,
                id
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(res.ok){
            document.location.replace(`/post/${id}`);
        }else {
            alert('User not logged in')
        }
    }
}

document.querySelector('.new-comment-btn').onclick = newCommentFormHandler;