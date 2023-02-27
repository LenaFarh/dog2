const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
      'content-type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VlNjI4NTNhYTI4NTAzNGY3OGFiMTgiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2NTY3MzIxLCJleHAiOjE3MDgxMDMzMjF9.Ll4fQjRpEicfUonoM9L5V4AXjGYy__TvqDThnREHPuY',
    },
  };
  
  const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };
  
  class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getProductList(page=1) {
      return fetch(`${this._baseUrl}/products?page=${page}`, {
        headers: this._headers,
      }).then(onResponse);
    }

    getProductById(id) {
      return fetch(`${this._baseUrl}/products/${id}`, {
        headers: this._headers,
      }).then((res) => onResponse(res));
    }

    addNewProduct() {
      return fetch(`${this._baseUrl}/products`, {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({     
    "available": true, 
    "name": "для собак", 
    "pictures": "https://avatars.mds.yandex.net/get-mpic/6597196/img_id7421965786492771631.jpeg/orig", 
    "price": 450, 
    "discount": 10, 
    "stock": 10, 
    "wight": "100 г",
    "description": "Натуральное лакомство для взрослых и растущих собак" 
})
      }).then(onResponse);
    }

    updateProduct(productId, data) {
      return fetch(`${this._baseUrl}/products/${productId}`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify(data)  
    }).then((res) => onResponse(res));
    }

    deleteProductId(productId){
     return fetch(`${this._baseUrl}/products/${productId}`, {
      headers: this._headers,
       method: 'DELETE'   
      }).then(onResponse); 
  }

    getUsersInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
          }).then(onResponse);
    }

    searchProducts(query) {
        return fetch(`${this._baseUrl}/products/search?query=${query}`, {
            headers: this._headers,
          }).then(onResponse);
    }

    deleteLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        headers: this._headers,
        method: "DELETE",
      }).then(onResponse);
    }

    addLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        headers: this._headers,
        method: "PUT",
      }).then(onResponse);
    }

  deleteCommentProduct(productId, reviewId) {
      return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
          headers: this._headers,
          method: 'DELETE'
      }).then((res) => onResponse(res));
  }
  
  getAllCommentProducts() {
      return fetch(`${this._baseUrl}/products/review/`, {
          headers: this._headers,
          method: 'GET'
      }).then((res) => onResponse(res));
  }
  
  getCommentProduct(productId) {
      return fetch(`${this._baseUrl}/products/review/${productId}`, {
          headers: this._headers,
          method: 'GET'
      }).then((res) => onResponse(res));
  }

  addCommentProduct(productId) {
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      headers: this._headers,
      method: "POST",
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