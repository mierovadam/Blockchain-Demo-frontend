import React from "react";
import style from "../style/Block.Module.css";
import Blockchain from "./Blockchain";

function Tokens() {
  return (
    <div>
      <div className={style.colBlockchain}>
        <h1 className={style.peers}>Peer A</h1>
        <Blockchain type="TX" />
        <h1 className={style.peers}>Peer B</h1>
        <Blockchain type="TX" />
        <h1 className={style.peers}>Peer C</h1>
        <Blockchain type="TX" />
      </div>
    </div>
  );
}
export default Tokens;
