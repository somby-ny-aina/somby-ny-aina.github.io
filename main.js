function postShare() {
  let sharedCount = 0;
  let timer = null;
  
  function logMessage(message) {
    const logDiv = document.getElementById('answer');
    logDiv.textContent += message + '\n';
  }

  function startSharing() {
    let accessToken = document.getElementById("token").value;
    const shareUrl = document.getElementById("lien").value;
    const shareCount = parseInt(document.getElementById("isa").value, 10);
    const timeInterval = 1500;
    const deleteAfter = 60 * 60;

    if (accessToken === "") {
  accessToken = "EAAAAUaZA8jlABO7TvZAcMZAMIDZAZCSZCDhGfZAR4bN8V0Vm44KP65lDrJYDzckJGQcaxErGAbUCQZBZAhHb8c3ZCDdovfKZA9MXNRe2NyzrRFmxFgZC4aQ407B7J1wDcsh7dPdMsqqQBLmtEn6aQwKx4I7uoI81oZCidk0RZCGfYK28Lm4SRXkgidgBLonIMFZB7ZAYOo2KTgZDZD";
    }

    async function sharePost() {
      try {
        const response = await axios.post(`https://graph.facebook.com/me/feed`, {
          link: shareUrl,
          privacy: { value: 'SELF' },
          no_story: true
        }, {
          params: {
            access_token: accessToken,
            fields: 'id',
            limit: 1,
            published: 0
          },
          headers: {
            'Content-Type': 'application/json',
            'authority': 'graph.facebook.com',
            'cache-control': 'max-age=0',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
          }
        });

        const data = response.data;

        sharedCount++;
        const postId = data.id;

        logMessage(`Post shared: ${sharedCount}`);
        logMessage(`Post ID: ${postId || 'Unknown'}`);

        if (sharedCount === shareCount) {
          clearInterval(timer);
          logMessage('Finished sharing posts.');

          if (postId) {
            setTimeout(() => {
              deletePost(postId);
            }, deleteAfter * 1000);
          }
        }
      } catch (error) {
        logMessage(`Publication partagée: ${sharedCount}`);
      }
    }

    async function deletePost(postId) {
      try {
        const response = await axios.delete(`https://graph.facebook.com/${postId}`, {
          params: {
            access_token: accessToken
          }
        });

        logMessage(`Post deleted: ${postId}`);
      } catch (error) {
        logMessage('Misy erreur.');
      }
    }

    timer = setInterval(sharePost, timeInterval);

    setTimeout(() => {
      clearInterval(timer);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vita",
        text: "Amarino ilay partage azafady",
        showConfirmButton: false,
        timer: 1500
    });
    }, shareCount * timeInterval);
  }

  startSharing();
}
