import React from "react";
import style from "/Users/adammierov/Desktop/blockchain-fronted/src/style/Block.Module.css";
import Blockchain from "./Blockchain";
function CoinBase() {
  return (
    <div>
      <div className={style.colBlockchain}>
        <h1 className={style.peers}>Peer A</h1>
        <Blockchain type="TXKeys,CoinBase" />
        <h1 className={style.peers}>Peer B</h1>
        <Blockchain type="TXKeys,CoinBase" />
        <h1 className={style.peers}>Peer C</h1>
        <Blockchain type="TXKeys,CoinBase" />
      </div>
    </div>
  );
}
export default CoinBase;
