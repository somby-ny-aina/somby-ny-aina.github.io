// Initialize the Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId      : '423490020715916', // Replace with your Facebook App ID
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
    });

    // Optional: Check login status
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log('Logged in.');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Not Logged In',
                text: 'Please log in to Facebook to use this feature.',
            });
        }
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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
    FB.api(
        `/${postId}/comments`,
        'GET',
        { access_token: accessToken },
        function(response) {
            if (!response || response.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error fetching comments: ' + (response.error ? response.error.message : 'Unknown error'),
                });
                return;
            }

            comments = response.data;
            displayComments();
            Swal.fire({
                icon: 'success',
                title: 'Comments Fetched',
                text: `${comments.length} comments retrieved successfully!`,
            });
        }
    );
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
