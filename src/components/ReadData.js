import React, { useState, useEffect } from "react";
// import APIService from './APIService'

/*

        fetch(`https://5455536.defiartgame.com:5000/get/12/`, {
            'method':'GET',
            headers: {
              'Content-Type':'application/json'
            }
          })
          .then(resp => resp.json())
          //.then(resp => console.log(resp))
          .then(resp =>setGetMessage(resp))
          .catch(error => console.log(error))


      <div className="ReadData">

      <div className = "col"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>

         {getMessage.map(article => {
           return (
            <div key = {article.id}>

                  <div className = "col"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}>

                          <h1>{article.deposit}</h1>
                  </div> 


          </div> 
          
          )
        })}


*/

function ReadData() {
  const [getMessage, setGetMessage] = useState([]);

  useEffect(() => {
    fetch(`https://5455536.defiartgame.com:5000/get/12/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      //.then(resp => console.log(resp))
      .then((resp) => setGetMessage(resp))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="ReadData">
      <div
        className="col"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>${getMessage.deposit}</h1>
      </div>
    </div>
  );
}

export default ReadData;
