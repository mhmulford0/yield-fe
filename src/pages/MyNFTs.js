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
  const [network, setNetwork] = useState("eth");
  const [level, setLevel] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (currentAccount.length === 0) {
          setAssets([]);
          return;
        }

        const ethApi = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          { params: { ids: "ethereum", vs_currencies: "usd" } }
        );
        setEthPrice(ethApi.data.ethereum.usd);

        const { data } = await axios.get(
          "https://api.opensea.io/api/v1/assets",
          {
            params: {
              owner: currentAccount,
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
  const handleSubmit = async () => {
    if (!window.ethereum) return window.open("https://metamask.io/download");

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const txInfo = (Number(level) / ethPrice).toFixed(18);

    try {
      const txCost = await ethers.utils.parseEther(txInfo);

      await signer.sendTransaction({
        to: txAccounts[network],
        value: txCost,
      });
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div
      className="container w-100"
      style={{
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {error ? (
        <div class="alert alert-danger w-64" role="alert">
          {error}
        </div>
      ) : (
        ""
      )}

      {assets.length > 0 ? (
        assets.map((asset) => {
          return (
            <div key={asset.token_id} className="w-100">
              <div class="card">
                <div class="card-top">
                  <h1>{asset.name}</h1>
                  <img src={asset.image_url} alt="nft" className="img-fluid" />
                </div>

                <div class="card-body mb-4">
                  <div className="mb-4">
                    <h5>Description</h5>
                    {asset.description}
                  </div>
                  <h5>Select Parking Garage Level:</h5>
                  <div className="input-group mb-3 text-center">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        for="inputGroupSelect01"
                      >
                        Parking Level
                      </label>
                    </div>
                    <select
                      className="custom-select"
                      id="inputGroupSelect01"
                      onChange={handleChange}
                      name="level"
                    >
                      <option value="0">Choose Level</option>
                      <option value="10">$10</option>
                      <option value="25">$25</option>
                      <option value="50">$50</option>
                    </select>
                  </div>
                  <div className="mb-4 w-100">
                    <button
                      className="btn btn-info mx-1"
                      onClick={async () => {
                        await window.ethereum.request({
                          method: "wallet_switchEthereumChain",
                          params: [{ chainId: "0x1" }],
                        });
                        setNetwork("eth");
                      }}
                    >
                      Ethereum
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={async () => {
                        setNetwork("poly");
                        await window.ethereum.request({
                          method: "wallet_switchEthereumChain",
                          params: [{ chainId: "0x89" }],
                        });
                      }}
                    >
                      Polygon
                    </button>
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={async () => {
                        setNetwork("avax");
                        await window.ethereum.request({
                          method: "wallet_switchEthereumChain",
                          params: [{ chainId: "0xa86a" }],
                        });
                      }}
                    >
                      AVAX
                    </button>
                  </div>
                  <button
                    className="btn btn-success btn-large"
                    onClick={handleSubmit}
                  >
                    Park NFT
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>No NFTs On OpenSea</h1>
      )}
    </div>
  );
};

export default MyNFTs;
