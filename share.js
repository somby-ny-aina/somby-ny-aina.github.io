async function getToken() {
  const username = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  const form = {
    adid: 'e3a395f9-84b6-44f6-a0ce-fe83e934fd4d',
    email: username,
    password: password,
    format: 'json',
    device_id: '67f431b8-640b-4f73-a077-acc5d3125b21',
    cpl: 'true',
    family_device_id: '67f431b8-640b-4f73-a077-acc5d3125b21',
    locale: 'en_US',
    client_country_code: 'US',
    credentials_type: 'device_based_login_password',
    generate_session_cookies: '1',
    generate_analytics_claim: '1',
    generate_machine_id: '1',
    currently_logged_in_userid: '0',
    irisSeqID: 1,
    try_num: '1',
    enroll_misauth: 'false',
    meta_inf_fbmeta: 'NO_FILE',
    source: 'login',
    machine_id: 'KBz5fEj0GAvVAhtufg3nMDYG',
    fb_api_req_friendly_name: 'authenticate',
    fb_api_caller_class: 'com.facebook.account.login.protocol.Fb4aAuthHandler',
    api_key: '882a8490361da98702bf97a021ddc14d',
    access_token: '350685531728%7C62f8ce9f74b12f84c123cc23437a4a32'
  };

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'x-fb-friendly-name': form.fb_api_req_friendly_name,
    'x-fb-http-engine': 'Liger',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
  };

  try {
    const response = await axios.post('https://b-graph.facebook.com/auth/login', new URLSearchParams(form), { headers });
    const responseData = response.data;

    if ('access_token' in responseData) {
      const accessToken = responseData.access_token;
      console.log('Access Token:', accessToken);
      document.getElementById('jeton').textContent = accessToken;
    } else {
      console.log('Access token not found in the response');
    }
  } catch (error) {
    console.error('Error fetching access token:', error.response?.data || error.message);
  }
}