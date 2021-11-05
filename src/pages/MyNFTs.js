import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";

import { ethers } from "ethers";

import "../components/gallery/card.css";

const txAccounts = {
  eth: "0xC39F570481EFA0C835FD2dcfEE347c521Ef8F5bb",
  poly: "0xe4eD485AAe1e4c6DF4153Daf703c660C5e77b919",
  avax: "0x9060EF1a8766f0071B58af0f3e56dB2AEBbb09e8",
};
const MyNFTs = () => {
  const currentAccount = useStoreState((state) => state.wallet.account);
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState("");
  const [level, setLevel] = useState(0);
  const [maticAbi, setMaticAbi] = useState([]);
  const [avaxAbi, setAvaxAbi] = useState([]);
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (currentAccount.length === 0) {
          setAssets([]);
          return;
        }

        const { data } = await axios.get(
          "https://api.opensea.io/api/v1/assets",
          {
            params: {
              owner: "0xb2ebc9b3a788afb1e942ed65b59e9e49a1ee500d",
              order_direction: "desc",
              offset: "0",
              limit: "20",
            },
          }
        );
        const filterAssets = data.assets.filter((asset) => {
          if (!asset.name || !asset.token_id || !asset.image_url) {
            return null;
          }
          return asset;
        });

        setAssets(filterAssets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAssets();
  }, [currentAccount]);

  const handleChange = (e) => {
    setLevel(e.target.value);
  };

  const maticSumbit = async () => {
    setError("");
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        // params: [{ chainId: "0x89" }],
        params: [{ chainId: "0x13881" }],
      });

      const maticApi = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        { params: { ids: "matic-network", vs_currencies: "usd" } }
      );

      console.log(maticApi.data["matic-network"]["usd"]);
      const txInfo = (
        Number(level) / maticApi.data["matic-network"]["usd"]
      ).toFixed(18);
      console.log(txInfo);
      const txCost = await ethers.utils.parseEther(txInfo);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      await signer.sendTransaction({
        to: txAccounts.poly,
        value: txCost,
      });
    } catch (error) {
      setError("There was a problem with your transaction");
    }
  };

  const ethSubmit = async () => {
    setError("");
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });

      const ethApi = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        { params: { ids: "ethereum", vs_currencies: "usd" } }
      );

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const txInfo = (Number(level) / ethApi.data["ethereum"]["usd"]).toFixed(
        18
      );
      console.log(txInfo);

      const txCost = await ethers.utils.parseEther(txInfo);

      await signer.sendTransaction({
        to: txAccounts.eth,
        value: txCost,
      });
    } catch (err) {
      console.log(err);
      setError("There was a problem with your transaction");
    }
  };

  const avaxSubmit = async () => {
    setError("");
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xA869" }],
        // params: [{ chainId: "0xa86a" }],
      });

      const avaxApi = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        { params: { ids: "avalanche-2", vs_currencies: "usd" } }
      );

      console.log(avaxApi.data["avalanche-2"]["usd"]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const txInfo = (
        Number(level) / avaxApi.data["avalanche-2"]["usd"]
      ).toFixed(18);

      const txCost = await ethers.utils.parseEther(txInfo);

      await signer.sendTransaction({
        to: txAccounts.avax,
        value: txCost,
      });
    } catch (error) {
      setError("There was an error with your transaction");
    }
  };

  if (assets.length < 1) {
    return <h1>No NFTs On OpenSea</h1>;
  }

  return (
    <div className="container">
      {error ? (
        <div class="alert alert-danger w-50 mx-auto my-2" role="alert">
          {error}
        </div>
      ) : (
        ""
      )}

      <div className="row align-items-center justify-content-center px-2">
        {assets.map((asset) => {
          return (
            <div
              key={asset.token_id}
              className="col col-12 col-md-6 col-lg-4 mb-4 mh-30 h-auto"
            >
              <div className="card h-75">
                <div className="card-top text-center">
                  <h3>{asset.name}</h3>
                  <img
                    src={asset.image_url}
                    alt="nft"
                    className="img-fluid w-100 px-1"
                  />
                </div>

                <div className="card-body mb-4">
                  <div className="mb-4">
                    <h5>Description</h5>
                    {asset.description}
                  </div>
                  <h5>Select Parking Garage Fee:</h5>
                  <div className="input-group mb-3 text-center">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        for="inputGroupSelect01"
                      >
                        Parking Fee
                      </label>
                    </div>
                    <select
                      className="custom-select"
                      id="inputGroupSelect01"
                      onChange={handleChange}
                      name="level"
                    >
                      <option value="0">Choose Fee</option>
                      <option value="5">$5</option>
                      <option value="25">$25</option>
                      <option value="50">$50</option>
                    </select>
                  </div>
                  <div className="mb-4 w-100">
                    <h4>Parking Level</h4>
                    <div
                      className="mb-4 p-2 d-flex align-items-center"
                      style={{
                        backgroundColor: "#CCD2E3",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <h5>L1</h5>
                      <button className="btn btn-info" onClick={ethSubmit}>
                        Ethereum
                      </button>

                      <button className="btn btn-warning mx-1 disabled">
                        Solana
                      </button>
                    </div>
                    <div
                      className="mb-4 p-2 d-flex align-items-center"
                      style={{
                        backgroundColor: "#CCDEE3",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <h5>L2</h5>
                      <button className="btn btn-primary" onClick={maticSumbit}>
                        Polygon
                      </button>
                      <button
                        className="btn btn-secondary mx-1"
                        onClick={avaxSubmit}
                      >
                        Avalanche
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-success btn-large"
                    // onClick={handleSubmit}
                  >
                    Park NFT
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyNFTs;
