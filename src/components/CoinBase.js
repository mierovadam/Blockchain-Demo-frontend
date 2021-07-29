import React from 'react';
import style from "/Users/adammierov/Desktop/blockchain-fronted/src/style/Block.Module.css";
import Blockchain from "./Blockchain";
function CoinBase() {
  return (
    <div className={style.colBlockchain}>
      <h1 className={style.peers}>Peer A</h1>
      <Blockchain type="TX,CoinBase" />
      <h1 className={style.peers}>Peer B</h1>
      <Blockchain type="TX,CoinBase" />
      <h1 className={style.peers}>Peer C</h1>
      <Blockchain type="TX,CoinBase" />
    </div>

  );
}
export default CoinBase;