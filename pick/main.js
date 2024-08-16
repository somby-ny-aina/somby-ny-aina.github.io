document.getElementById('fetch-comments').addEventListener('click', fetchComments);
document.getElementById('pick-winner').addEventListener('click', pickWinner);

let comments = [];

function fetchComments() {
    const postId = document.getElementById('post-id').value;

    if (!postId) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a Facebook Post ID!',
        });
        return;
    }

    const accessToken = 'EAAGBKXRALYwBO2D0Ns5Er3a0ly3l3etkit8tNTvmOqwVZCLFJrr6a7ZBpu3L1Xhurff58ZA5ZBusJpQTQzzfX9i4m1i5m9sPXKJTbWXif5H6MRQ86jcQu3gmcZB4oYM5aZBK9MaGRZAdwDTiWhZCFo07g3CkGqwXomtzdNpjZBNJBEYfHljay6dpqltMslQZBmgtIZD';
    const url = `https://graph.facebook.com/v12.0/${postId}/comments?access_token=${accessToken}`;

    axios.get(url)
        .then(response => {
            if (response.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error fetching comments: ' + response.data.error.message,
                });
                return;
            }

            comments = response.data.data;
            displayComments();
            Swal.fire({
                icon: 'success',
                title: 'Comments Fetched',
                text: `${comments.length} comments retrieved successfully!`,
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch comments. Please try again later.',
            });
        });
}

function displayComments() {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.textContent = comment.message;
        commentsContainer.appendChild(commentElement);
    });
}

function pickWinner() {
    if (comments.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'No Comments!',
            text: 'There are no comments to pick a winner from!',
        });
        return;
    }

    const randomIndex = Math.floor(Math.random() * comments.length);
    const winner = comments[randomIndex].message;

    Swal.fire({
        icon: 'success',
        title: '🎉 We have a Winner!',
        text: `Congratulations! The selected comment is: "${winner}"`,
    });
}
