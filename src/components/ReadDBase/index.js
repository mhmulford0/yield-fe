import React, { useState, useEffect } from "react";
import NewCard from "../NewCard";

//<ArticleList articles = {articles} editArticle = {editArticle}/>

//{editedArticle ? <Form article = {editedArticle} updatedData = {updatedData} insertedArticle = {insertedArticle}/> : null}

// import style
import "./style.scss";

function ReadDBase() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://5455536.defiartgame.com:5000/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      //.then(resp => console.log(resp))
      .then((resp) => setArticles(resp))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="ReadDBase">
      <div
        className="col"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>

      <NewCard articles={articles} />
    </div>
  );
}

export default ReadDBase;
