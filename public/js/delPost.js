
const delPostHandler = async (event) => {
    const id = document.querySelector('#post-id').value;

    if(id){
        const res = await fetch('/api/post/delete', {
            method: 'DELETE',
            body: JSON.stringify({
                id
            }),
            headers:{
                'Content-Type': 'application/json',
            }
        });

        if(res.ok){
            document.location.replace('/dashboard');
        }else {
            alert('Delete failed')
        }
    }
};


document.querySelector('.del-post-btn').onclick = delPostHandler;