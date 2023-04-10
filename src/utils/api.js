
  const freshToken = ()=>{
    return { headers: {
      'content-type': 'application/json',
      Authorization:
        localStorage.getItem('token'),
    }}
  }
  
  const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
      'content-type': 'application/json',
        Authorization:
          localStorage.getItem('token'),
    },
    freshToken: freshToken
  };
  

  const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };
  
  class Api {
    constructor(data) {
      this._baseUrl = data.baseUrl;
      this._headers = data.headers;
      this._freshToken = data.freshToken;
    }

    getProductList(page=1) {
      return fetch(`${this._baseUrl}/products?page=${page}`, {
      ...this._freshToken(),
      }).then(onResponse);
    }

    getProductById(id) {
      return fetch(`${this._baseUrl}/products/${id}`, {
        ...this._freshToken(),
      }).then((res) => onResponse(res));
    }

    addNewProduct(data) {
      return fetch(`${this._baseUrl}/products`, {
        ...this._freshToken(),
        method: "POST",
        body: JSON.stringify(data)
      }).then(onResponse);
    }

    updateProduct(productId, data) {
      return fetch(`${this._baseUrl}/products/${productId}`, {
        ...this._freshToken(),
        method: 'PATCH',
        body: JSON.stringify(data)  
    }).then((res) => onResponse(res));
    }

    deleteProductId(productId){
     return fetch(`${this._baseUrl}/products/${productId}`, {
      ...this._freshToken(),
       method: 'DELETE'   
      }).then(onResponse); 
  }

    getUsersInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          ...this._freshToken(),
          }).then(onResponse);
    }

    updateUserInfo(body) {
      return fetch(`${this._baseUrl}/users/me`, {
        ...this._freshToken(),
        method: "PATCH",
        body:JSON.stringify(body),
        }).then(onResponse);
  } 

    getUsers() {
      return fetch(`${this._baseUrl}/users`, {
        ...this._freshToken(),
        }).then(onResponse);
  }

  updateAvatar(avatar){
    return fetch(`${this._baseUrl}/v2/group-10/users/me/avatar`, {
      ...this._freshToken(),
      method: "PATCH",
      body:JSON.stringify(avatar),
    }).then(onResponse);
  }

    searchProducts(query) {
        return fetch(`${this._baseUrl}/products/search?query=${query}`, {
          ...this._freshToken(),
          }).then(onResponse);
    }

    deleteLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        ...this._freshToken(),
        method: "DELETE",
      }).then(onResponse);
    }

    addLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        ...this._freshToken(),
        method: "PUT",
      }).then(onResponse);
    }

  deleteCommentProduct(productId, reviewId) {
      return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
        ...this._freshToken(),
          method: 'DELETE'
      }).then((res) => onResponse(res));
  }
  
  getAllCommentProducts() {
      return fetch(`${this._baseUrl}/products/review/`, {
        ...this._freshToken(),
          method: 'GET'
      }).then((res) => onResponse(res));
  }
  
  getCommentProduct(productId) {
      return fetch(`${this._baseUrl}/products/review/${productId}`, {
        ...this._freshToken(),
          method: 'GET'
      }).then((res) => onResponse(res));
  }

  addCommentProduct(productId, body) {
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      ...this._freshToken(),
      method: "POST",
      body:JSON.stringify(body)
    }).then(onResponse);
  }


  }
  
const updProduct = {
  "id": 1674032335402,
  "available": true, 
  "name": "Лакомство для собак кроличьи уши с куриным мясом", 
  "pictures": "https://static.insales-cdn.com/r/N9QzsyFZVKs/rs:fit:1000:1000:1/plain/images/products/1/3404/607440204/import_files_d4_d4c0b757-2e55-11e8-b4b6-001cc47c03c4_8f5b6d18-a218-11e8-a943-001cc47c03c4.jpeg@webp", 
  "price": 650, 
  "discount": 15, 
  "stock": 10, 
  "wight": "100 г",
  "description": "Натуральное лакомство для взрослых и растущих собак (с четырех месяцев). Кроличьи уши с куриным мясом Мнямс - это полезное диетическое лакомство, содержащее легкоусвояемый белок. Настоящий деликатес с вялеными ломтиками отборного филе не оставит равнодушным даже самого капризного любимца." 
}


export const api = new Api(config);
//api.addNewProduct(newProduct);
//api.getProductById("63ecdd5d59b98b038f77b659")
//api.updateProduct(1674032335402, updProduct)
//api.deleteProductId()