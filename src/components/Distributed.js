import React from "react";
import style from "../style/Block.Module.css";
import Blockchain from "./Blockchain";
function Distributed() {
  return (
    <div>
      <div className={style.colBlockchain}>
        <h1 className={style.peers}>Peer A</h1>
        <Blockchain />
        <h1 className={style.peers}>Peer B</h1>
        <Blockchain />
        <h1 className={style.peers}>Peer C</h1>
        <Blockchain />
      </div>
    </div>
  );
}
export default Distributed;
