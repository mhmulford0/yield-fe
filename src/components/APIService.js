

export default class APIService{
    static UpdateArticle(id, body) {
        return fetch(`https://5455536.defiartgame.com:5000/update/${id}/`, {
            'method':'PUT',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(body),
           
          })
          .then(resp => resp.json())
    }

    static ReadArticle(id) {
      return fetch(`https://5455536.defiartgame.com:5000/get/${id}/`, {
          'method':'GET',
          headers: {
            'Content-Type':'application/json'
          }
        })
        .then(resp => resp.json())
    }

    static InsertArticle(body) {
      return fetch(`https://5455536.defiartgame.com:5000/add`, {
          'method':'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(body),
         
        })
        .then(resp => resp.json())
  }
}