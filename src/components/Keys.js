import React, { useState, useEffect } from "react";
import style from "/Users/adammierov/Desktop/blockchain-fronted/src/style/Keys.Module.css";
import * as secp from "noble-secp256k1";

function getRandomString(length, random) {
  var randomChars;
  if (random < 64 && random !== "") randomChars = random;
  else {
    randomChars =
      "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
  }

  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}
function Keys() {
  const [privKey, setPrivKey] = useState(
    "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e"
  );
  const [pubKey, setPubKey] = useState(() => {
    return secp.getPublicKey(privKey);
  });

  useEffect(() => {
    setPubKey(secp.getPublicKey(privKey));
  }, [privKey]);


  const changeField = (e) => {
    let value = e.target.value;

    if (value.length > 64) {
      setPrivKey(getRandomString(64, value));

    } else {
      if (value.length === 0) value += "1";
      while (value.length < 64) {
        value += "0";
      }
      setPrivKey(value);
    }
  };
  const randomClick = (e) => {
    setPrivKey(getRandomString(64, ""));
    setPubKey(secp.getPublicKey(privKey));
  };

  return (
    <div>
      <h1>Public / Private Key Pairs</h1>
      <div className={style.border}>
        <div>
          <label className={style.labelData}> Private Key :</label>

          <input
            className={style.textareaSmaller}
            value={privKey}
            onChange={changeField}
            disabled
          />
          <button className={style.button} onClick={randomClick}>
            Random
          </button>
          <div>
            <label className={style.labelData}> Public Key :</label>
            <div>
              <input
                className={style.textareaMedium}
                disabled={true}
                value={pubKey}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Keys;
