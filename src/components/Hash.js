import React, { useEffect, useState } from 'react';
import style from '/Users/adammierov/Desktop/blockchain-fronted/src/style/Block.Module.css';
import sha256 from "crypto-js/sha256";

function Hash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    let s = sha256("").toString();
    setHash(s);
  }, []);
  const handleHash = (e) => {
    let s = sha256(e.target.value).toString();
    setHash(s);
  };
  return (
    <div>
      <h1> SHA-256 Hash </h1>
      <div className={style.border}>
        <h4 className={style.labelData}>
          Data:
          <br />
          <textarea
            onChange={handleHash}
            className={style.textareaData}
            rows="10"
          ></textarea>
        </h4>
        <h4 className={style.labelData}>
          Hash:
          <br />
          <input
            className={style.textareaHash}
            placeholder={hash}
            disabled="true"
          ></input>
        </h4>
      </div>
    </div>
  );
}
export default Hash;