import React, { useState, useEffect } from 'react';
import ArticleList from '../ArticleList';
import Form from '../Form';


// import style
import "./style.scss";
 
function DBase() {
    const [articles, setArticles] = useState([])
    const [editedArticle, setEditedArticle] = useState(null)
  
    useEffect(() => {
      fetch('https://5455536.defiartgame.com:5000/get', {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      //.then(resp => console.log(resp))
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))
  
    },[])

    const editArticle = (article) => {
      //console.log("Hello World")
      setEditedArticle(article)
    }

    const updatedData = (article) => {
      const new_article = articles.map(my_article => {
        if(my_article.id === article.id) {
          return article
        } else {
          return my_article
        }
      })
      setArticles(new_article)
    }

    const openForm =() => {
      setEditedArticle({title:'', body:''})
    }

    const insertedArticle = (article) => {
      const new_articles = [...articles, article]
      setArticles(new_articles)

    }

    return (
      <div className="DBase">

        <div className = "col"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}

        >
          <button
          className = "btn btn-success"
          onClick = {openForm}
          >Park NFT</button>
        </div>


        <br/>
        <br/>

        <ArticleList articles = {articles} editArticle = {editArticle}/>

        {editedArticle ? <Form article = {editedArticle} updatedData = {updatedData} insertedArticle = {insertedArticle}/> : null}
        
      
    </div>
   );
}

export default DBase