import React, { useState, useEffect } from "react";
import style from "/Users/adammierov/Desktop/blockchain-fronted/src/style/Block.Module.css";

function Tx({ index, initDollar, initFrom, initTo, propTx }) {
  const [dollar, setDollar] = useState(initDollar);
  const [from, setFrom] = useState(initFrom);
  const [to, setTo] = useState(initTo);

  const handleChangeField = (e) => {
    if (e.target.id === "from") {
      setFrom(e.target.value);
    } else if (e.target.id === "dollar") {
      setDollar(e.target.value);
    } else if (e.target.id === "to") {
      setTo(e.target.value);
    }

  };
  useEffect(() => {

    propTx([index, dollar, from, to], "tx");
  }, [to, from, dollar]);

  return (
    <div>
      <table className={style.table}>
        <tbody>
          <tr className={style.col}>
            <td>
              <label className={style.labelData}>$ </label>
            </td>
            <td>
              <input
                className={style.textareaTx}
                type="number"
                id="dollar"
                value={dollar}
                onChange={handleChangeField}
              ></input>
            </td>
            <td>
              <label className={style.labelData}>From: </label>
            </td>
            <td>
              <input
                className={style.textareaTx}
                id="from"
                value={from}
                onChange={handleChangeField}
              ></input>
            </td>
            <td>
              <label className={style.labelData}>To: </label>
            </td>
            <td>
              <input
                className={style.textareaTx}
                id="to"
                value={to}
                onChange={handleChangeField}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Tx;
