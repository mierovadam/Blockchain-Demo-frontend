import React, { useState, useEffect } from "react";
import style from "../style/Keys.Module.css";
import Tx from "./Tx";
import * as secp from "noble-secp256k1";


function TxKeys({
  initPrivKey,
  initIndex,
  initDollar,
  initFrom,
  initTo,
  propTxKeys
}) {
  const [index] = useState(initIndex);

  const [dollar, setDollar] = useState(initDollar);
  const [from, setFrom] = useState(initFrom);
  const [to, setTo] = useState(initTo);
  const [privKey] = useState(initPrivKey);
  const [isSigned, setSigned] = useState(true);
  const [compute, setCompute] = useState();
  const [sig, setSig] = useState(() => {

    secp.sign((dollar), privKey).then((result) =>
      setCompute({
        result,
      })
    )
  }
  );

  const handleChangeField = (e) => {
    setSig(e.target.value);

  };
  const handleChangeFieldTx = (args, argv) => {
    setDollar(args[1])
    setFrom(args[2]);
    setTo(args[3]);

  }
  useEffect(() => {

  }, [dollar])
  useEffect(() => {

    propTxKeys([index, dollar, from, to, sig]);
  }, [dollar, from, to, sig]);
  useEffect(() => {
    if (to.length > 130 || to.length < 130) {
      setSigned(false);
    } else if (sig !== undefined) {
      let tempMessage = (dollar).toString();
      setSigned(secp.verify(sig, tempMessage, to));
    }

  }, [dollar, to]);

  useEffect(() => {
    if (compute !== undefined) {
      let temp = JSON.stringify(compute.result.toString());

      temp = temp.split('"').join("");
      setSig(temp);
    }
  }, [compute]);


  return (
    <div>
      <Tx
        key={index}
        index={index}
        initDollar={dollar}
        initFrom={from}
        initTo={to}
        propTx={handleChangeFieldTx}
      />
      <table className={style.table}>
        <tbody>
          <tr className={style.col}>
            <label className={style.labelData}>Sig: </label>
            <td>
              <input
                className={
                  isSigned === false ? style.textareaSmallerRed : style.textareaSmaller
                }
                id="sig"
                value={sig}
                onChange={handleChangeField}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default TxKeys;
