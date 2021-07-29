import { BeatLoader } from "react-spinners";
import style from "../style/Block.Module.css";
import React, { useEffect, useState } from "react";
import Block from "./Block";
import { css } from "@emotion/react";
import axios from "axios";

const Blockchain = ({ type }) => {
  var send;
  if (type == null) {
    send = "BlockChain";
  } else {
    send = type;
  }
  const loaderCSS = css`
    margin-top: 25px;
    margin-bottom: 25px;
  `;
  const [loading, setLoading] = useState(true);
  const [chain, setChain] = useState("");

  useEffect(() => {
    if (send === "BlockChain") {
      axios.get("http://localhost:3001/getblockchain").then((res) => {
        setLoading(false);
        setChain(res.data.chain);

      });
    } else if (send === "TX") {
      axios.get("http://localhost:3001/gettokenblockchain").then((res) => {
        setLoading(false);
        setChain(res.data.chain);

      });
    } else if (send === "TX,CoinBase") {
      axios.get("http://localhost:3001/getcoinbaseblockchain").then((res) => {
        setLoading(false);
        setChain(res.data.chain);
      });
    } else {
      axios.get("http://localhost:3001/getensignedblockchain").then((res) => {
        setLoading(false);
        setChain(res.data.chain);
      });
    }
  }, []);

  return (
    <>
      {loading === false && chain !== "" && send === "BlockChain" ? (
        <div id="root" className={style.Row}>
          {Object.values(chain).map((item, i) => (
            <Block
              key={i}
              type={send}
              bNumber={item.index}
              initNonce={item.nonce}
              initPrevHash={item.previousHash}
              initHash={item.hash}
            />
          ))}
        </div>
      ) : loading === false &&
        chain !== "" &&
        (send === "TX" || send === "TX,CoinBase") ? (
        <div id="root" className={style.Row}>
          {Object.values(chain).map((item, i) => (
            <Block
              key={i}
              type={send}
              bNumber={item.index}
              initNonce={item.nonce}
              initPrevHash={item.previousHash}
              initHash={item.hash}
              stringData={item.stringData}
              initTx={item.data}
              initCoin={item.coinbase}
            />
          ))}
        </div>
      ) : loading === false && chain !== "" && send === "TXKeys,CoinBase" ? (
        <div id="root" className={style.Row}>
          {Object.values(chain).map((item, i) => (
            <Block
              key={i}
              type={send}
              bNumber={item.index}
              initNonce={item.nonce}
              initPrevHash={item.previousHash}
              initHash={item.hash}
              stringData={item.stringData}
              initTx={item.data}
              initCoin={item.coinbase}
            />
          ))}
        </div>
      ) : (
        <div className={style.spinner}>
          <BeatLoader css={loaderCSS} size={72} color="green" loading />
        </div>
      )}
    </>
  );
};

export default Blockchain;
