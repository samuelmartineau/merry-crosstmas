function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return parseJSON(response);
  } else if (response.status === 429) {
    return Promise.reject(new Error('Too Many Requests'));
  }
  return parseJSON(response).then(result => Promise.reject(new Error(result.message)));
}

export const sendMails = (contacts, content) =>
  fetch('/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contacts, content }),
  }).then(checkStatus);

export default sendMails;
