import React from "react";

// import TheBadge from "./gallery/trees.webp";
// import TheAnnie from "./gallery/b4cfa3ce.webp";
import TheMeter from "./gallery/TM_STUDIO JEN 766-84.jpg";

import "./gallery/card.css";

//<h2>{article.title}</h2>
//<p>{article.body}</p>
//<p>{article.date}</p>
//<p>{article.id}</p>

// <hr/>

function NewCard(props) {
  // const editArticle = (article) => {
  //   props.editArticle(article);
  // };

  return (
    <div>
      {props.articles &&
        props.articles.map((article) => {
          return (
            <div key={article.id}>
              <div class="card">
                <div class="card-top">
                  <h1>NFT</h1>
                  <div>
                    <div class="card-body">
                      <img src={article.title} alt="article title"></img>
                    </div>
                    <div>
                      <p>
                        <u>Date Parked:</u> {article.date}
                      </p>
                      <p>
                        <u>Garage Deposit:</u> ${article.deposit}
                      </p>
                      <p>
                        <u>Parking Yield:</u> {article.body}
                      </p>
                    </div>
                    <div class="card-body">
                      <img src={TheMeter} alt="meter"></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default NewCard;
