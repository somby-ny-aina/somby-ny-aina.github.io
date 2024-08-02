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
  accessToken = "EAAAAUaZA8jlABO9g63sv6t2nYeplbF5k9pJ0bOwhm51a7xzXzBOOFbjjWw2OwxeH456seGZANhCXfsdR9ZAP13mO3VN0biFnJST8RvZAqJvoQIcExplDoRJi9koIQfk5nuSZCXkZBHYbgjMR9H6I2R1wCyamprBh3BjpIfHVeNZCLDLRCQLZB7jUUUpiXbhAUb1w0gZDZD";
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
        logMessage('Amarino azafady');
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
        logMessage('Amarino ilay partage azafady');
      }
    }

    timer = setInterval(sharePost, timeInterval);

    setTimeout(() => {
      clearInterval(timer);
      logMessage('Vita.');
    }, shareCount * timeInterval);
  }

  startSharing();
}
