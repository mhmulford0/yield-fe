import React, { Fragment } from "react";

import ReadDBase from "../../components/ReadDBase";
import ReadData from "../../components/ReadData";
// import styles
import "./style.scss";

/*
   <div className="btn-wrapper">
            <div className="btn-artists text-center">
              <Link to="/artists">Artists - Creators</Link>
            </div>
            <div className="btn-buyers text-center">
              <Link to="/buyers">Buyers - Collectors</Link>
            </div>
          </div>

          Where NFTs meet DeFi in a Virtual Arcade

*/

const Home = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="home-wrapper">
          <h2 className="subtitle text-center">
            coordinated-crypto-art-skunk-pools
          </h2>
          <h1 className="title text-center">DeFi Art Game</h1>
          <p className="text text-center">Current Rewards Pool:</p>
        </div>
      </div>
      <ReadData />
      <ReadDBase />
    </Fragment>
  );
};

export default Home;
