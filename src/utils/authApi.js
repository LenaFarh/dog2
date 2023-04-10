const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка`);
};

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  registerUser(data) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data)
    }).then(onResponse);
  }

  login(dataUser) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(dataUser)
    }).then(onResponse);
  }

  resetPass(email) {
    return fetch(`${this._baseUrl}/forgot-password`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(email)
    }).then(onResponse);
  }

  changePass(token, password) {
    return fetch(`${this._baseUrl}/password-reset/${token}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(password)
    }).then(onResponse);
  }

}

export const authApi = new Api(config);
