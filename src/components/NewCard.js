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
  const nftReference = (article) => {
    return article.title || article.nftreference || article.nft_reference
  }
  return props.articles.map((article) => {
    console.log(article)
    return (
      <div key={article.id} className="col col-12 col-sm-6 col-lg-4  mb-4">
        <div className="card">
          <div className="card-top">
            <h1>NFT</h1>
            <img src={nftReference(article)} alt="article title"></img>
            <div className="card-body">
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
            <div className="card-body">
              <img src={TheMeter} alt="meter" className="img-fluid"></img>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default NewCard;
