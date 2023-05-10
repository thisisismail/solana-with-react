import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Card from "./components/Card";
import Form from "./components/Form";
import { getAllCampaigns } from "./solana";

const App = () => {
  const [route, setRoute] = useState(0);
  const [cards, setCards] = useState([]);
  const [walletResponse, setWalletResponse] = useState();

  const storeWallet = () => {
    const provider = window.phantom?.solana;
    setWalletResponse(provider);
  };

  const checkWallet = () => {
    console.log(walletResponse);
  };

  useEffect(() => {
    storeWallet();
    getAllCampaigns().then((val) => {
      setCards(val);
      console.log(val);
    });
  }, []);
  return (
    <div className="ui container">
      <button onClick={storeWallet}>Connect & Store Wallet</button>
      <button onClick={checkWallet}>Check Wallet</button>

      <Header setRoute={setRoute} />
      {route === 0 ? (
        <div>
          {cards.map((e, idx) => (
            <Card
              key={e.pubId.toString()}
              data={{
                title: e.name,
                description: e.description,
                amount: e.amount_donated.toString(),
                image: e.image_link,
                id: e.pubId,
                wallet: walletResponse,
              }}
              setCards={setCards}
            />
          ))}
        </div>
      ) : (
        <Form
          setRoute={(e) => {
            setRoute(e);
            getAllCampaigns().then((val) => {
              setCards(val);
            });
          }}
        />
      )}
    </div>
  );
};

export default App;
