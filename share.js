async function getToken() {
  const username = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(`https://somby-ny-aina.onrender.com/get-token?username=${username}&password=${password}`, {}, { headers });
    const responseData = response.data;

    if ('access_token' in responseData) {
      const accessToken = responseData.access_token;
      console.log('Access Token:', accessToken);
      document.getElementById('jeton').textContent = accessToken;
      Swal.fire({
        position: "center",
              icon: "success",
              title: "Vita",
              text: "Azo ny jeton d'accès. ",
              showConfirmButton: true,
              timer: 1500,
      });
    } else {
      console.log('Access token not found in the response');
      Swal.fire({
        position: "center",
              icon: "error",
              title: "Erreur",
              text: "Misy olana",
              showConfirmButton: true,
              timer: 1500',
      });
    }
  } catch (error) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Olana: ${error.response?.data || error.message}`,
    });
  }
}
