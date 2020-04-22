const fetch = require("node-fetch");
const queryString = require('query-string');

const defaultErrorMsgs = {
  '400': 'Invalid Request',
  '500': 'Server Error',
  'network': 'A network error has occured'
};

function status(response, errorMessages) {
  let status = response.status;

  if (response.ok) {
    return response.json();
  }

  if (status === 401) {
    window.location = '/';
  }

  if (status >= 400 && status < 500) {
    return Promise.reject({
      status: 400,
      errorMessage: errorMessages['400']
    });
  } else {
    return Promise.reject({
      status: 500,
      errorMessage: errorMessages['500']
    });
  }
}

function handleError(error) {
  if(error.status) {
    return Promise.reject(error);
  }
  return Promise.reject({errorMessage: defaultErrorMsgs['network']}
  );
}

function getJson(url, data, errorMessages = defaultErrorMsgs) {
  const params = queryString.stringify(data);

  if (params) {
    url = `${url}?${params}`;
  }

  return fetch(url, {credentials: 'same-origin'})
  .then(response => status(response, errorMessages))
  .catch(error => handleError(error));
}

module.exports = getJson;
