function convertContent(str) {
    const convertSpaces = str.replace(/[ \t]/g, '§');
    const convertLinesBreaks = convertSpaces.replace(/\n/g, '€');
    return convertLinesBreaks;
};

const updateButtonHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value;
    const id = document.querySelector('#post-id').value;

    if (title && content) {
        const post = convertContent(content)
        const res = await fetch('/api/post/update', {
            method: 'PUT',
            body: JSON.stringify({
                title,
                post,
                id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(res.ok){
            document.location.replace(`/post/${id}`);
        }else{
            alert('Post edit failed')
        }
    }
}

document.querySelector('edit-post-btn').onclick = updateButtonHandler