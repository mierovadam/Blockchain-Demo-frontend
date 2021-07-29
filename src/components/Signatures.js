import React, { useState, useEffect } from "react";
import style from "../style/Keys.Module.css";
import * as secp from "noble-secp256k1";
import { SHA256 } from "crypto-js";


function getRandomString(length) {
  var randomChars =
    "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

function Signatures() {
  const [message, setMessage] = useState(localStorage.getItem("message") || "");
  const [isSigned, setSigned] = useState(true);
  const [compute, setCompute] = useState();
  const [privKey, setPrivKey] = useState(
    localStorage.getItem('privKey') || "9947223435618113894447185862823559075621607340267964844941537471"
  );
  const [pubKey, setPubKey] = useState(
    "045c8ff2c485de1b2df775787d4429f567b8b1ed70216eea43ba7767b62f5f0fd74485d5496255616076e57977caac7dfae2dd5986ba54e8b5d380af0127b37b74"
  );
  const [signature, setSignature] = useState();
  const [signatureVerify, setSignatureVerify] = useState();
  const handleChangedFields = ((e) => {
    let value = e.target.value
    if (e.target.id === "privKey") {
      setPrivKey(privKey)
    } else if (e.target.id === "pubKey") {
      setPubKey(value)
    } else if (e.target.id === "message") {
      setMessage(value)
    } else {
      localStorage.setItem("signatureVerify", signatureVerify);
      setSignatureVerify(value)
    }

  })


  const clickOnSign = (() => {
    let tempMessage = SHA256(message).toString()

    secp.sign(tempMessage, privKey).then((result) =>
      setCompute({
        result,
      })
    );;
  })


  const clickOnVerify = (() => {
    if (
      pubKey !== secp.getPublicKey(privKey) ||
      signatureVerify !== signature ||
      signatureVerify === ""
    ) {
      setSigned(false);
    } else {
      let tempMessage = SHA256(message).toString();
      setSigned(secp.verify(signatureVerify, tempMessage, pubKey));
    }
  })

  const randomClick = (e) => {
    setPrivKey(getRandomString(64));
  };


  useEffect(() => {
    setSignatureVerify(signature)
  }, [signature])


  useEffect(() => {
    localStorage.setItem("privKey", privKey);
    setPubKey(secp.getPublicKey(privKey));
  }, [privKey]);


  useEffect(() => {
    localStorage.setItem("message", message);

  }, [message]);

  useEffect(() => {
  }, [isSigned]);



  useEffect(() => {
    if (compute !== undefined) {
      let temp = JSON.stringify(compute.result.toString());
      temp = temp.split('"').join("");
      setSignature(temp);
      // special case when signatureVerify change and signature not
      if (signatureVerify !== signature) {
        setSignatureVerify(signature);
      }
      setPubKey(secp.getPublicKey(privKey));
      setSigned(true);
    } else {
      setSignature("");
    }
    //
  }, [compute]);


  return (
    <div>
      <h1>Signatures</h1>
      <div className={style.pageContainer}>
        <div className={style.border}>
          <h2 className={style.labelData}>Sign</h2>
          <div>
            <label className={style.labelData}>Message</label> <br />
            <textarea
              className={style.textareaBigger}
              id="message"
              value={message}
              onChange={handleChangedFields}
            ></textarea>
          </div>
          <br />
          <div>
            <label className={style.labelData}>Private Key</label> <br />
            <input
              className={style.textareaSmaller}
              value={privKey}
              onChange={handleChangedFields}
              disabled
            />
            <button className={style.button} onClick={randomClick}>
              Random
            </button>
          </div>
          <br />
          <button className={style.signButton} onClick={clickOnSign}>
            Sign
          </button>
          <div>
            <label className={style.labelData}>Message Signature</label>{" "}
            <br />
            <input
              className={style.textareaSmaller}
              disabled
              value={signature}
            ></input>
          </div>
        </div>

        <div className={isSigned ? style.border : style.redborder}>
          <h2 className={style.labelData}>Verify</h2>

          <div>
            <label className={style.labelData}>Message</label> <br />
            <textarea
              className={style.textareaBigger}
              value={message}
              id="message"
              onChange={handleChangedFields}
            ></textarea>
          </div>
          <br />
          <div>
            <label className={style.labelData}>Public Key</label> <br />
            <input
              className={style.textareaSmaller}
              id="pubKey"
              value={pubKey}
              onChange={handleChangedFields}
            ></input>
          </div>
          <br />
          <div>
            <label className={style.labelData}>Message Signature</label>
            <br />
            <input
              className={style.textareaSmaller}
              id="signature"
              value={signatureVerify}
              onChange={handleChangedFields}
            ></input>
          </div>
          <button className={style.signButton} onClick={clickOnVerify}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );

}
export default Signatures;